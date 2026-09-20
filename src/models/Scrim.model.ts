import mongoose, { Document, Schema, Model } from "mongoose";

export type ScrimTier = "T1" | "T2" | "T3";
export type ScrimFormat = "Solo" | "Duo" | "Squad";

export interface IPrizeDistribution {
    position: string;
    amount: number;
}


export interface IScrimVariant {
    entryFee: number;
    prizePool: number;
    matches: number;
    totalSlots: number;
    availableSlots: number;

    prizeDistribution: IPrizeDistribution[];

    live: boolean;
    caster: string | null;

    championRush: boolean;
    championRushPoints: number | null;

    teamLogo: boolean;
}

export interface IScrim extends Document {
    name: string;
    organizerId: mongoose.Types.ObjectId;

    date: Date;
    time: string;

    format: ScrimFormat;
    tier: ScrimTier;

    whatsappNumber: string;

    variants: IScrimVariant[];

    rules: string;
    importantInformation?: string;

    published: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const scrimVariantSchema = new Schema<IScrimVariant>(
    {
        entryFee: {
            type: Number,
            required: [true, "Entry fee is required"],
            min: [0, "Entry fee cannot be negative"],
        },

        prizePool: {
            type: Number,
            required: [true, "Prize pool is required"],
            min: [0, "Prize pool cannot be negative"],
        },

        matches: {
            type: Number,
            required: [true, "Number of matches is required"],
            min: [1, "Matches must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Matches must be an integer",
            },
        },

        totalSlots: {
            type: Number,
            required: [true, "Total slots are required"],
            min: [1, "Total slots must be at least 1"],
            validate: {
                validator: Number.isInteger,
                message: "Total slots must be an integer",
            },
        },

        availableSlots: {
            type: Number,
            required: [true, "Available slots are required"],
            min: [0, "Available slots cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Available slots must be an integer",
            },
        },

        prizeDistribution: [
            {
                _id: false,
                position: {
                    type: String,
                    required: true,
                    trim: true,
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        live: {
            type: Boolean,
            default: false,
        },

        caster: {
            type: String,
            trim: true,
            default: null,
        },

        championRush: {
            type: Boolean,
            default: false,
        },

        championRushPoints: {
            type: Number,
            min: [0, "Champion Rush points cannot be negative"],
            default: null,
        },

        teamLogo: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const scrimSchema = new Schema<IScrim>(
    {
        name: {
            type: String,
            required: [true, "Scrim name is required"],
            trim: true,
            minlength: [2, "Scrim name must be at least 2 characters"],
            maxlength: [100, "Scrim name cannot exceed 100 characters"],
        },

        organizerId: {
            type: Schema.Types.ObjectId,
            ref: "Organizer",
            required: [true, "Organizer is required"],
        },

        date: {
            type: Date,
            required: [true, "Scrim date is required"],
        }, 

        time: {
            type: String,
            required: [true, "Scrim time is required"],
            match: [
                /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i,
                "Time must be in hh:mm AM/PM format",
            ],
        },

        format: {
            type: String,
            enum: {
                values: ["Solo", "Duo", "Squad"],
                message: "Format must be Solo, Duo, or Squad",
            },
            required: [true, "Scrim format is required"],
        },

        tier: {
            type: String,
            enum: {
                values: ["T1", "T2", "T3"],
                message: "Tier must be T1, T2, or T3",
            },
            required: [true, "Scrim tier is required"],
        },

        whatsappNumber: {
            type: String,
            required: [true, "WhatsApp number is required"],
            trim: true,
        },

        variants: {
            type: [scrimVariantSchema],
            required: [true, "At least one variant is required"],
            validate: {
                validator: (variants: IScrimVariant[]) =>
                    variants.length > 0,
                message: "At least one variant is required",
            },
        },

        rules: {
            type: String,
            required: [true, "Scrim rules are required"],
            trim: true,
            maxlength: [5000, "Rules cannot exceed 5000 characters"],
        },

        importantInformation: {
            type: String,
            trim: true,
            maxlength: [
                2000,
                "Important information cannot exceed 2000 characters",
            ],
        },

        published: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Scrim: Model<IScrim> = mongoose.model<IScrim>(
    "Scrim",
    scrimSchema
);

export default Scrim;