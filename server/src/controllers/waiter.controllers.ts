import { Handler } from "express";

export const POST_insertOrder: Handler = (req, res) => {
    const { data, tableId, message } = req.body;

    console.log(data);

    console.log(`tableID: ${tableId}`);
    console.log(`message: ${message}`);
};
