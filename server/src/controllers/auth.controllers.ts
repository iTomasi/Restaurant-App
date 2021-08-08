import { Handler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

// Models
import Account from "../models/Account";

// Libs
import getUser from "../libs/getUser";

export const GET_isAuthenticated: Handler = (req, res) => {
    const theUser = getUser(req.user);

    return res.json(theUser);
};

export const POST_signUp: Handler = async (req, res) => {
    const { username, password, confirm_password } = req.body;

    if (!username || !password || !confirm_password) {
        return res.json({ message: "Datas missing" });
    } else if (username.length < 3) {
        return res.json({
            message: "Tu nombre de usuario debe tener almenos 3 caracteres",
        });
    } else if (password.length < 4) {
        return res.json({
            message: "Tu contrasena debe tener almenos 4 caracteres",
        });
    } else if (password !== confirm_password) {
        return res.json({ message: "Las contrasenas no coinciden" });
    }

    try {
        const user = await Account.findOne({
            username_lower: username.toLowerCase(),
        });

        if (user) {
            return res.json({ message: "Nombre de usuario ya existente" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await new Account({
            username,
            username_lower: username.toLowerCase(),
            password: hash,
        }).save();

        return res.json({ message: "OK" });
    } catch (e) {
        console.log(e);
        console.log("POST_signUp() Error");
        return res.json({ message: "Server Error" });
    }
};

export const POST_signIn: Handler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.json({ message: "Datas is missing" });

    try {
        const user = await Account.findOne({
            username_lower: username.toLowerCase(),
        });

        if (!user) return res.json({ message: "Usuario no encontrado" });

        const compare = await bcrypt.compare(password, user.password);

        if (!compare)
            return res.json({ message: "Usuario o contrasena invalido" });

        const token = jwt.sign(
            {
                id: user._id,
            },
            config.JWT_SECRET,
            { expiresIn: 86400 }
        );

        const theUser = getUser(user);

        res.json({ message: "OK", token, userData: theUser });
    } catch (e) {
        console.log(e);
        console.log("POST_signIn() Error");
        return res.json({ message: "Server Error" });
    }
};
