/*const Attendance = require("../models/Attendance");

const getStudentAttendance = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const attendance = await Attendance.find({
            student: studentId
        })
        .populate({
            path: "periods.courseOffering",
            populate: [
                {
                    path: "subject",
                    select: "name code"
                },
                {
                    path: "faculty",
                    select: "name"
                }
            ]
        })
        .sort({ date: 1 });

        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance"
        });
    }
};

module.exports = {
    getStudentAttendance
};*/

const Attendance = require("../models/Attendance");
const CourseOffering = require("../models/CourseOffering");
const Subject = require("../models/Subject");
const Faculty = require("../models/Faculty");

const getStudentAttendance = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        console.log("================================");
        console.log("Requested Student ID:", studentId);
        console.log("Database:", Attendance.db.name);

        const allAttendance = await Attendance.find({});

        console.log("Total attendance documents:", allAttendance.length);

        if (allAttendance.length > 0) {
            console.log(
                "First attendance student:",
                allAttendance[0].student.toString()
            );
        }

        const attendance = await Attendance.find({
            student: studentId
        })
        .populate({
            path: "periods.courseOffering",
            populate: [
                {
                    path: "subject",
                    select: "name code"
                },
                {
                    path: "faculty",
                    select: "name"
                }
            ]
        })
        .sort({ date: 1 });

        console.log("Matching attendance:", attendance.length);
        console.log("================================");

        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch attendance"
        });
    }
};

module.exports = {
    getStudentAttendance
};