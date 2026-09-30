const mongoose = require("mongoose");

const courseOfferingSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
            required: true
        },

        semester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
            required: true
        },

        academicYear: {
            type: String,
            required: true
        },

        section: {
            type: String,
            required: true
        }
    }
);

const CourseOffering = mongoose.model(
    "CourseOffering",
    courseOfferingSchema
);

module.exports = CourseOffering;