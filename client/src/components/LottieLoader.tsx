import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieLoader = () => {
    const divRef: any = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: divRef.current,
            autoplay: true,
            loop: true,
            renderer: "svg",
            path: "/lottieLoader.json",
        });
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-900 flex justify-center items-center">
            <div className="h-70 w-70" ref={divRef}></div>
        </div>
    );
};

export default LottieLoader;
