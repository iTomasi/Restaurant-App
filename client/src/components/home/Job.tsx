import React from "react";

// Next
import { useRouter } from "next/router";

interface IJobProps {
    img: string;
    path: string;
    name: string;
}

const Job = ({ img, path, name }: IJobProps) => {
    const router = useRouter();

    return (
        <div
            className="h-40 mb-5 relative overflow-hidden cursor-pointer"
            onClick={() => router.push(path)}
        >
            <img
                className="w-full h-full object-cover object-center filter blur"
                src={img}
                alt={name}
            />

            <p className="absolute inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center text-xl">
                {name}
            </p>
        </div>
    );
};

export default Job;
