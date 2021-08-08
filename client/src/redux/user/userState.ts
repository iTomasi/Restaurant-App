import { userTypes } from "../types";
import { IUser } from "types/User";
import getCookie from "libs/getCookie";
import AxiosBase from "axiosSrc/AxiosBase";

export const isUserAuthenticated = async () => {
    const userToken = getCookie("token");

    if (!userToken) {
        return {
            type: userTypes.noAuthenticated,
        };
    }

    try {
        const { data } = await AxiosBase.get("/auth/", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        return {
            type: userTypes.authenticated,
            payload: data,
        };
    } catch (e) {
        console.log(e);
        console.log("isUserAuthenticated()");
        return {
            type: userTypes.noAuthenticated,
        };
    }
};

export const userIsLoggin = (userData: IUser) => {
    return {
        payload: userData,
        type: userTypes.authenticating,
    };
};
