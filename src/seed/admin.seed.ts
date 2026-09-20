import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.model.js";
import { connectDB } from "../config/db.js";

const createAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne();

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            throw new Error("ADMIN_PASSWORD is not defined");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Admin.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin created successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Failed to create admin:", error);
        process.exit(1);
    }
};

createAdmin();