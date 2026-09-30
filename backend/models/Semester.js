const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
    {
        semesterNumber: {
            type: Number,
            required: true,
            min: 1,
            max: 8
        },

        academicYear: {
            type: String,
            required: true
        },

        section: {
            type: String,
            default: "A"
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Semester", semesterSchema);