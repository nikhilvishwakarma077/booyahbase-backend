import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrganizer extends Document {
    name: string;
    whatsappNumber: string;
    orgImg: string;

    contactInformation?: {
        email?: string;
        instagram?: string;
        discord?: string;
        telegram?: string;
    };

    description?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const organizerSchema = new Schema<IOrganizer>(
    {
        name: {
            type: String,
            required: [true, "Organizer name is required"],
            trim: true,
            minlength: [2, "Organizer name must be at least 2 characters"],
            maxlength: [100, "Organizer name cannot exceed 100 characters"],
        },

        whatsappNumber: {
            type: String,
            required: [true, "WhatsApp number is required"],
            unique: true,
            trim: true,
            match: [
                /^\+?[1-9]\d{9,14}$/,
                "Please provide a valid WhatsApp number",
            ],
        },

        orgImg: {
            type: String,
            required: [true, "Organizer image is required"],
            trim: true,
            maxlength: [100, "Organizer image name cannot exceed 100 characters"],
        },

        contactInformation: {
            email: {
                type: String,
                lowercase: true,
                trim: true,
                maxlength: [254, "Email cannot exceed 254 characters"],
                match: [
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    "Please provide a valid email address",
                ],
            },

            instagram: {
                type: String,
                trim: true,
                maxlength: [100, "Instagram cannot exceed 100 characters"],
            },

            discord: {
                type: String,
                trim: true,
                maxlength: [100, "Discord cannot exceed 100 characters"],
            },

            telegram: {
                type: String,
                trim: true,
                maxlength: [100, "Telegram cannot exceed 100 characters"],
            },
        },

        description: {
            type: String,
            trim: true,
            maxlength: [
                1000,
                "Description cannot exceed 1000 characters",
            ],
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Organizer: Model<IOrganizer> = mongoose.model<IOrganizer>(
    "Organizer",
    organizerSchema
);

export default Organizer;