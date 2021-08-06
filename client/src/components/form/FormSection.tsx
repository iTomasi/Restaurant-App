import React, { useState } from "react";

// Components
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";

interface IFormSectionProps {
    type?: string;
    title: string;
    placeholder?: string;
    name: string;
}

const FormSection = ({
    type = "text",
    title,
    placeholder = "",
    name,
}: IFormSectionProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="mb-3 text-lg sm:text-xl">
            <label className="block mb-1">{title}</label>

            {type === "password" ? (
                <label className="flex items-center bg-gray-800">
                    <input
                        className="w-full bg-transparent pl-2 mr-1 focus:outline-none"
                        type={showPassword ? "text" : "password"}
                        placeholder={!placeholder ? title + "..." : placeholder}
                        name={name}
                    />

                    <div
                        className="px-2 py-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeIcon className="h-6 w-6" />
                        ) : (
                            <EyeOffIcon className="h-6 w-6" />
                        )}
                    </div>
                </label>
            ) : (
                <input
                    className="w-full bg-gray-800 p-2 focus:outline-none"
                    type="text"
                    placeholder={!placeholder ? title + "..." : placeholder}
                    name={name}
                />
            )}
        </div>
    );
};

export default FormSection;
