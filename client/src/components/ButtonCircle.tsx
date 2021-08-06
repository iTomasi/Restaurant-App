import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";

interface IButtonCircleProps {
    quantity: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonCircle = ({ quantity, onClick }: IButtonCircleProps) => {
    return (
        <button
            className="bg-gray-700 fixed bottom-5 right-5 p-3 rounded-full"
            onClick={onClick}
        >
            <ShoppingCartIcon className="h-10 w-10" />
            {quantity > 0 && (
                <div className="absolute -top-2 -left-2 bg-red-500 px-2 rounded text-xl">
                    {quantity}
                </div>
            )}
        </button>
    );
};

export default ButtonCircle;
