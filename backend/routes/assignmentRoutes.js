const express = require("express");
const Assignment = require("../models/Assignment");
require("../models/CourseOffering");
require("../models/Subject");
require("../models/Faculty");
require("../models/Semester");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find()
    .populate({
        path: "courseOffering",
        populate: [
            { path: "subject" },
            { path: "semester" }
        ]
    })
    .populate("faculty");

        const formattedAssignments = assignments.map((assignment) => ({
    id: assignment._id,
    title: assignment.title,
    description: assignment.description,
    subject: assignment.courseOffering.subject.name,
    semester: `S${assignment.courseOffering.semester.semesterNumber}`,
    faculty: assignment.faculty.name,
    issuedOn: new Date(assignment.assignedDate)
    .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }),

dueDate: new Date(assignment.dueDate)
    .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}));

res.json(formattedAssignments);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch assignments",
            error: error.message
        });
    }
});

module.exports = router;