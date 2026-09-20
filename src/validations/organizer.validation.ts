import Joi from "joi";

const objectId = Joi.string().hex().length(24);

const orgImg = Joi.string()
    .trim()
    .max(100)
    .pattern(/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i)
    .messages({
        "string.pattern.base":
            "Organizer image must be a valid image filename",
    });

export const createOrganizerValidation = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    whatsappNumber: Joi.string()
        .pattern(/^\+?[1-9]\d{9,14}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Please provide a valid WhatsApp number",
        }),

    orgImg: orgImg.required(),

    contactInformation: Joi.object({
        email: Joi.string().email().max(254),

        instagram: Joi.string()
            .trim()
            .max(100),

        discord: Joi.string()
            .trim()
            .max(100),

        telegram: Joi.string()
            .trim()
            .max(100),
    }).optional(),

    description: Joi.string()
        .trim()
        .max(1000)
        .optional(),
});

export const updateOrganizerValidation = Joi.object({
    name: Joi.string().trim().min(2).max(100),

    whatsappNumber: Joi.string()
        .pattern(/^\+?[1-9]\d{9,14}$/)
        .messages({
            "string.pattern.base":
                "Please provide a valid WhatsApp number",
        }),

    orgImg: orgImg,

    contactInformation: Joi.object({
        email: Joi.string().email().max(254),

        instagram: Joi.string()
            .trim()
            .max(100),

        discord: Joi.string()
            .trim()
            .max(100),

        telegram: Joi.string()
            .trim()
            .max(100),
    }),

    description: Joi.string()
        .trim()
        .max(1000),

    isVerified: Joi.boolean(),
}).min(1);

export const organizerIdValidation = Joi.object({
    id: objectId.required(),
});