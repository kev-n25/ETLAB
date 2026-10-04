const CourseOffering = require("../models/CourseOffering");


/*
==========================================
GET CLASSES TAUGHT BY FACULTY
==========================================

Returns the classes assigned to the
logged-in faculty.
*/

const getFacultyClasses = async (req, res) => {

    try {

        const facultyId = req.params.facultyId;


        const courseOfferings =
            await CourseOffering.find({
                faculty: facultyId
            })
            .populate(
                "semester",
                "semesterNumber academicYear section"
            )
            .populate(
                "subject",
                "name code"
            );


        /*
        Remove duplicate classes.

        A faculty may teach multiple
        subjects to the same class.
        */

        const classes = [];


        courseOfferings.forEach(course => {

            if (!course.semester) {
                return;
            }


            const classId =
                course.semester._id.toString();


            const alreadyExists =
                classes.find(
                item =>
                    item.id.toString() === classId
                );


            if (!alreadyExists) {

                classes.push({

                    id: classId,

                    semesterNumber:
                        course.semester.semesterNumber,

                    academicYear:
                        course.semester.academicYear,

                    section:
                        course.semester.section

                });

            }

        });


        res.json({

            success: true,

            count: classes.length,

            data: classes

        });


    } catch (error) {

        console.error(
            "Get faculty classes error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to fetch faculty classes"

        });

    }

};



/*
==========================================
GET SUBJECTS FOR FACULTY + CLASS
==========================================

Returns only the subjects that the
logged-in faculty teaches for the
selected class.
*/

const getFacultySubjects = async (req, res) => {

    try {

        const facultyId =
            req.params.facultyId;

        const classId =
            req.params.classId;


        const courseOfferings =
            await CourseOffering.find({

                faculty: facultyId,

                semester: classId

            })
            .populate(
                "subject",
                "name code credits"
            );


        const subjects =
            courseOfferings.map(course => ({

                courseOfferingId:
                    course._id,

                subject:
                    course.subject

            }));


        res.json({

            success: true,

            count: subjects.length,

            data: subjects

        });


    } catch (error) {

        console.error(
            "Get faculty subjects error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to fetch faculty subjects"

        });

    }

};

/*
==========================================
GET STUDENTS FOR FACULTY CLASS
==========================================
*/

const getClassStudents = async (req, res) => {

    try {

        const facultyId =
            req.params.facultyId;

        const classId =
            req.params.classId;


        /*
        First check whether this faculty
        actually teaches this class.
        */

        const courseOffering =
            await CourseOffering.findOne({

                faculty: facultyId,

                semester: classId

            });


        if (!courseOffering) {

            return res.status(403).json({

                success: false,

                message:
                    "Faculty is not assigned to this class"

            });

        }


        /*
        Faculty is assigned to the class.
        Now get the students.
        */

        const Student =
            require("../models/Student");


        const students =
            await Student.find({

                semester: classId

            })
            .select(
                "name registerNumber rollNumber"
            )
            .sort({
                rollNumber: 1
            });


        res.json({

            success: true,

            count: students.length,

            data: students

        });


    } catch (error) {

        console.error(
            "Get class students error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to fetch class students"

        });

    }

};

/*
==========================================
MARK ATTENDANCE FOR CLASS
==========================================
*/

const markAttendance = async (req, res) => {

    try {

        const facultyId =
            req.params.facultyId;


        const {
            date,
            classId,
            courseOfferingId,
            period,
            topic,
            students
        } = req.body;


        /*
        ==================================
        BASIC VALIDATION
        ==================================
        */

        if (
            !date ||
            !classId ||
            !courseOfferingId ||
            !period ||
            !students ||
            !Array.isArray(students)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Missing required attendance data"

            });

        }


        /*
        ==================================
        VERIFY COURSE OFFERING
        ==================================
        */

        const courseOffering =
            await CourseOffering.findOne({

                _id: courseOfferingId,

                faculty: facultyId,

                semester: classId

            });


        if (!courseOffering) {

            return res.status(403).json({

                success: false,

                message:
                    "Invalid course offering for this faculty and class"

            });

        }


        /*
        ==================================
        LOAD MODELS
        ==================================
        */

        const Attendance =
            require("../models/Attendance");

        const Student =
            require("../models/Student");


        /*
        ==================================
        VERIFY STUDENTS BELONG TO CLASS
        ==================================
        */

        const studentIds =
            students.map(
                student => student.studentId
            );


        const validStudents =
            await Student.find({

                _id: {
                    $in: studentIds
                },

                semester: classId

            });


        if (
            validStudents.length !==
            students.length
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "One or more students do not belong to this class"

            });

        }


        /*
        ==================================
        PROCESS EACH STUDENT
        ==================================
        */

        for (const student of students) {

            /*
            Find attendance for this student
            on this particular date.
            */

            let attendance =
                await Attendance.findOne({

                    student:
                        student.studentId,

                    date:
                        new Date(date)

                });


            /*
            ==================================
            CREATE NEW ATTENDANCE DOCUMENT
            ==================================
            */

            if (!attendance) {

                attendance =
                    new Attendance({

                        student:
                            student.studentId,

                        date:
                            new Date(date),

                        periods: []

                    });

            }


            /*
            ==================================
            FIND EXISTING PERIOD
            ==================================
            */

            const existingPeriodIndex =
                attendance.periods.findIndex(
                    item =>
                        item.period === period
                );


            /*
            ==================================
            PERIOD ALREADY EXISTS
            ==================================
            */

            if (
                existingPeriodIndex !== -1
            ) {

                attendance.periods[
                    existingPeriodIndex
                ].courseOffering =
                    courseOfferingId;

                attendance.periods[
                    existingPeriodIndex
                ].status =
                    student.status;

                attendance.periods[
                    existingPeriodIndex
                ].topic =
                    topic || "";

            }


            /*
            ==================================
            NEW PERIOD
            ==================================
            */

            else {

                attendance.periods.push({

                    period:
                        period,

                    courseOffering:
                        courseOfferingId,

                    status:
                        student.status,

                    topic:
                        topic || ""

                });

            }


            /*
            Save student attendance
            */

            await attendance.save();

        }


        /*
        ==================================
        SUCCESS
        ==================================
        */

        res.json({

            success: true,

            message:
                "Attendance saved successfully",

            studentsUpdated:
                students.length

        });


    } catch (error) {

        console.error(
            "Mark attendance error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Failed to save attendance"

        });

    }

};



module.exports = {

    getFacultyClasses,

    getFacultySubjects,

    getClassStudents,

    markAttendance

};