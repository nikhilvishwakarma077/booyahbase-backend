import { Router } from "express";

import {
    createOrganizer,
    getOrganizers,
    getOrganizer,
    updateOrganizer,
    deleteOrganizer,
} from "../controllers/organizer.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createOrganizerValidation,
    updateOrganizerValidation,
    organizerIdValidation,
} from "../validations/organizer.validation.js";
import { adminLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post(
    "/",
    adminLimiter,
    protect,
    validate(createOrganizerValidation),
    createOrganizer
);

router.get("/", getOrganizers);

router.get(
    "/:id",
    validate(organizerIdValidation, "params"),
    getOrganizer
);

router.put(
    "/:id",
    adminLimiter,
    protect,
    validate(organizerIdValidation, "params"),
    validate(updateOrganizerValidation),
    updateOrganizer
);

router.delete(
    "/:id",
    adminLimiter,
    protect,
    validate(organizerIdValidation, "params"),
    deleteOrganizer
);

export default router;