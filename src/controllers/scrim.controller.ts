import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Scrim from "../models/Scrim.model.js";

// Create Scrim
export const createScrim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      organizerId,
      date,
      time,
      format,
      tier,
      whatsappNumber,
      variants,
      rules,
      importantInformation,
      published,
    } = req.body;

    // Check organizer ID
    if (!mongoose.isValidObjectId(organizerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organizer ID",
      });
    }

    // Check organizer exists
    const organizerExists = await mongoose
      .model("Organizer")
      .exists({ _id: organizerId });

    if (!organizerExists) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // Check variants
    if (!Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one variant is required",
      });
    }

    const scrim = await Scrim.create({
      name,
      organizerId,
      date,
      time,
      format,
      tier,
      whatsappNumber,
      variants,
      rules,
      importantInformation,
      published: published ?? false,
    });

    return res.status(201).json({
      success: true,
      message: "Scrim created successfully",
      data: scrim,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Scrims
export const getScrims = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scrims = await Scrim.find()
      .populate("organizerId", "name isVerified")
      .sort({ date: 1, time: 1 });

    return res.status(200).json({
      success: true,
      data: scrims,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Scrim
export const getScrim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scrim ID",
      });
    }

    const scrim = await Scrim.findById(id).populate(
      "organizerId",
      "name contactInformation isVerified"
    );

    if (!scrim) {
      return res.status(404).json({
        success: false,
        message: "Scrim not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scrim,
    });
  } catch (error) {
    next(error);
  }
};

// Update Scrim
export const updateScrim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scrim ID",
      });
    }

    const scrim = await Scrim.findById(id);

    if (!scrim) {
      return res.status(404).json({
        success: false,
        message: "Scrim not found",
      });
    }

    const {
      name,
      organizerId,
      date,
      time,
      format,
      tier,
      whatsappNumber,
      variants,
      rules,
      importantInformation,
      published,
    } = req.body;

    // Validate new organizer if provided
    if (organizerId !== undefined) {
      if (!mongoose.isValidObjectId(organizerId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid organizer ID",
        });
      }

      const organizerExists = await mongoose
        .model("Organizer")
        .exists({ _id: organizerId });

      if (!organizerExists) {
        return res.status(404).json({
          success: false,
          message: "Organizer not found",
        });
      }

      scrim.organizerId = organizerId;
    }

    // Update basic fields
    if (name !== undefined) scrim.name = name;
    if (date !== undefined) scrim.date = date;
    if (time !== undefined) scrim.time = time;
    if (format !== undefined) scrim.format = format;
    if (tier !== undefined) scrim.tier = tier;

    // Scrim-specific WhatsApp number
    if (whatsappNumber !== undefined) {
      scrim.whatsappNumber = whatsappNumber;
    }

    // Update variants
    if (variants !== undefined) {
      if (!Array.isArray(variants) || variants.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one variant is required",
        });
      }

      scrim.variants = variants;
    }

    // Update additional information
    if (rules !== undefined) {
      scrim.rules = rules;
    }

    if (importantInformation !== undefined) {
      scrim.importantInformation = importantInformation;
    }

    if (published !== undefined) {
      scrim.published = published;
    }

    await scrim.save();

    return res.status(200).json({
      success: true,
      message: "Scrim updated successfully",
      data: scrim,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Scrim
export const deleteScrim = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid scrim ID",
      });
    }

    const scrim = await Scrim.findByIdAndDelete(id);

    if (!scrim) {
      return res.status(404).json({
        success: false,
        message: "Scrim not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Scrim deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};