import config from "../config/config";
import mongoose, { ConnectOptions } from "mongoose";

const opts: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(config.DB.MONGODB_URI, opts)
    .then(() => console.log("MongoDB Connected"))
    .catch((e) => console.log(e));
