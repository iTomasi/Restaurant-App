import React from "react";

interface IFormProductProps {
    title: string;
    placeholder?: string;
    value: string;
    name: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const FormProduct = ({
    title,
    placeholder = "",
    value,
    name,
    onChange,
}: IFormProductProps) => {
    return (
        <div className="mb-3 text-md sm:text-lg">
            <label className="block mb-2">{title}</label>

            <input
                className="bg-gray-900 focus:outline-none w-full p-2 rounded"
                type="text"
                placeholder={!placeholder ? title + "..." : placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    );
};

export default FormProduct;
