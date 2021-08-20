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

interface IModalHandleProductProps {
    product: IProduct;
    setProduct: any;
}

const ModalHandleProduct = ({
    product,
    setProduct,
}: IModalHandleProductProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(product);
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
                <option disabled>Selecciona una categoria</option>
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
