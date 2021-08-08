import AxiosBase from "../AxiosBase";

// Interface (types)
import { IRegisterUser } from "types/User";

const registerUser = async (userData: IRegisterUser) => {
    try {
        const { data } = await AxiosBase.post("/auth/sign-up", userData, {
            headers: { "Content-Type": "application/json" },
        });

        if (data.message !== "OK") return { error: data.message };

        return {
            success: "Cuenta creada satisfactoriamente",
        };
    } catch (e) {
        console.log(e);
        console.log("registerUser.ts error");
        return { error: "Error al conectarse con el servidor" };
    }
};

export default registerUser;
