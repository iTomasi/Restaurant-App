export interface IRegisterUser {
    username: string;
    password: string;
    confirm_password: string;
}

export interface ILoginUser {
    username: string;
    password: string;
}

export interface IUser {
    data: {
        _id: string;
        username: string;
        picture: string;
        rols: string[];
    };
    auth: boolean;
}
