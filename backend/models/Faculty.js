const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    employeeId: String,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    designation: String
});

module.exports = mongoose.model("Faculty", facultySchema);