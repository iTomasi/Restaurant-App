import React, { useEffect } from "react";

// Next
import { useRouter } from "next/router";

// Redux
import { useSelector } from "react-redux";

// Types
import { IUser } from "types/User";

interface IWaiterRouteProps {
    children: React.ReactNode;
}

const WaiterRoute = ({ children }: IWaiterRouteProps) => {
    const router = useRouter();
    const userData: IUser = useSelector((state: any) => state.user);

    useEffect(() => {
        if (!userData.auth) {
            router.push("/auth/sign-in");
            return;
        }

        if (
            !userData.data.rols.includes("waiter") &&
            !userData.data.rols.includes("admin") &&
            userData.data._id !== "0"
        ) {
            console.log("???");
            router.push("/");
            return;
        }
    }, [userData]);

    if (
        userData.data._id === "0" ||
        (!userData.data.rols.includes("waiter") &&
            !userData.data.rols.includes("admin"))
    )
        return null;

    return <>{children}</>;
};

export default WaiterRoute;
