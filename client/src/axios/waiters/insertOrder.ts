import AxiosBase from "../AxiosBase";
import getCookie from "libs/getCookie";

const insertOrder = async (
    productOrders: any[],
    tableId: string,
    message: string
) => {
    try {
        const userToken = getCookie("token");

        if (!userToken) return { error: "No authenticated" };

        const { data } = await AxiosBase.post(
            "/waiter/insert-order",
            {
                data: productOrders,
                tableId,
                message,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );

        if (data.message !== "OK") return { error: data.message };

        return { success: "Nice" };
    } catch (e) {
        console.log(e);
        console.log("insertORder error");
        return { error: "Error al conectarse con el servidor" };
    }
};

export default insertOrder;
