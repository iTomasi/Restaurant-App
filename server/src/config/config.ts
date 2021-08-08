import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export default {
    DB: {
        MONGODB_URI: process.env.MONGODB_URI || "",
    },
    JWT_SECRET: process.env.JWT_SECRET || "mysecretkey",
};
