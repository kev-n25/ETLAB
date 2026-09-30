const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const User = require("./models/User");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
const Department = require("./models/Department");
const Semester = require("./models/Semester");
const Subject = require("./models/Subject");
const CourseOffering = require("./models/CourseOffering");
const Attendance = require("./models/Attendance");
const Assignment = require("./models/Assignment");
const Submission = require("./models/Submission");

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Clearing old data...");

        await Submission.deleteMany({});
        await Assignment.deleteMany({});
        await Attendance.deleteMany({});
        await CourseOffering.deleteMany({});
        await Subject.deleteMany({});
        await Student.deleteMany({});
        await Faculty.deleteMany({});
        await Semester.deleteMany({});
        await Department.deleteMany({});
        await User.deleteMany({});

        console.log("Old data cleared.");

        // --------------------------------------------------
        // 1. DEPARTMENT
        // --------------------------------------------------

        const department = await Department.create({
            name: "Computer Science and Engineering",
            code: "CSE"
        });

        // --------------------------------------------------
        // 2. SEMESTER
        // --------------------------------------------------

        const semester = await Semester.create({
            semesterNumber: 5,
            academicYear: "2026-27",
            section: "A",
            department: department._id,
            isActive: true
        });

        // --------------------------------------------------
        // 3. USERS
        // --------------------------------------------------

        const studentUser = await User.create({
            username: "kevin",
            email: "kevin@example.com",
            password: "password123",
            role: "student"
        });

        const facultyUser1 = await User.create({
            username: "faculty1",
            email: "faculty1@example.com",
            password: "password123",
            role: "faculty"
        });

        const facultyUser2 = await User.create({
            username: "faculty2",
            email: "faculty2@example.com",
            password: "password123",
            role: "faculty"
        });

        const facultyUser3 = await User.create({
            username: "faculty3",
            email: "faculty3@example.com",
            password: "password123",
            role: "faculty"
        });

        // --------------------------------------------------
        // 4. STUDENT
        // --------------------------------------------------

        const student = await Student.create({
            user: studentUser._id,
            name: "Kevin Reji",
            registerNumber: "TKM23CS001",
            rollNumber: "01",
            department: department._id,
            semester: semester._id,
            admissionYear: 2023
        });

        // --------------------------------------------------
        // 5. FACULTY
        // --------------------------------------------------

        const faculty1 = await Faculty.create({
            user: facultyUser1._id,
            name: "Dr. Anil Kumar",
            employeeId: "FAC001",
            department: department._id,
            designation: "Assistant Professor"
        });

        const faculty2 = await Faculty.create({
            user: facultyUser2._id,
            name: "Dr. Priya Menon",
            employeeId: "FAC002",
            department: department._id,
            designation: "Assistant Professor"
        });

        const faculty3 = await Faculty.create({
            user: facultyUser3._id,
            name: "Dr. Rahul Nair",
            employeeId: "FAC003",
            department: department._id,
            designation: "Associate Professor"
        });

        // --------------------------------------------------
        // 6. SUBJECTS
        // --------------------------------------------------

        const dbms = await Subject.create({
            name: "Database Management Systems",
            code: "CSE301",
            credits: 4,
            department: department._id
        });

        const os = await Subject.create({
            name: "Operating Systems",
            code: "CSE302",
            credits: 4,
            department: department._id
        });

        const cn = await Subject.create({
            name: "Computer Networks",
            code: "CSE303",
            credits: 4,
            department: department._id
        });

        const ai = await Subject.create({
            name: "Artificial Intelligence",
            code: "CSE304",
            credits: 3,
            department: department._id
        });

        const ml = await Subject.create({
            name: "Machine Learning",
            code: "CSE305",
            credits: 4,
            department: department._id
        });

        const se = await Subject.create({
            name: "Software Engineering",
            code: "CSE306",
            credits: 3,
            department: department._id
        });

        const toc = await Subject.create({
            name: "Theory of Computation",
            code: "CSE307",
            credits: 3,
            department: department._id
        });

        const elective = await Subject.create({
            name: "Web Technologies",
            code: "CSE308",
            credits: 3,
            department: department._id
        });

        // --------------------------------------------------
        // 7. COURSE OFFERINGS
        // --------------------------------------------------

        const offeringDBMS = await CourseOffering.create({
            subject: dbms._id,
            faculty: faculty1._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringOS = await CourseOffering.create({
            subject: os._id,
            faculty: faculty2._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringCN = await CourseOffering.create({
            subject: cn._id,
            faculty: faculty3._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringAI = await CourseOffering.create({
            subject: ai._id,
            faculty: faculty1._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringML = await CourseOffering.create({
            subject: ml._id,
            faculty: faculty2._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringSE = await CourseOffering.create({
            subject: se._id,
            faculty: faculty3._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringTOC = await CourseOffering.create({
            subject: toc._id,
            faculty: faculty1._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        const offeringWeb = await CourseOffering.create({
            subject: elective._id,
            faculty: faculty2._id,
            semester: semester._id,
            academicYear: "2026-27",
            section: "A"
        });

        // --------------------------------------------------
        // 8. ATTENDANCE
        // --------------------------------------------------

        const attendanceData = [
            {
                date: "2026-09-01",
                periods: [
                    [1, offeringDBMS, "present"],
                    [2, offeringOS, "present"],
                    [3, offeringCN, "present"],
                    [4, offeringAI, "present"],
                    [5, offeringML, "present"],
                    [6, offeringSE, "present"],
                    [7, offeringTOC, "na"],
                    [8, offeringWeb, "na"]
                ]
            },
            {
                date: "2026-09-02",
                periods: [
                    [1, offeringDBMS, "present"],
                    [2, offeringOS, "absent"],
                    [3, offeringCN, "present"],
                    [4, offeringAI, "present"],
                    [5, offeringML, "present"],
                    [6, offeringSE, "present"],
                    [7, offeringTOC, "present"],
                    [8, offeringWeb, "present"]
                ]
            },
            {
                date: "2026-09-03",
                periods: [
                    [1, offeringDBMS, "present"],
                    [2, offeringOS, "present"],
                    [3, offeringCN, "absent"],
                    [4, offeringAI, "present"],
                    [5, offeringML, "present"],
                    [6, offeringSE, "present"],
                    [7, offeringTOC, "present"],
                    [8, offeringWeb, "present"]
                ]
            },
            {
                date: "2026-09-04",
                periods: [
                    [1, offeringDBMS, "present"],
                    [2, offeringOS, "present"],
                    [3, offeringCN, "present"],
                    [4, offeringAI, "present"],
                    [5, offeringML, "present"],
                    [6, offeringSE, "present"],
                    [7, offeringTOC, "na"],
                    [8, offeringWeb, "na"]
                ]
            },
            {
                date: "2026-09-05",
                periods: [
                    [1, offeringDBMS, "present"],
                    [2, offeringOS, "present"],
                    [3, offeringCN, "absent"],
                    [4, offeringAI, "present"],
                    [5, offeringML, "present"],
                    [6, offeringSE, "absent"],
                    [7, offeringTOC, "present"],
                    [8, offeringWeb, "present"]
                ]
            }
        ];

        for (const day of attendanceData) {
            await Attendance.create({
                student: student._id,
                date: new Date(day.date),
                periods: day.periods.map(([period, courseOffering, status]) => ({
                    period,
                    courseOffering: courseOffering._id,
                    status
                }))
            });
        }

        // --------------------------------------------------
        // 9. ASSIGNMENTS
        // --------------------------------------------------

        const assignment1 = await Assignment.create({
            title: "DBMS SQL Assignment",
            description: "Write SQL queries for the given database schema.",
            courseOffering: offeringDBMS._id,
            faculty: faculty1._id,
            assignedDate: new Date("2026-09-01"),
            dueDate: new Date("2026-09-10")
        });

        const assignment2 = await Assignment.create({
            title: "Operating Systems Assignment",
            description: "Implement and analyse CPU scheduling algorithms.",
            courseOffering: offeringOS._id,
            faculty: faculty2._id,
            assignedDate: new Date("2026-09-03"),
            dueDate: new Date("2026-09-12")
        });

        const assignment3 = await Assignment.create({
            title: "Computer Networks Assignment",
            description: "Study TCP and UDP and compare their characteristics.",
            courseOffering: offeringCN._id,
            faculty: faculty3._id,
            assignedDate: new Date("2026-09-05"),
            dueDate: new Date("2026-09-15")
        });

        // --------------------------------------------------
        // 10. SUBMISSION
        // --------------------------------------------------

        await Submission.create({
            assignment: assignment1._id,
            student: student._id,
            submittedAt: new Date("2026-09-08"),
            status: "submitted"
        });

        console.log("");
        console.log("========================================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("========================================");
        console.log(`Student: ${student.name}`);
        console.log(`Register Number: ${student.registerNumber}`);
        console.log(`Subjects: 8`);
        console.log(`Attendance Days: ${attendanceData.length}`);
        console.log(`Assignments: 3`);
        console.log("========================================");

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("SEED ERROR:", error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedDatabase();