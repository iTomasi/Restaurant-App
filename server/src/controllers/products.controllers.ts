import { Handler } from "express";

// Models
import Product from "../models/Product";

export const GET_products: Handler = async (req, res) => {
    try {
        const products = await Product.find();

        return res.json({
            message: "OK",
            data: products,
        });
    } catch (e) {
        console.log(e);
        console.log("GET_products() error");
        return res.json({ message: "Server Error" });
    }
};

export const POST_addProduct: Handler = async (req, res) => {
    const { name, price, category, img, quantity } = req.body;

    if (!name || !price || !category || !img || !quantity)
        return res.json({ message: "Faltan datos" });

    const priceNum = parseInt(price);
    const quantityNum = parseInt(quantity);

    if (isNaN(priceNum) || isNaN(quantityNum))
        return res.json({ message: "Precio y cantidad deben ser numeros" });

    try {
        const checkingProductName = await Product.findOne({
            name_lower: name.toLowerCase(),
        });

        if (checkingProductName)
            return res.json({ message: "Nombre del producto ya existe" });

        await new Product({
            name: name,
            name_lower: name.toLowerCase(),
            price: priceNum,
            quantity: quantityNum,
            category,
            img,
        }).save();

        return res.json({ message: "OK" });
    } catch (e) {
        console.error(e);
        console.log("POST_addProduct() error");
        return res.json({ message: "Server Error" });
    }
};
