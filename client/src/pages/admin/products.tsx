import React, { useState } from "react";

// Components
import ProductHandler from "components/admin/ProductHandler";
import ModalContainer from "components/modals/ModalContainer";
import ModalHandleProduct from "components/modals/ModalHandleProduct";

// Types
import { IProduct } from "types/Product";

const Products = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>({
        type: "add",
        _id: "",
        name: "",
        category: "",
        img: "",
        fileBlob: null,
        quantity: "",
        price: "",
    });

    const handleAddProductBtn = () => {
        setProduct((prev) => ({
            ...prev,
            type: "add",
            _id: "",
            name: "",
            category: "",
            img: "",
            fileBlob: null,
            quantity: "",
            price: "",
        }));

        setShowModal(true);
    };

    return (
        <>
            <div className="mb-5">
                <ProductHandler onClickAddProduct={handleAddProductBtn} />
            </div>

            <div>
                <h1>Products</h1>
            </div>

            <ModalContainer show={showModal} setShow={setShowModal}>
                <ModalHandleProduct product={product} setProduct={setProduct} />
            </ModalContainer>
        </>
    );
};

Products.requireAdminRol = true;

export default Products;
