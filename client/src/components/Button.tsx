import React from "react";

interface IButtonProps {
    className?: string;
    type?: string;
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className = "", type = "", text, onClick }: IButtonProps) => {
    return (
        <button
            className={`bg-yellow-400 hover:bg-yellow-500 w-full h-10 text-lg md:text-xl rounded ${className}`}
            type={type === "submit" ? "submit" : "button"}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
