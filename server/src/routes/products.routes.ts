import { Router } from "express";
import * as productsCtrls from "../controllers/products.controllers";
import passport from "passport";

const router = Router();

router.get("/", productsCtrls.GET_products);

router.post(
    "/add",
    passport.authenticate("jwt_admin", { session: false }),
    productsCtrls.POST_addProduct
);

export default router;
