const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "Internet",
                "Electrical",
                "Maintenance",
                "Cleanliness",
                "Infrastructure",
                "Other"
            ],
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "OPEN",
                "ASSIGNED",
                "IN_PROGRESS",
                "RESOLVED"
            ],
            default: "OPEN"
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Issue", issueSchema);