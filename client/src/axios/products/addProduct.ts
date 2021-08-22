import AxiosBase from "../AxiosBase";
import getCookie from "libs/getCookie";

interface IAddProduct {
    name: string;
    price: string;
    quantity: string;
    img: string;
    category: string;
}

const addProduct = async (theData: IAddProduct) => {
    const { name, price, quantity, img, category } = theData;
    try {
        if (!name || !price || !quantity || !img || !category) {
            return { error: "Faltan Datos" };
        }

        const userToken = getCookie("token");

        if (!userToken) return { error: "No logeado" };

        const { data } = await AxiosBase.post("/products/add", theData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (data.message !== "OK") return { error: data.message };

        return { success: "Producto agregado correctamente" };
    } catch (e) {
        console.log(e);
        console.log("addProduct() error");
        return { error: "Error al conectarse con el servidor" };
    }
};

export default addProduct;
