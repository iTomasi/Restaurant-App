import { Schema, Document, model } from "mongoose";

interface IOrder extends Document {
    products: any[];
    tableId: string;
    message: string;
    status: number;
    userId: string;
}

const orderSchema = new Schema({
    products: { type: Array },
    tableId: { type: String },
    message: { type: String },
    status: { type: Number },
    userId: { type: String },
});

export default model<IOrder>("Order", orderSchema);
