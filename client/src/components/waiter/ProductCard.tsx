import React from "react";

// Component
import { toast } from "react-hot-toast";

// Next
import Image from "next/image";

interface IProductCardProps {
    id: string;
    img: string;
    name: string;
    price: number;
    quantity: number;
    onClickProduct: any;
}

const ProductCard = ({
    id,
    img,
    name,
    price,
    quantity,
    onClickProduct,
}: IProductCardProps) => {
    const handleProduct = () => {
        if (quantity <= 0) return toast.error("No quedan mas " + name);

        onClickProduct({
            id,
            name,
            img,
            price,
            quantity,
        });
    };

    return (
        <div
            className={`${
                quantity > 10
                    ? "bg-gray-800"
                    : quantity > 0 && quantity <= 10
                    ? "bg-yellow-400 bg-opacity-30"
                    : "bg-red-400 bg-opacity-30"
            } py-2 rounded-xl cursor-pointer`}
            onClick={handleProduct}
        >
            <div className="text-center">
                <Image
                    className="rounded-lg"
                    src={img}
                    height={100}
                    width={100}
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>

            <h3 className="text-center sm:text-xl mb-1">{name}</h3>

            <h4 className="text-center text-gray-200 sm:text-lg mb-1">
                $ {price}
            </h4>

            <h4 className="text-center text-gray-300 sm:text-lg">
                {quantity} unidades
            </h4>
        </div>
    );
};

export default ProductCard;
