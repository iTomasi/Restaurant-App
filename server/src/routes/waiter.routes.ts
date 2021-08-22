import { Router } from "express";
import * as waiterCtrls from "../controllers/waiter.controllers";
import passport from "passport";

const router = Router();

router.post(
    "/insert-order",
    passport.authenticate("jwt_waiter", { session: false }),
    waiterCtrls.POST_insertOrder
);

export default router;
