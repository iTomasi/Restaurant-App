import React from "react";
import { toast } from "react-hot-toast";

// Components
import FormProduct from "../admin/FormProduct";
import FormProductFile from "../admin/FormProductFile";
import FormSelect from "../admin/FormSelect";
import Button from "../Button";

// Types
import { IProduct } from "types/Product";

// Config
import adminCfg from "config/admin";
import cloudinaryCfg from "config/cloudinary";

// Axios
import Axios from "axios";
import addProduct from "axiosSrc/products/addProduct";

interface IModalHandleProductProps {
    product: IProduct;
    setProduct: any;
    setShowModal: any;
}

const ModalHandleProduct = ({
    product,
    setProduct,
    setShowModal,
}: IModalHandleProductProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (product.type === "add") {
                const formData = new FormData();
                formData.append("upload_preset", cloudinaryCfg.UPLOAD_PRESET);
                formData.append("file", product.fileBlob);
                formData.append("folder", "products");

                const { data } = await Axios.post(
                    cloudinaryCfg.BASE_URL + "/image/upload",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        onUploadProgress: (e) => {
                            const percentage = Math.round(
                                (e.loaded * 100) / e.total
                            );

                            console.log(percentage);
                        },
                    }
                );

                const { error, success } = await addProduct({
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    img: data.secure_url,
                    quantity: product.quantity,
                });

                if (error) return toast.error(error);

                toast.success(success);
                setShowModal(false);
            }
        } catch (e) {
            console.log(e);
            console.log("ModalHandleProduct error");
        }
    };

    const handleOnChange = (e: any) => {
        if (e.target.name === "quantity" || e.target.name === "price") {
            const numberRegExp = new RegExp(/^[0-9]+$/g);

            const testingValue = numberRegExp.test(e.target.value);

            if (!testingValue && e.target.value !== "") {
                toast.error("Solo numeros");
                return;
            }
        }

        setProduct((prev: IProduct) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProduct((prev: IProduct) => ({
            ...prev,
            category: e.target.value,
        }));
    };

    const gettingImg = (file: any) => {
        setProduct((prev: IProduct) => ({
            ...prev,
            img: file.img,
            fileBlob: file.blob,
        }));
    };

    const handleRemoveImgBtn = () => {
        setProduct((prev: IProduct) => ({
            ...prev,
            img: "",
            fileBlob: null,
        }));
    };

    return (
        <form
            className="bg-gray-800 w-11/12 max-w-2xl px-3 py-4 rounded max-h-modal overflow-y-auto"
            onSubmit={handleSubmit}
        >
            <FormProduct
                title="Nombre del producto"
                name="name"
                value={product.name}
                onChange={handleOnChange}
            />

            <FormProduct
                title="Precio del producto"
                name="price"
                value={product.price}
                onChange={handleOnChange}
            />

            <FormProduct
                title="Cantidades"
                name="quantity"
                value={product.quantity.toString()}
                onChange={handleOnChange}
            />

            <FormSelect
                name="category"
                title="Categoria"
                onChange={handleOnChangeSelect}
            >
                <option disabled selected>
                    Selecciona una categoria
                </option>
                {adminCfg.productCategories.map((category, index) =>
                    product.category === "" ||
                    product.category !== category.value ? (
                        <option key={index} value={category.value}>
                            {category.name}
                        </option>
                    ) : (
                        <option key={index} value={category.value} selected>
                            {category.name}
                        </option>
                    )
                )}
            </FormSelect>

            <FormProductFile
                url={product.img}
                onClickRemove={handleRemoveImgBtn}
                gettingImg={gettingImg}
            />

            <Button type="submit" text="Agregar" />
        </form>
    );
};

export default ModalHandleProduct;
