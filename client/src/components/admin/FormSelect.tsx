import React from "react";

interface IFormSelectProps {
    title: string;
    name: string;
    children: React.ReactNode;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const FormSelect = ({ title, name, children, onChange }: IFormSelectProps) => {
    return (
        <div className="text-md sm:text-lg mb-3">
            <label className="block mb-2">{title}</label>

            <select
                className="bg-gray-900 w-full py-2 px-1 rounded focus:outline-none"
                name={name}
                onChange={onChange}
            >
                {children}
            </select>
        </div>
    );
};

export default FormSelect;
