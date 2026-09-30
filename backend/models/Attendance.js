const mongoose = require("mongoose");

const attendancePeriodSchema = new mongoose.Schema(
    {
        period: {
            type: Number,
            required: true
        },

        courseOffering: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseOffering",
            required: true
        },

        status: {
            type: String,
            enum: [
                "present",
                "absent",
                "leave",
                "na",
                "holiday",
                "dutyleave",
                "onduty",
                "suspension",
                "specialleave"
            ],
            required: true
        },
        topic : {
            type: String,
            trim: true
        }
    },
    {
        _id: false
    }
);

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        periods: {
            type: [attendancePeriodSchema],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Attendance", attendanceSchema);