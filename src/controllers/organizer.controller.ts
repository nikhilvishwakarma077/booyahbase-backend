import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Organizer from "../models/Organizer.model.js";

// Create Organizer
export const createOrganizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            name,
            whatsappNumber,
            orgImg,
            contactInformation,
            description,
        } = req.body;

        const organizer = await Organizer.create({
            name,
            whatsappNumber,
            orgImg,
            contactInformation,
            description,
            isVerified: false,
        });

        return res.status(201).json({
            success: true,
            message: "Organizer created successfully",
            data: organizer,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Organizers
export const getOrganizers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const organizers = await Organizer.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            data: organizers,
        });
    } catch (error) {
        next(error);
    }
};

// Get Single Organizer
export const getOrganizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid organizer ID",
            });
        }

        const organizer = await Organizer.findById(id);

        if (!organizer) {
            return res.status(404).json({
                success: false,
                message: "Organizer not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: organizer,
        });
    } catch (error) {
        next(error);
    }
}; 

// Update Organizer
export const updateOrganizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid organizer ID",
            });
        }

        const { 
            name,
            whatsappNumber,
            orgImg,
            contactInformation,
            description,
            isVerified,
        } = req.body;

        const organizer = await Organizer.findById(id);

        if (!organizer) {
            return res.status(404).json({
                success: false,
                message: "Organizer not found",
            });
        }

        if (name !== undefined) {
            organizer.name = name;
        }

        if (whatsappNumber !== undefined) {
            organizer.whatsappNumber = whatsappNumber;
        }

        if (orgImg !== undefined) {
            organizer.orgImg = orgImg;
        }

        if (contactInformation !== undefined) {
            organizer.contactInformation = contactInformation;
        }

        if (description !== undefined) {
            organizer.description = description;
        }

        if (isVerified !== undefined) {
            organizer.isVerified = isVerified;
        }

        await organizer.save();

        return res.status(200).json({
            success: true,
            message: "Organizer updated successfully",
            data: organizer,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Organizer
export const deleteOrganizer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid organizer ID",
            });
        }

        const organizer = await Organizer.findByIdAndDelete(id);

        if (!organizer) {
            return res.status(404).json({
                success: false,
                message: "Organizer not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Organizer deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};