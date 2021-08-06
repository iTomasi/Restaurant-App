import React, { useState, useCallback } from "react";

const temporalArray = [
    {
        id: "0",
        img: "/coca-cola.jpg",
        name: "Coca Cola",
        quantity: 10,
        price: 500,
    },
    {
        id: "1",
        img: "/coca-cola.jpg",
        name: "Colax Cola 1",
        quantity: 20,
        price: 700,
    },
    {
        id: "2",
        img: "/coca-cola.jpg",
        name: "kokalol Cola 2",
        quantity: 0,
        price: 800,
    },
];

// Components
import ProductCard from "components/waiter/ProductCard";
import HandleItems from "components/HandleItems";
import ModalContainer from "components/modals/ModalContainer";
import ModalProductSelected from "components/modals/ModalProductSelected";
import ModalProductsOrder from "components/modals/ModalProductsOrder";
import ButtonCircle from "components/ButtonCircle";
import { toast } from "react-hot-toast";

const WaiterIndex = () => {
    const [products, setProducts] = useState<any[]>(temporalArray);
    const [inputSearch, setInputSearch] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalProductsOrder, setShowModalProductsOrder] =
        useState<boolean>(false);
    const [productSelected, setProductSelected] = useState({
        id: "",
        img: "",
        name: "",
        quantityProduct: 0,
    });

    const [productsOrder, setProductsOrder] = useState<any[]>([]);

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
        setProductSelected((prev) => ({
            ...prev,
            id: productData.id,
            img: productData.img,
            name: productData.name,
            quantityProduct: productData.quantity,
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
            (theProduct: any) => theProduct.id === id
        );
        const findIndexProduct = copyProducts.findIndex(
            (theProduct: any) => theProduct.id === id
        );

        if (findIndexProductOrder === -1) {
            copyProducts[findIndexProduct].quantity -= quantity;

            setProducts(copyProducts);

            setProductsOrder((prev: any) => [
                ...prev,
                {
                    id,
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
                                id={product.id}
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
                    id={productSelected.id}
                    img={productSelected.img}
                    name={productSelected.name}
                    quantityProduct={productSelected.quantityProduct}
                    onClickCancel={() => setShowModal(false)}
                    onClickAdd={getProductAdded}
                />
            </ModalContainer>

            <ModalContainer
                show={showModalProductsOrder}
                setShow={setShowModalProductsOrder}
            >
                <ModalProductsOrder productsList={productsOrder} />
            </ModalContainer>
        </>
    );
};

export default WaiterIndex;