const express = require("express");

const {
    getStudentAttendance
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/student/:studentId", getStudentAttendance);

module.exports = router;