import Joi from "joi";

export const loginAdminValidation = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().min(8).required(),
});