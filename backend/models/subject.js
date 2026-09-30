const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: String,
    code: String,
    credits: Number,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }
});

module.exports = mongoose.model("Subject", subjectSchema);