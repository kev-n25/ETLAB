// ======================================================
// ETLAB Clone - Timetable
// ======================================================

const timetableBody = document.getElementById("timetableBody");
const selectedDate = document.getElementById("selectedDate");
const previousWeekBtn = document.getElementById("previousWeek");
const nextWeekBtn = document.getElementById("nextWeek");
const downloadBtn = document.getElementById("downloadBtn");

let timetableData = null;

// Set date selector to today's date
const today = new Date();

selectedDate.value = formatInputDate(today);


// ======================================================
// Load Timetable Data
// ======================================================

async function loadTimetable() {

    try {

        const response = await fetch("data/timetable.json");

        if (!response.ok) {
            throw new Error("Unable to load timetable data.");
        }

        timetableData = await response.json();

        renderTimetable();

    } catch (error) {

        console.error("Error loading timetable:", error);

        timetableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-timetable">
                    Unable to load timetable.
                </td>
            </tr>
        `;

    }

}


// ======================================================
// Render Weekly Timetable
// ======================================================

function renderTimetable() {

    if (!timetableData) {
        return;
    }

    timetableBody.innerHTML = "";

    // Get the selected date
    const date = new Date(
        selectedDate.value + "T00:00:00"
    );

    // Find Monday of the selected week
    const monday = getMonday(date);

    /*
        Our timetable data contains Monday-Saturday.
        We generate the actual dates for the selected week.
    */

    timetableData.days.forEach((day, index) => {

        const row = document.createElement("tr");

        // Calculate date for this day
        const currentDayDate = new Date(monday);

        currentDayDate.setDate(
            monday.getDate() + index
        );

        const currentDayDateString =
            formatInputDate(currentDayDate);


        // Highlight selected date
        if (currentDayDateString === selectedDate.value) {

            row.classList.add("current-day");

        }


        // --------------------------------------------------
        // Day Cell
        // --------------------------------------------------

        const dayCell = document.createElement("th");

        dayCell.className = "day-cell";

        dayCell.innerHTML = `

            <span class="day-name">
                ${day.day}
            </span>

            <span class="day-date">
                ${formatDisplayDate(currentDayDate)}
            </span>

        `;

        row.appendChild(dayCell);


        // --------------------------------------------------
        // Class Cells
        // --------------------------------------------------

        const classes = [...day.classes];

        let currentPeriod = 1;


        while (
            currentPeriod <=
            timetableData.periods.length
        ) {

            const classData = classes.find(
                item =>
                    item.startPeriod === currentPeriod
            );


            // ----------------------------------------------
            // Class Found
            // ----------------------------------------------

            if (classData) {

                const cell =
                    createClassCell(classData);

                row.appendChild(cell);

                currentPeriod +=
                    classData.duration;

            }


            // ----------------------------------------------
            // No Class
            // ----------------------------------------------

            else {

                const freeCell =
                    createFreeCell();

                row.appendChild(freeCell);

                currentPeriod++;

            }

        }


        timetableBody.appendChild(row);

    });

}


// ======================================================
// Get Monday of Selected Week
// ======================================================

function getMonday(date) {

    const result = new Date(date);

    const day = result.getDay();

    /*
        JavaScript:
        Sunday = 0
        Monday = 1
        Tuesday = 2
        ...
        Saturday = 6
    */

    const difference =
        day === 0 ? -6 : 1 - day;

    result.setDate(
        result.getDate() + difference
    );

    return result;

}


// ======================================================
// Create Class Cell
// ======================================================

function createClassCell(classData) {

    const cell = document.createElement("td");

    cell.classList.add(
        getClassType(classData.type)
    );


    // Merge periods
    if (classData.duration > 1) {

        cell.colSpan =
            classData.duration;

    }


    // Free period
    if (classData.type === "Free") {

        cell.innerHTML = `

            <span class="free-period">
                ${classData.shortName}
            </span>

        `;

        return cell;

    }


    // Normal class
    cell.innerHTML = `

        ${
            classData.code
                ? `
                    <span class="class-code">
                        ${classData.code}
                    </span>
                  `
                : ""
        }

        <span class="class-name">
            ${classData.shortName}
        </span>

        ${
            classData.name &&
            classData.name !== classData.shortName
                ? `
                    <span class="class-type">
                        ${classData.name}
                    </span>
                  `
                : ""
        }

        ${
            classData.teacher
                ? `
                    <span class="class-teacher">
                        ${classData.teacher}
                    </span>
                  `
                : ""
        }

    `;

    return cell;

}


// ======================================================
// Create Free Cell
// ======================================================

function createFreeCell() {

    const cell =
        document.createElement("td");

    cell.classList.add("free");

    cell.innerHTML = `

        <span class="free-period">
            Free Period
        </span>

    `;

    return cell;

}


// ======================================================
// Get CSS Class According to Type
// ======================================================

function getClassType(type) {

    switch (type) {

        case "Theory":
            return "theory";

        case "Practical":
            return "practical";

        case "Elective":
            return "elective";

        case "Special":
            return "special";

        case "Free":
            return "free";

        default:
            return "special";

    }

}


// ======================================================
// Format Date for Display
// ======================================================

function formatDisplayDate(date) {

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ======================================================
// Format Date for Input
// ======================================================

function formatInputDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// ======================================================
// Date Selection
// ======================================================

selectedDate.addEventListener(
    "change",
    () => {

        renderTimetable();

    }
);


// ======================================================
// Previous Week
// ======================================================

previousWeekBtn.addEventListener(
    "click",
    () => {

        const date =
            new Date(
                selectedDate.value +
                "T00:00:00"
            );

        date.setDate(
            date.getDate() - 7
        );

        selectedDate.value =
            formatInputDate(date);

        renderTimetable();

    }
);


// ======================================================
// Next Week
// ======================================================

nextWeekBtn.addEventListener(
    "click",
    () => {

        const date =
            new Date(
                selectedDate.value +
                "T00:00:00"
            );

        date.setDate(
            date.getDate() + 7
        );

        selectedDate.value =
            formatInputDate(date);

        renderTimetable();

    }
);


// ======================================================
// Download Timetable as PDF
// ======================================================

downloadBtn.addEventListener("click", async () => {

    const timetableTable =
        document.querySelector(".weekly-timetable");

    if (!timetableTable) {
        return;
    }


    // Make sure the PDF libraries are available
    if (
        typeof html2canvas === "undefined" ||
        typeof window.jspdf === "undefined"
    ) {

        alert(
            "PDF library could not be loaded. Please check your internet connection."
        );

        return;
    }


    // Disable button while generating
    downloadBtn.disabled = true;

    downloadBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Generating...
    `;


    try {

        // --------------------------------------------------
        // Create a temporary container
        // --------------------------------------------------

        const pdfContainer =
            document.createElement("div");

        pdfContainer.style.position = "absolute";
        pdfContainer.style.left = "-10000px";
        pdfContainer.style.top = "0";

        pdfContainer.style.width = "1400px";

        pdfContainer.style.padding = "30px";

        pdfContainer.style.background = "#ffffff";

        pdfContainer.style.fontFamily =
            "Arial, sans-serif";


        // --------------------------------------------------
        // Title
        // --------------------------------------------------

        const title =
            document.createElement("h1");

        title.textContent =
            "ETLAB - Semester 5 Timetable";

        title.style.textAlign = "center";

        title.style.margin =
            "0 0 8px 0";

        title.style.fontSize = "26px";

        title.style.color = "#1e293b";


        pdfContainer.appendChild(title);


        // --------------------------------------------------
        // Week information
        // --------------------------------------------------

        const weekInfo =
            document.createElement("div");

        weekInfo.textContent =
            `Selected Date: ${formatDisplayDate(
                new Date(
                    selectedDate.value +
                    "T00:00:00"
                )
            )}`;

        weekInfo.style.textAlign = "center";

        weekInfo.style.marginBottom = "20px";

        weekInfo.style.fontSize = "13px";

        weekInfo.style.color = "#64748b";


        pdfContainer.appendChild(weekInfo);


        // --------------------------------------------------
        // Clone timetable
        // --------------------------------------------------

        const clonedTable =
            timetableTable.cloneNode(true);


        clonedTable.style.width = "100%";

        clonedTable.style.minWidth = "0";

        clonedTable.style.borderCollapse =
            "collapse";

        clonedTable.style.tableLayout =
            "fixed";


        // --------------------------------------------------
        // Make cloned cells PDF friendly
        // --------------------------------------------------

        const cells =
            clonedTable.querySelectorAll(
                "th, td"
            );


        cells.forEach(cell => {

            cell.style.border =
                "1px solid #999";

            cell.style.padding =
                "9px";

            cell.style.color =
                "#1f2937";

            cell.style.fontSize =
                "11px";

            cell.style.verticalAlign =
                "top";

        });


        // Header cells
        const headerCells =
            clonedTable.querySelectorAll(
                "thead th"
            );


        headerCells.forEach(cell => {

            cell.style.background =
                "#f1f5f9";

            cell.style.color =
                "#166534";

            cell.style.fontWeight =
                "bold";

        });


        // --------------------------------------------------
        // Append timetable
        // --------------------------------------------------

        pdfContainer.appendChild(
            clonedTable
        );


        // --------------------------------------------------
        // Legend
        // --------------------------------------------------

        const legend =
            document.createElement("div");

        legend.style.display =
            "flex";

        legend.style.justifyContent =
            "center";

        legend.style.gap =
            "12px";

        legend.style.marginTop =
            "18px";

        legend.style.fontSize =
            "11px";


        legend.innerHTML = `

            <span>
                <b style="
                    display:inline-block;
                    width:12px;
                    height:12px;
                    background:#82aef0;
                    margin-right:4px;
                "></b>
                Theory
            </span>

            <span>
                <b style="
                    display:inline-block;
                    width:12px;
                    height:12px;
                    background:#ff8585;
                    margin-right:4px;
                "></b>
                Practical
            </span>

            <span>
                <b style="
                    display:inline-block;
                    width:12px;
                    height:12px;
                    background:#ffc477;
                    margin-right:4px;
                "></b>
                Free Period
            </span>

            <span>
                <b style="
                    display:inline-block;
                    width:12px;
                    height:12px;
                    background:#d8ed70;
                    margin-right:4px;
                "></b>
                Elective
            </span>

        `;


        pdfContainer.appendChild(legend);


        document.body.appendChild(
            pdfContainer
        );


        // --------------------------------------------------
        // Convert HTML to Canvas
        // --------------------------------------------------

        const canvas =
            await html2canvas(
                pdfContainer,
                {
                    scale: 2,

                    backgroundColor:
                        "#ffffff",

                    useCORS: true
                }
            );


        // --------------------------------------------------
        // Create PDF
        // --------------------------------------------------

        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF({
                orientation: "landscape",

                unit: "mm",

                format: "a4"
            });


        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const pageHeight =
            pdf.internal.pageSize.getHeight();


        const margin = 8;

        const availableWidth =
            pageWidth - margin * 2;


        const imageWidth =
            canvas.width;

        const imageHeight =
            canvas.height;


        const ratio =
            availableWidth /
            imageWidth;


        const finalHeight =
            imageHeight * ratio;


        // --------------------------------------------------
        // Handle page height
        // --------------------------------------------------

        if (
            finalHeight <=
            pageHeight - margin * 2
        ) {

            pdf.addImage(
                canvas.toDataURL("image/png"),
                "PNG",
                margin,
                margin,
                availableWidth,
                finalHeight
            );

        } else {

            // Scale further if necessary
            const heightRatio =
                (pageHeight - margin * 2) /
                finalHeight;

            const finalWidth =
                availableWidth *
                heightRatio;

            const scaledHeight =
                finalHeight *
                heightRatio;


            pdf.addImage(
                canvas.toDataURL("image/png"),
                "PNG",
                (pageWidth - finalWidth) / 2,
                margin,
                finalWidth,
                scaledHeight
            );

        }


        // --------------------------------------------------
        // Footer
        // --------------------------------------------------

        pdf.setFontSize(8);

        pdf.setTextColor(
            100,
            116,
            139
        );

        pdf.text(
            "ETLAB Clone - Semester 5 Timetable",
            pageWidth / 2,
            pageHeight - 4,
            {
                align: "center"
            }
        );


        // --------------------------------------------------
        // Save PDF
        // --------------------------------------------------

        pdf.save(
            "ETLAB-Semester-5-Timetable.pdf"
        );


        // Remove temporary container
        document.body.removeChild(
            pdfContainer
        );


    } catch (error) {

        console.error(
            "Error generating PDF:",
            error
        );

        alert(
            "Unable to generate PDF. Please try again."
        );

    }


    // Restore button
    downloadBtn.disabled = false;

    downloadBtn.innerHTML = `
        <i class="fa-solid fa-download"></i>
        Download
    `;

});


// ======================================================
// Start Application
// ======================================================

loadTimetable();