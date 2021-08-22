import React, { useState, useCallback, useEffect } from "react";

// Components
import ProductCard from "components/waiter/ProductCard";
import HandleItems from "components/HandleItems";
import ModalContainer from "components/modals/ModalContainer";
import ModalProductSelected from "components/modals/ModalProductSelected";
import ModalProductsOrder from "components/modals/ModalProductsOrder";
import ButtonCircle from "components/ButtonCircle";
import { toast } from "react-hot-toast";

// Axios
import getProducts from "axiosSrc/products/getProducts";
import insertOrder from "axiosSrc/waiters/insertOrder";

const WaiterIndex = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [inputSearch, setInputSearch] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalProductsOrder, setShowModalProductsOrder] =
        useState<boolean>(false);
    const [productSelected, setProductSelected] = useState({
        _id: "",
        img: "",
        name: "",
        quantity: 0,
    });

    const [productsOrder, setProductsOrder] = useState<any[]>([]);

    useEffect(() => {
        const effectFunc = async () => {
            const { data, error } = await getProducts();

            if (error) return toast.error(error);

            console.log(data);

            setProducts(data);
        };

        effectFunc();
    }, []);

    const handleOnChangeSearchValue = useCallback(
        (value: any) => setInputSearch(value),
        [inputSearch]
    );

    const handleOnChangeSelect = (value: any) => {
        const copyArray = [...products];

        if (value === "minus") {
            const sortArray = copyArray.sort(
                (a: any, b: any) => a.price - b.price
            );

            setProducts(sortArray);
        } else if (value === "plus") {
            const sortArray = copyArray.sort(
                (a: any, b: any) => b.price - a.price
            );
            setProducts(sortArray);
        }
    };

    const handleProductCard = (productData: any) => {
        console.log(productData);
        setProductSelected((prev) => ({
            ...prev,
            _id: productData._id,
            img: productData.img,
            name: productData.name,
            quantity: productData.quantity,
        }));
        setShowModal(true);
    };

    const getProductAdded = ({
        id,
        name,
        img,
        quantityProduct,
        quantity,
    }: any) => {
        const copyProductOrder = [...productsOrder];
        const copyProducts = [...products];

        const findIndexProductOrder = copyProductOrder.findIndex(
            (theProduct: any) => theProduct._id === id
        );
        const findIndexProduct = copyProducts.findIndex(
            (theProduct: any) => theProduct._id === id
        );

        if (findIndexProductOrder === -1) {
            copyProducts[findIndexProduct].quantity -= quantity;

            setProducts(copyProducts);

            setProductsOrder((prev: any) => [
                ...prev,
                {
                    _id: id,
                    name,
                    img,
                    quantityProduct,
                    quantity,
                },
            ]);

            setShowModal(false);
            return;
        }

        copyProductOrder[findIndexProductOrder].quantity += quantity;
        copyProducts[findIndexProduct].quantity -= quantity;

        setProductsOrder(copyProductOrder);
        setProducts(copyProducts);
        setShowModal(false);
    };

    const handleButtonCircle = () => {
        if (productsOrder[0] === undefined)
            return toast.error("No hay productos en el carro");

        setShowModalProductsOrder(true);
    };

    const handleModalBtnPlus = (productData: any) => {
        const copyProductsOrder = [...productsOrder];
        const copyProducts = [...products];

        const findIndexProductOrder = copyProductsOrder.findIndex(
            (theProduct: any) => theProduct._id === productData._id
        );
        const findIndexProduct = copyProducts.findIndex(
            (theProduct: any) => theProduct._id === productData._id
        );

        if (findIndexProductOrder === -1)
            return toast.error("No esta este producto en la lista");
        else if (findIndexProduct === -1)
            return toast.error("No existe este producto");

        const theProductOrder = copyProductsOrder[findIndexProductOrder];
        const theProduct = copyProducts[findIndexProduct];

        if (theProductOrder.quantityProduct > theProductOrder.quantity) {
            theProductOrder.quantity += 1;
            theProduct.quantity -= 1;

            setProducts(copyProducts);
            setProductsOrder(copyProductsOrder);
            toast.success(`Se agrego una unidad a ${productData.name}`);
            return;
        }

        toast.error(`No puedes agregar mas cantidad a ${productData.name}`);
    };

    const handleModalBtnMinus = (productData: any) => {
        const copyProductsOrder = [...productsOrder];
        const copyProducts = [...products];

        const findIndexProductOrder = copyProductsOrder.findIndex(
            (theProduct: any) => theProduct._id === productData._id
        );
        const findIndexProduct = copyProducts.findIndex(
            (theProduct: any) => theProduct._id === productData._id
        );

        if (findIndexProductOrder === -1)
            return toast.error("No esta este producto en la lista");
        else if (findIndexProduct === -1)
            return toast.error("No existe este producto");

        const theProductOrder = copyProductsOrder[findIndexProductOrder];
        const theProduct = copyProducts[findIndexProduct];

        if (theProductOrder.quantity > 1) {
            theProductOrder.quantity -= 1;
            theProduct.quantity += 1;

            setProducts(copyProducts);
            setProductsOrder(copyProductsOrder);
            toast.success(`Se elimino una unidad a ${productData.name}`);
            return;
        }

        toast.error(
            `No puedes seleccionar menos de 1 cantidad a ${productData.name}`
        );
    };

    const handleModalBtnRemove = (productData: any) => {
        console.log(productData);
        const copyProducts = [...products];
        const copyProductsOrder = [...productsOrder];

        const findIndexProduct = copyProducts.findIndex(
            (theProduct: any) => theProduct._id === productData._id
        );

        if (findIndexProduct === -1)
            return toast.error("Producto no encontrado");

        copyProducts[findIndexProduct].quantity = productData.quantityProduct;

        const filtingProductsOrder = copyProductsOrder.filter(
            (theProduct: any) => theProduct._id !== productData._id
        );

        console.log(filtingProductsOrder);

        if (filtingProductsOrder[0] === undefined)
            setShowModalProductsOrder(false);

        setProductsOrder(filtingProductsOrder);
        setProducts(copyProducts);

        return toast.success("Product removido de la orden");
    };

    const modalHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const $tableNum = formData.get("table_num").toString();
        const $message = formData.get("message").toString();

        if (!$tableNum)
            return toast.error("Por favor ingrese un numero de mesa");

        console.log($tableNum);
        console.log($message);

        const { error } = await insertOrder(
            productsOrder,
            $tableNum,
            !$message ? "" : $message
        );

        if (error) return toast.error(error);

        console.log("Pro");
    };

    return (
        <>
            <div className="mb-3">
                <HandleItems
                    onChangeSearchValue={handleOnChangeSearchValue}
                    onChangeSelect={handleOnChangeSelect}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {products.map(
                    (product: any, index: any) =>
                        product.name
                            .toLowerCase()
                            .includes(inputSearch.toLowerCase()) && (
                            <ProductCard
                                key={index}
                                id={product._id}
                                name={product.name}
                                img={product.img}
                                price={product.price}
                                quantity={product.quantity}
                                onClickProduct={handleProductCard}
                            />
                        )
                )}
            </div>

            <ButtonCircle
                quantity={productsOrder.length}
                onClick={handleButtonCircle}
            />

            <ModalContainer show={showModal} setShow={setShowModal}>
                <ModalProductSelected
                    id={productSelected._id}
                    img={productSelected.img}
                    name={productSelected.name}
                    quantityProduct={productSelected.quantity}
                    onClickCancel={() => setShowModal(false)}
                    onClickAdd={getProductAdded}
                />
            </ModalContainer>

            <ModalContainer
                show={showModalProductsOrder}
                setShow={setShowModalProductsOrder}
            >
                <ModalProductsOrder
                    productsList={productsOrder}
                    onClickMinus={handleModalBtnMinus}
                    onClickPlus={handleModalBtnPlus}
                    onClickRemove={handleModalBtnRemove}
                    onSubmit={modalHandleSubmit}
                />
            </ModalContainer>
        </>
    );
};

WaiterIndex.requireWaiterRol = true;

export default WaiterIndex;
