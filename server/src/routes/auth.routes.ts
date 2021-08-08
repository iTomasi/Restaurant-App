import { Router } from "express";
import * as authCtrls from "../controllers/auth.controllers";

const router = Router();

router.post("/sign-up", authCtrls.POST_signUp);
router.post("/sign-in", authCtrls.POST_signIn);

export default router;
