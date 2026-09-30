const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        courseOffering: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseOffering",
            required: true
        },

        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
            required: true
        },

        assignedDate: {
            type: Date,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;