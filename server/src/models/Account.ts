import { Schema, model, Document } from "mongoose";

interface IAccount extends Document {
    username: string;
    username_lower: string;
    password: string;
    rols: string[];
}

const accountSchema = new Schema({
    username: { type: String },
    username_lower: { type: String },
    password: { type: String },
    rols: { type: Array, default: ["user"] },
});

export default model<IAccount>("Account", accountSchema);
