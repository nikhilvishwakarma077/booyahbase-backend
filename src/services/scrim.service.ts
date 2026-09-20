import Admin from "../models/Admin.model.js";

export const loginAdmin = async (email: string) => {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
        throw new Error("Invalid email or password");
    }

    return admin;
};

export const getAdminProfile = async (adminId: string) => {
    const admin = await Admin.findById(adminId);

    if (!admin) {
        throw new Error("Admin not found");
    }

    return admin;
};

export const updateAdminProfile = async (
    adminId: string,
    data: {
        name?: string;
        email?: string;
    }
) => {
    const admin = await Admin.findByIdAndUpdate(
        adminId,
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!admin) {
        throw new Error("Admin not found");
    }

    return admin;
};