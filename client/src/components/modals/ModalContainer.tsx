import React from "react";

interface IModalContainerProps {
    show: boolean;
    setShow: any;
    children: React.ReactNode;
}

const ModalContainer = ({ children, show, setShow }: IModalContainerProps) => {
    const handleModalContainer = (e: any) => {
        if (e.target.classList.contains("iw_modalContainer")) {
            setShow(false);
        }
    };

    return (
        <div
            className={`iw_modalContainer ${
                show ? "fixed" : "hidden"
            } inset-0 bg-black bg-opacity-25 flex justify-center items-center`}
            onClick={handleModalContainer}
        >
            {children}
        </div>
    );
};

export default ModalContainer;
