/* ==========================================
   ETLAB ATTENDANCE JAVASCRIPT
   ========================================== */


/* ==========================================
   ELEMENTS
   ========================================== */

const attendanceBody =
    document.getElementById("attendanceBody");

const monthSelect =
    document.getElementById("monthSelect");

const yearSelect =
    document.getElementById("yearSelect");

const semesterSelect =
    document.getElementById("semesterSelect");

const monthlyPercentage =
    document.getElementById("monthlyPercentage");

const monthlyProgress =
    document.getElementById("monthlyProgress");

const overallPercentage =
    document.getElementById("overallPercentage");

const overallProgress =
    document.getElementById("overallProgress");


/* ==========================================
   ATTENDANCE STATUS
   ========================================== */

const STATUS = {

    PRESENT: "present",

    ABSENT: "absent",

    LEAVE: "leave",

    NA: "na",

    HOLIDAY: "holiday",

    DUTYLEAVE: "dutyleave",

    ONDUTY: "onduty",

    SUSPENSION: "suspension",

    SPECIALLEAVE: "specialleave"

};


/* ==========================================
   ATTENDANCE DATA
   ========================================== */

/*
    This is no longer hardcoded.

    Data will come from:

    MongoDB Atlas
          ↓
       Express
          ↓
       fetch()
          ↓
    attendanceData
*/

let attendanceData = {};


/* ==========================================
   LOAD ATTENDANCE FROM BACKEND
   ========================================== */

async function loadAttendance() {

    try {

        const studentId =
            localStorage.getItem("studentId");


        // Check whether the student is logged in

        if (!studentId) {

            window.location.href = "index.html";

            return;

        }


        const response =
            await fetch(
                `http://localhost:5000/api/attendance/student/${studentId}`
            );


        const result =
            await response.json();


        if (!result.success) {

            console.error(
                "Failed to load attendance"
            );

            return;

        }


        /*
            Clear old data
        */

        attendanceData = {};


        /*
            Convert API data into
            frontend-friendly format
        */

        result.data.forEach(dayRecord => {

            const date =
                new Date(dayRecord.date);

            const day =
                date.getDate();


            attendanceData[day] =
                dayRecord.periods.map(period => {

                    return {
                        period:
                            period.period,

                        status:
                            period.status,

                        subject:
                            period.courseOffering.subject.name,

                        code:
                            period.courseOffering.subject.code,

                        faculty:
                            period.courseOffering.faculty.name,
                        topic:
                            period.topic || ""

                    };

                });

        });


        console.log(
            "Attendance loaded:",
            attendanceData
        );


        /*
            Generate attendance table
        */

        generateAttendanceTable();


    } catch (error) {

        console.error(
            "Error loading attendance:",
            error
        );

    }

}


/* ==========================================
   GENERATE ATTENDANCE TABLE
   ========================================== */

function generateAttendanceTable() {

    /*
        Clear existing table
    */

    attendanceBody.innerHTML = "";


    /*
        Get selected month and year
    */

    const daysInMonth =
        getDaysInMonth(
            parseInt(yearSelect.value),
            parseInt(monthSelect.value)
        );


    /*
        Create one row for every day
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const row =
            document.createElement("tr");


        /* ---------- Date ---------- */

        const dateCell =
            document.createElement("td");

        dateCell.className =
            "attendance-date";

        dateCell.textContent =
            getOrdinal(day);

        row.appendChild(dateCell);


        /* ---------- Periods ---------- */

        const dayData =
            attendanceData[day] ||
            Array(8).fill(null);


        for (
            let period = 0;
            period < 8;
            period++
        ) {

            const cell =
                document.createElement("td");


            /*
                Get data for this period
            */

            const periodData =
                dayData.find(
                    item => item && item.period === period + 1
                );


            /*
                If there is no data
            */

            const status =
                periodData
                    ? periodData.status
                    : STATUS.NA;


            /* ---------- CSS ---------- */

            cell.classList.add(
                "attendance-cell"
            );

            cell.classList.add(
                `status-${status}`
            );


            /* ---------- Display ---------- */

            if (periodData) {

                /*
                    Show subject + status
                */

                cell.innerHTML = `
                    <div class="attendance-subject">
                        ${periodData.subject}
                    </div>

                    <div class="attendance-status">
                        ${formatStatus(periodData.status)}
                    </div>
                `;

                /*
                    Optional tooltip
                */

                cell.title =
                    periodData.topic
                        ? `Topic: ${periodData.topic}\n${periodData.code} - ${periodData.faculty}`
                        : `${periodData.code} - ${periodData.faculty}`;

            } else {

                cell.textContent =
                    "N/A";

            }


            row.appendChild(cell);

        }


        attendanceBody.appendChild(row);

    }


    /*
        Calculate attendance
    */

    calculateAttendance();

}


/* ==========================================
   CALCULATE ATTENDANCE
   ========================================== */

function calculateAttendance() {

    let present = 0;

    let absent = 0;


    /*
        Loop through every day
    */

    Object.values(attendanceData)
        .forEach(day => {


            /*
                Loop through every period
            */

            day.forEach(periodData => {


                /*
                    Ignore empty periods
                */

                if (!periodData) {

                    return;

                }


                /*
                    IMPORTANT:

                    periodData is an object.

                    We need:

                    periodData.status

                    NOT:

                    periodData
                */

                if (
                    periodData.status ===
                    STATUS.PRESENT
                ) {

                    present++;

                }


                if (
                    periodData.status ===
                    STATUS.ABSENT
                ) {

                    absent++;

                }

            });

        });


    /*
        Total actual classes

        N/A, Leave, Holiday etc.
        are not included here.
    */

    const totalClasses =
        present + absent;


    let percentage = 0;


    if (totalClasses > 0) {

        percentage =
            Math.round(
                (present / totalClasses) * 100
            );

    }


    /* ---------- Monthly ---------- */

    monthlyPercentage.textContent =
        `${percentage}%`;

    monthlyProgress.style.width =
        `${percentage}%`;


    /* ---------- Overall ---------- */

    /*
        Temporary demo value.

        We will replace this with
        a backend calculation later.
    */

    const overall = 95;

    overallPercentage.textContent =
        `${overall}%`;

    overallProgress.style.width =
        `${overall}%`;

}


/* ==========================================
   FORMAT STATUS
   ========================================== */

function formatStatus(status) {

    switch (status) {

        case STATUS.PRESENT:
            return "Present";

        case STATUS.ABSENT:
            return "Absent";

        case STATUS.LEAVE:
            return "Leave";

        case STATUS.NA:
            return "N/A";

        case STATUS.HOLIDAY:
            return "Holiday";

        case STATUS.DUTYLEAVE:
            return "Duty Leave";

        case STATUS.ONDUTY:
            return "On Duty";

        case STATUS.SUSPENSION:
            return "Suspension";

        case STATUS.SPECIALLEAVE:
            return "Special Leave";

        default:
            return status;

    }

}


/* ==========================================
   DAYS IN MONTH
   ========================================== */

function getDaysInMonth(
    year,
    month
) {

    return new Date(
        year,
        month,
        0
    ).getDate();

}


/* ==========================================
   ORDINAL DATE
   ========================================== */

function getOrdinal(number) {

    const remainder100 =
        number % 100;


    if (
        remainder100 >= 11 &&
        remainder100 <= 13
    ) {

        return `${number}th`;

    }


    switch (number % 10) {

        case 1:
            return `${number}st`;

        case 2:
            return `${number}nd`;

        case 3:
            return `${number}rd`;

        default:
            return `${number}th`;

    }

}


/* ==========================================
   MONTH CHANGE
   ========================================== */

monthSelect.addEventListener(
    "change",
    generateAttendanceTable
);


yearSelect.addEventListener(
    "change",
    generateAttendanceTable
);


semesterSelect.addEventListener(
    "change",
    generateAttendanceTable
);


/* ==========================================
   INITIAL LOAD
   ========================================== */

/*
    IMPORTANT:

    Do NOT call:

    generateAttendanceTable();

    directly.

    We need to load MongoDB data first.
*/

loadAttendance();