import React, { useState, useEffect } from "react";

// Components
import LottieLoader from "./LottieLoader";

// Redux
import { useDispatch } from "react-redux";
import { isUserAuthenticated } from "reduxSrc/user/userState";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const effectFunc = async () => {
            const userAuthenticated = await isUserAuthenticated();

            dispatch(userAuthenticated);

            setLoading(false);
        };

        effectFunc();
    }, []);

    return (
        <>
            {loading && <LottieLoader />}
            {children}
        </>
    );
};

export default MainLayout;
