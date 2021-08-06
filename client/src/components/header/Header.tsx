import React, { useState, useEffect } from "react";

// Components
import DK_HEADER from "./desktop/DK_HEADER";
import MB_HEADER from "./mobile/MB_HEADER";

const Header = () => {
    const [userWidth, setUserWidth] = useState<number>(0);

    useEffect(() => {
        setUserWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        const updateUserWidth = () => setUserWidth(window.innerWidth);

        window.addEventListener("resize", updateUserWidth);
        return () => window.removeEventListener("resize", updateUserWidth);
    }, [userWidth]);

    return userWidth >= 1024 ? <DK_HEADER /> : <MB_HEADER />;
};

export default Header;
