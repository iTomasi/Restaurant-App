import React from "react";

// components
import { SearchIcon } from "@heroicons/react/outline";

interface IHandleItemsProps {
    onChangeSearchValue: any;
    onChangeSelect: any;
}

const HandleItems = ({
    onChangeSearchValue,
    onChangeSelect,
}: IHandleItemsProps) => {
    return (
        <div>
            <label className="flex items-center bg-gray-800 py-2 pr-2 rounded mb-2 text-lg sm:text-xl">
                <div className="w-8">
                    <SearchIcon className="h-5 w-5 mx-auto" />
                </div>

                <input
                    className="w-full bg-transparent focus:outline-none"
                    type="text"
                    placeholder="Buscar..."
                    name="search"
                    onChange={(e) => onChangeSearchValue(e.target.value)}
                />
            </label>

            <div>
                <select
                    className="bg-gray-800 focus:outline-none p-2"
                    onChange={(e) => onChangeSelect(e.target.value)}
                >
                    <option selected disabled>
                        Ordenar por
                    </option>
                    <option value="minus">Menor a mayor precio</option>
                    <option value="plus">Mayor a menor precio</option>
                </select>
            </div>
        </div>
    );
};

export default HandleItems;
