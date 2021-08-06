import React from "react";

// Components
import { MenuIcon } from "@heroicons/react/outline";

const MB_HEADER = () => {
    return (
        <header className="bg-gray-800 py-3 px-2 flex mb-3">
            <div className="cursor-pointer p-1">
                <MenuIcon className="h-7 w-7" />
            </div>
        </header>
    );
};

export default MB_HEADER;
