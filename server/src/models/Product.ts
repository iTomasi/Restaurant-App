import { Schema, Document, model } from "mongoose";

interface IProduct extends Document {
    name: string;
    name_lower: string;
    price: number;
    quantity: number;
    img: string;
    category: string;
}

const productSchema = new Schema({
    name: { type: String },
    name_lower: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    img: { type: String },
    category: { type: String },
});

export default model<IProduct>("Product", productSchema);
