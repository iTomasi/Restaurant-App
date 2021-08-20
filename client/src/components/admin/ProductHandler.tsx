import React from "react";

interface IProductHandlerProps {
    onClickAddProduct: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductHandler = ({ onClickAddProduct }: IProductHandlerProps) => {
    return (
        <div>
            <button
                className="bg-green-400 px-4 py-2 rounded hover:bg-green-500 transition-all"
                onClick={onClickAddProduct}
            >
                Agregar Producto
            </button>
        </div>
    );
};

export default ProductHandler;
