const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    semesterNumber: Number,
    academicYear: String,
    section: String,
    isActive: Boolean
});

module.exports = mongoose.model("Semester", semesterSchema);