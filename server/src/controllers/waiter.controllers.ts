import { Handler } from "express";

// Models
import Order from "../models/Order";
import Product from "../models/Product";

export const POST_insertOrder: Handler = async (req, res) => {
    const { data, tableId, message } = req.body;

    if (!Array.isArray(data) || !tableId)
        return res.json({ message: "Datas missing" });
    else if (data[0] === undefined)
        return res.json({ message: "No products?" });

    const userDB: any = req.user;

    try {
        const products = await Product.find();

        for (let i = 0; i < data.length; i++) {
            const theProduct = data[i];

            const findIndex = products.findIndex(
                (product) => product._id.toString() === theProduct._id
            );

            if (findIndex === -1)
                return res.json({
                    message: `${theProduct.name} no existe en nuestra base de datos`,
                });

            const product = products[findIndex];

            if (product.quantity < theProduct.quantity)
                return res.json({
                    message: `${product.name} solamente nos quedan ${product.quantity} unidades`,
                });

            const updateProduct = await Product.findById(theProduct._id);

            if (!updateProduct)
                return res.json({ message: "Producto no encontrado" });

            updateProduct.quantity -= theProduct.quantity;

            await updateProduct.save();
        }

        await new Order({
            products: data,
            tableId,
            message,
            status: 0,
            userId: userDB._id,
        }).save();

        return res.json({ message: "OK" });
    } catch (e) {
        console.log(e);
        console.log("POST_insertOrder() error");
        return res.json({ message: "Server Error" });
    }
};
