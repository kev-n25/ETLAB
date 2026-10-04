const express = require("express");

const {
    getFacultyClasses,
    getFacultySubjects,
    getClassStudents,
    markAttendance
} = require("../controllers/facultyController");


const router = express.Router();



/*
==========================================
GET FACULTY CLASSES
==========================================
*/

router.get(
    "/:facultyId/classes",
    getFacultyClasses
);



/*
==========================================
GET SUBJECTS FOR A CLASS
==========================================
*/

router.get(
    "/:facultyId/classes/:classId/subjects",
    getFacultySubjects
);

//GET STUDENTS FOR A CLASS
router.get(
    "/:facultyId/classes/:classId/students",
    getClassStudents
);


//MARK ATTENDANCE

router.post(
    "/:facultyId/attendance",
    markAttendance
);


module.exports = router;