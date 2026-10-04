const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        semester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
            required: true
        },

        module: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        addedOn: {
            type: Date,
            default: Date.now
        },

        file: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Material", materialSchema);