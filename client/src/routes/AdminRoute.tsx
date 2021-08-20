import React, { useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";

// Types
import { IUser } from "types/User";

interface IAdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: IAdminRouteProps) => {
    const userData: IUser = useSelector((state: any) => state.user);

    const router = useRouter();

    useEffect(() => {
        if (userData.auth && userData.data._id === "0") return;

        if (!userData.auth) {
            router.push("/auth/sign-in");
            return;
        }

        if (!userData.data.rols.includes("admin")) {
            router.push("/");
            return;
        }
    }, [userData]);

    if (userData.data._id === "0") return null;

    return <>{children}</>;
};

export default AdminRoute;
