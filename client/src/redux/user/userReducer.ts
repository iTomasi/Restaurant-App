import { IUser } from "types/User";
import { userTypes } from "../types";

const initialState: IUser = {
    data: {
        _id: "0",
        username: "",
        picture: "",
        rols: [],
    },
    auth: true,
};

const userReducer = (state: IUser = initialState, action: any) => {
    const { payload, type } = action;

    switch (type) {
        case userTypes.authenticating:
            return {
                ...state,
                data: payload,
                auth: true,
            };
        case userTypes.authenticated:
            return {
                ...state,
                data: payload,
                auth: true,
            };
        case userTypes.noAuthenticated:
            return {
                ...state,
                auth: false,
            };
        default:
            return state;
    }
};

export default userReducer;
