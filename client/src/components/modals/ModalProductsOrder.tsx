import React from "react";

// Next
import Image from "next/image";

interface IModalProductsOrder {
    productsList: any[];
    onClickPlus: any;
    onClickMinus: any;
    onClickRemove: any;
}

const ModalProductsOrder = ({
    productsList,
    onClickPlus,
    onClickMinus,
    onClickRemove,
}: IModalProductsOrder) => {
    console.log(productsList);

    return (
        <div className="bg-gray-800 w-11/12 max-w-3xl max-h-96 overflow-y-auto py-3 rounded px-5">
            {productsList.map((product: any, index: any) => (
                <div className="text-center mb-4 bg-gray-700 p-2" key={index}>
                    <div>
                        <Image
                            src={product.img}
                            height={120}
                            width={120}
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </div>

                    <h3>
                        {product.name} ({product.quantity})
                    </h3>

                    <div className="text-2xl my-2">
                        <button
                            className="bg-green-400 w-7 rounded"
                            type="button"
                            onClick={() => onClickPlus(product)}
                        >
                            +
                        </button>
                        <span className="mx-2">{product.quantity}</span>
                        <button
                            className="bg-red-400 w-7 rounded"
                            type="button"
                            onClick={() => onClickMinus(product)}
                        >
                            -
                        </button>
                    </div>

                    <button
                        className="bg-red-400 w-full h-10 text-lg rounded sm:text-xl"
                        type="button"
                        onClick={() => onClickRemove(product)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ModalProductsOrder;
