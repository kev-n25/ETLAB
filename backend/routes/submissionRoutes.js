const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { assignment, student } = req.body;

        if (!assignment || !student) {
            return res.status(400).json({
                message: "Assignment and student are required"
            });
        }

        const submission = await Submission.create({
            assignment,
            student
        });

        res.status(201).json(submission);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create submission",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate("assignment");

        res.json(submissions);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch submissions",
            error: error.message
        });
    }
});

module.exports = router;