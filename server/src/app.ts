import express from "express";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import passport_jwt from "./passport/passport_jwt";
import passport_jwt_admin from "./passport/passport_jwt_admin";
import passport_jwt_waiter from "./passport/passport_jwt_waiter";

// Routes
import routeAuth from "./routes/auth.routes";
import routeProduct from "./routes/products.routes";
import routeWaiter from "./routes/waiter.routes";

const app = express();
const server = createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passport_jwt);
passport.use("jwt_waiter", passport_jwt_waiter);
passport.use("jwt_admin", passport_jwt_admin);

app.get("/", (req, res) => {
    res.json({
        message: "Restaurant Api",
        version: "1.0.0",
    });
});

app.use("/auth", routeAuth);
app.use("/products", routeProduct);
app.use("/waiter", routeWaiter);

export { app, server };
