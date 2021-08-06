import React from "react";

// Next
import Image from "next/image";

interface IModalProductsOrder {
    productsList: any[];
}

const ModalProductsOrder = ({ productsList }: IModalProductsOrder) => {
    return (
        <div className="bg-gray-800 w-11/12 max-w-3xl max-h-96 overflow-y-auto py-3 rounded">
            {productsList.map((product: any, index: any) => (
                <div className="text-center mb-3" key={index}>
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
                </div>
            ))}
        </div>
    );
};

export default ModalProductsOrder;
