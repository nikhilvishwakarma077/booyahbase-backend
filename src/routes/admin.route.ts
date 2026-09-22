import { Router } from "express";
import {
    loginAdmin,
    logoutAdmin,
    getMe,
} from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginAdminValidation } from "../validations/admin.validation.js";
import { adminLoginLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/login",adminLoginLimiter, validate(loginAdminValidation), loginAdmin);

router.post("/logout", protect, logoutAdmin);

router.get("/me", protect, getMe);

export default router;