import React from "react";

// Next
import Image from "next/image";

// Components
import Button from "../Button";

interface IModalProductsOrder {
    productsList: any[];
    onClickPlus: any;
    onClickMinus: any;
    onClickRemove: any;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ModalProductsOrder = ({
    productsList,
    onClickPlus,
    onClickMinus,
    onClickRemove,
    onSubmit,
}: IModalProductsOrder) => {
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

            <form className="flex flex-col items-center" onSubmit={onSubmit}>
                <input
                    className="w-11/12 p-2 focus:outline-none mb-3 bg-gray-700 rounded"
                    type="text"
                    placeholder="Mesa"
                    name="table_num"
                />

                <textarea
                    className="resize-y h-24 w-11/12 p-2 focus:outline-none mb-3 bg-gray-700 rounded"
                    placeholder="Mensaje..."
                    name="message"
                ></textarea>

                <div className="w-11/12">
                    <Button type="submit" text="Enviar orden" />
                </div>
            </form>
        </div>
    );
};

export default ModalProductsOrder;
