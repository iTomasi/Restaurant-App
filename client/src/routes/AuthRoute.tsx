import React, { useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";

// Types
import { IUser } from "types/User";

interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute = ({ children }: IAuthRouteProps) => {
    const router = useRouter();
    const userData: IUser = useSelector((state: any) => state.user);

    useEffect(() => {
        if (!userData.auth) {
            router.push("/auth/sign-in");
            return;
        }
    }, [userData]);

    if (userData.data._id === "0") return null;

    return <>{children}</>;
};

export default AuthRoute;
