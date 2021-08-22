import AxiosBase from "../AxiosBase";

const getProducts = async () => {
    try {
        const { data } = await AxiosBase.get("/products/");

        if (data.message !== "OK") return { error: data.message };

        return {
            data: data.data,
        };
    } catch (e) {
        console.log(e);
        console.log("getProducts.ts error");
        return { error: "Error al conectarse con el servidor" };
    }
};

export default getProducts;
