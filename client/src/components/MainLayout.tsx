import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { isUserAuthenticated } from "reduxSrc/user/userState";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const effectFunc = async () => {
            const userAuthenticated = await isUserAuthenticated();

            dispatch(userAuthenticated);
        };

        effectFunc();
    }, []);

    return <>{children}</>;
};

export default MainLayout;
