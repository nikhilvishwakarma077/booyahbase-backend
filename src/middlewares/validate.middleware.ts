import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (
    schema: ObjectSchema,
    source: "body" | "params" | "query" = "body"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((detail) => detail.message),
            });
        }

        req[source] = value;

        next();
    };
};