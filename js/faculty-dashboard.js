/* ==========================================
   FACULTY DASHBOARD
   ========================================== */


const token =
    localStorage.getItem("token");

const role =
    localStorage.getItem("role");

const facultyName =
    localStorage.getItem("facultyName");


/*
==========================================
CHECK LOGIN
==========================================
*/

if (!token || role !== "faculty") {

    window.location.href =
        "index.html";

}


/*
==========================================
DISPLAY FACULTY NAME
==========================================
*/

if (facultyName) {

    document.getElementById(
        "facultyName"
    ).textContent = facultyName;

}


/*
==========================================
LOGOUT
==========================================
*/

document.getElementById(
    "logoutButton"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        localStorage.removeItem("facultyName");

        localStorage.removeItem("studentId");

        localStorage.removeItem("studentName");

        localStorage.removeItem("username");

        localStorage.removeItem("isLoggedIn");


        window.location.href =
            "index.html";

    }
);


/*
==========================================
NAVIGATION
==========================================
*/

function openAttendance() {

    window.location.href =
        "faculty-attendance.html";

}


function openAssignments() {

    alert(
        "Assignments module coming next."
    );

}


function openClasses() {

    alert(
        "Classes module coming next."
    );

}