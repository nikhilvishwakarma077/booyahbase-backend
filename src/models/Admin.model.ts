import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin";
    createdAt: Date;
    updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: [true, "Admin name is required"],
            trim: true,
            minlength: [2, "Admin name must be at least 2 characters"],
            maxlength: [50, "Admin name cannot exceed 50 characters"],
        },

        email: {
            type: String,
            required: [true, "Admin email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: [254, "Email cannot exceed 254 characters"],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false,
        },

        role: {
            type: String,
            enum: {
                values: ["admin"],
                message: "Role must be admin",
            },
            default: "admin",
            immutable: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>(
    "Admin",
    adminSchema
);

export default Admin;