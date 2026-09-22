import { Router } from "express";

import {
    createScrim,
    getScrims,
    getScrim,
    updateScrim,
    deleteScrim,
} from "../controllers/scrim.controller.js";
import { scrimIdValidation } from "../validations/scrim.validation.js";

import { protect } from "../middlewares/auth.middleware.js";

import {
    createScrimValidation,
    updateScrimValidation,
} from "../validations/scrim.validation.js";

import { validate } from "../middlewares/validate.middleware.js";
import { adminLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post(
    "/",
    adminLimiter,
    protect,
    validate(createScrimValidation),
    createScrim
);

router.get("/", getScrims);

router.get(
    "/:id",
    validate(scrimIdValidation, "params"),
    getScrim
);

router.put(
    "/:id",
    adminLimiter,
    protect,
    validate(scrimIdValidation, "params"),
    validate(updateScrimValidation),
    updateScrim
);

router.delete(
    "/:id",
    adminLimiter,
    protect,
    validate(scrimIdValidation, "params"),
    deleteScrim
);

export default router;