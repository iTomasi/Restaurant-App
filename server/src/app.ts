import express from "express";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import passport_jwt from "./passport/passport_jwt";

// Routes
import routeAuth from "./routes/auth.routes";

const app = express();
const server = createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passport_jwt);

app.get("/", (req, res) => {
    res.json({
        message: "Restaurant Api",
        version: "1.0.0",
    });
});

app.use("/auth", routeAuth);

export { app, server };
