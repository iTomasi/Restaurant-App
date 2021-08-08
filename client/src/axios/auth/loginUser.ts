import AxiosBase from "../AxiosBase";
import { ILoginUser } from "types/User";

const loginUser = async (userData: ILoginUser) => {
    try {
        const { data } = await AxiosBase.post("/auth/sign-in", userData, {
            headers: { "Content-Type": "application/json" },
        });

        if (data.message !== "OK") return { error: data.message };

        document.cookie = `token=${data.token}; path=/`;

        return {
            success: "Authenticado redirigiendo por favor espere",
            data: data.userData,
        };
    } catch (e) {
        console.log(e);
        console.log("loginUser.ts Error");
        return { error: "Error al conectarse con el servidor" };
    }
};

export default loginUser;
