import { Router } from "express";
import * as authCtrls from "../controllers/auth.controllers";
import passport from "passport";

const router = Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    authCtrls.GET_isAuthenticated
);
router.post("/sign-up", authCtrls.POST_signUp);
router.post("/sign-in", authCtrls.POST_signIn);

export default router;
