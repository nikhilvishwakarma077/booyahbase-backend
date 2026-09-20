import Joi from "joi";

const objectId = Joi.string().hex().length(24);

const variantValidation = Joi.object({
    entryFee: Joi.number()
        .min(0)
        .required(),

    prizePool: Joi.number()
        .min(0)
        .required(),

    matches: Joi.number()
        .integer()
        .min(1)
        .required(),

    totalSlots: Joi.number()
        .integer()
        .min(1)
        .required(),

    availableSlots: Joi.number()
        .integer()
        .min(0)
        .max(Joi.ref("totalSlots"))
        .required(),

    prizeDistribution: Joi.array()
        .items(
            Joi.object({
                position: Joi.string().trim().required(),
                amount: Joi.number().min(0).required(),
            })
        )
        .min(1)
        .required(),

    live: Joi.boolean()
        .optional()
        .default(false),

    caster: Joi.string()
        .trim()
        .allow(null, "")
        .optional(),

    championRush: Joi.boolean()
        .optional()
        .default(false),

    championRushPoints: Joi.number()
        .min(0)
        .allow(null)
        .optional(),

    teamLogo: Joi.boolean()
        .optional()
        .default(false),
});


export const createScrimValidation = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    organizerId: objectId.required(),

    date: Joi.date()
        .iso()
        .required(),

    time: Joi.string()
        .pattern(/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i)
        .required()
        .messages({
            "string.pattern.base": "Time must be in hh:mm AM/PM format",
        }),

    format: Joi.string()
        .valid("Solo", "Duo", "Squad")
        .required(),

    tier: Joi.string()
        .valid("T1", "T2", "T3")
        .required(),

    whatsappNumber: Joi.string()
        .trim()
        .required(),

    variants: Joi.array()
        .items(variantValidation)
        .min(1)
        .required(),

    rules: Joi.string()
        .trim()
        .max(5000)
        .required(),

    importantInformation: Joi.string()
        .trim()
        .max(2000)
        .optional()
        .allow(""),

    published: Joi.boolean()
        .optional(),
});


export const updateScrimValidation = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    organizerId: objectId,

    date: Joi.date()
        .iso(),

    time: Joi.string()
        .pattern(/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i)
        .messages({
            "string.pattern.base": "Time must be in hh:mm AM/PM format",
        }),

    format: Joi.string()
        .valid("Solo", "Duo", "Squad"),

    tier: Joi.string()
        .valid("T1", "T2", "T3"),

    whatsappNumber: Joi.string()
        .trim(),

    variants: Joi.array()
        .items(variantValidation)
        .min(1),

    rules: Joi.string()
        .trim()
        .max(5000),

    importantInformation: Joi.string()
        .trim()
        .max(2000)
        .allow(""),

    published: Joi.boolean(),
}).min(1);


export const scrimIdValidation = Joi.object({
    id: Joi.string()
        .hex()
        .length(24)
        .required(),
});