const API =
    "http://localhost:5000/api";

const facultyId =
    localStorage.getItem("facultyId");

const facultyName =
    localStorage.getItem("facultyName");


const classSelect =
    document.getElementById("classSelect");

const subjectSelect =
    document.getElementById("subjectSelect");

const studentBody =
    document.getElementById("studentBody");

const saveButton =
    document.getElementById("saveButton");

const message =
    document.getElementById("message");


let students = [];

let subjects = [];


/*
==========================================
CHECK FACULTY LOGIN
==========================================
*/

if (!facultyId) {

    window.location.href =
        "index.html";

}


document.getElementById(
    "facultyName"
).textContent =
    facultyName || "Faculty";


/*
==========================================
DEFAULT DATE
==========================================
*/

document.getElementById(
    "attendanceDate"
).value =
    new Date()
        .toISOString()
        .split("T")[0];


/*
==========================================
LOAD FACULTY CLASSES
==========================================
*/

async function loadClasses() {

    try {

        const response =
            await fetch(
                `${API}/faculty/${facultyId}/classes`
            );

        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        classSelect.innerHTML =
            `<option value="">
                Select Class
            </option>`;


        result.data.forEach(item => {

            const option =
                document.createElement("option");


            option.value =
                item.id;


            option.textContent =
                `Semester ${item.semesterNumber} - Section ${item.section} (${item.academicYear})`;


            classSelect.appendChild(
                option
            );

        });


    } catch (error) {

        console.error(error);

        message.textContent =
            "Failed to load classes.";

    }

}


/*
==========================================
CLASS CHANGED
==========================================
*/

classSelect.addEventListener(
    "change",
    async function () {

        const classId =
            this.value;


        subjectSelect.disabled =
            true;


        subjectSelect.innerHTML =
            `<option value="">
                Select Subject
            </option>`;


        studentBody.innerHTML =
            `<tr>
                <td colspan="4">
                    Select a class and subject
                </td>
            </tr>`;


        saveButton.disabled =
            true;


        if (!classId) {
            return;
        }


        await loadSubjects(
            classId
        );


        await loadStudents(
            classId
        );

    }
);


/*
==========================================
LOAD SUBJECTS
==========================================
*/

async function loadSubjects(
    classId
) {

    try {

        const response =
            await fetch(
                `${API}/faculty/${facultyId}/classes/${classId}/subjects`
            );

        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        subjects =
            result.data;


        subjectSelect.innerHTML =
            `<option value="">
                Select Subject
            </option>`;


        subjects.forEach(item => {

            const option =
                document.createElement("option");


            option.value =
                item.courseOfferingId;


            option.textContent =
                `${item.subject.name} (${item.subject.code})`;


            subjectSelect.appendChild(
                option
            );

        });


        subjectSelect.disabled =
            false;


    } catch (error) {

        console.error(error);

        message.textContent =
            "Failed to load subjects.";

    }

}


/*
==========================================
LOAD STUDENTS
==========================================
*/

async function loadStudents(
    classId
) {

    try {

        const response =
            await fetch(
                `${API}/faculty/${facultyId}/classes/${classId}/students`
            );

        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        students =
            result.data;


        renderStudents();


    } catch (error) {

        console.error(error);

        message.textContent =
            "Failed to load students.";

    }

}


/*
==========================================
RENDER STUDENTS
==========================================
*/

function renderStudents() {

    if (students.length === 0) {

        studentBody.innerHTML =
            `<tr>
                <td colspan="4">
                    No students found.
                </td>
            </tr>`;

        return;

    }


    studentBody.innerHTML = "";


    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.rollNumber || "-"}
            </td>

            <td>
                ${student.registerNumber}
            </td>

            <td>
                ${student.name}
            </td>

            <td>

                <div
                    class="attendance-buttons"
                    data-student="${student._id}"
                >

                    <button
                        onclick="setStatus('${student._id}', 'present', this)"
                    >
                        Present
                    </button>

                    <button
                        onclick="setStatus('${student._id}', 'absent', this)"
                    >
                        Absent
                    </button>

                </div>

            </td>

        `;


        studentBody.appendChild(
            row
        );

    });

}


/*
==========================================
SET STUDENT STATUS
==========================================
*/

function setStatus(
    studentId,
    status,
    button
) {

    const container =
        button.parentElement;


    container.dataset.status =
        status;


    const buttons =
        container.querySelectorAll(
            "button"
        );


    buttons.forEach(btn => {

        btn.classList.remove(
            "selected"
        );

    });


    button.classList.add(
        "selected"
    );


    saveButton.disabled =
        false;

}


/*
==========================================
MARK ALL
==========================================
*/

function markAll(status) {

    const containers =
        document.querySelectorAll(
            ".attendance-buttons"
        );


    containers.forEach(container => {

        container.dataset.status =
            status;


        const buttons =
            container.querySelectorAll(
                "button"
            );


        buttons.forEach(button => {

            button.classList.remove(
                "selected"
            );


            if (
                button.textContent
                    .trim()
                    .toLowerCase()
                === status
            ) {

                button.classList.add(
                    "selected"
                );

            }

        });

    });


    if (containers.length > 0) {

        saveButton.disabled =
            false;

    }

}


/*
==========================================
SAVE ATTENDANCE
==========================================
*/

async function saveAttendance() {

    const classId =
        classSelect.value;

    const courseOfferingId =
        subjectSelect.value;

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;

    const period =
        Number(
            document.getElementById(
                "periodSelect"
            ).value
        );

    const topic =
        document.getElementById(
            "topicInput"
        ).value.trim();


    if (!classId) {

        alert(
            "Please select a class."
        );

        return;

    }


    if (!courseOfferingId) {

        alert(
            "Please select a subject."
        );

        return;

    }


    const containers =
        document.querySelectorAll(
            ".attendance-buttons"
        );


    const attendanceStudents = [];


    for (
        const container of containers
    ) {

        const status =
            container.dataset.status;


        if (!status) {

            alert(
                "Please mark attendance for every student."
            );

            return;

        }


        attendanceStudents.push({

            studentId:
                container.dataset.student,

            status:
                status

        });

    }


    try {

        saveButton.disabled =
            true;


        message.textContent =
            "Saving attendance...";


        const response =
            await fetch(
                `${API}/faculty/${facultyId}/attendance`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        date:
                            date,

                        classId:
                            classId,

                        courseOfferingId:
                            courseOfferingId,

                        period:
                            period,

                        topic:
                            topic,

                        students:
                            attendanceStudents

                    })

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        message.textContent =
            `✓ Attendance saved successfully for ${result.studentsUpdated} students.`;

        message.style.color =
            "green";


    } catch (error) {

        console.error(error);

        message.textContent =
            error.message ||
            "Failed to save attendance.";

        message.style.color =
            "red";


        saveButton.disabled =
            false;

    }

}


/*
==========================================
BACK TO DASHBOARD
==========================================
*/

function goBack() {

    window.location.href =
        "faculty-dashboard.html";

}


/*
==========================================
INITIAL LOAD
==========================================
*/

loadClasses();