import React, { useState, useEffect } from "react";

// Next
import Image from "next/image";

// Components
import Button from "components/Button";

interface IModalProductSelectedProps {
    id: string;
    img: string;
    name: string;
    quantityProduct: number;
    onClickCancel: React.MouseEventHandler<HTMLButtonElement>;
    onClickAdd: any;
}

const ModalProductSelected = ({
    id,
    img,
    name,
    quantityProduct,
    onClickCancel,
    onClickAdd,
}: IModalProductSelectedProps) => {
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        setQuantity(1);
    }, [img, name, quantityProduct, id]);

    const handlePlusBtn = () => {
        if (quantityProduct > quantity) {
            return setQuantity(quantity + 1);
        }
    };

    const handleMinusBtn = () => {
        if (quantity > 1) {
            return setQuantity(quantity - 1);
        }
    };

    const handleAcceptBtn = () =>
        onClickAdd({ id, name, img, quantityProduct, quantity });

    return (
        <div className="w-full max-w-xl px-2">
            <div className="bg-gray-600 py-2 px-2 rounded">
                {img && (
                    <div className="text-center mb-2">
                        <Image
                            className="rounded"
                            src={img}
                            width={120}
                            height={120}
                        />
                    </div>
                )}

                <h3 className="text-center mb-3">
                    {name} ({quantityProduct})
                </h3>

                <div className="w-1/2 mx-auto mb-3 flex justify-center items-center">
                    <button
                        className="bg-green-400 text-2xl w-7 rounded"
                        type="button"
                        onClick={handlePlusBtn}
                    >
                        +
                    </button>
                    <span className="mx-3 text-xl">{quantity}</span>
                    <button
                        className="bg-red-400 text-2xl w-7 rounded"
                        type="button"
                        onClick={handleMinusBtn}
                    >
                        -
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row">
                    <Button
                        className="sm:mr-1"
                        text="Agregar"
                        onClick={handleAcceptBtn}
                    />

                    <button
                        className="w-full mt-2 sm:mt-0 sm:ml-1 bg-red-400 rounded hover:bg-red-500 h-10"
                        type="button"
                        onClick={onClickCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProductSelected;
