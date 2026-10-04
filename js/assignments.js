// ==========================================
// ETLAB Clone - Assignments
// Part 1 : Setup & Data Loading
// ==========================================
const STUDENT_ID = "6abcb10dab945a702dde2676";

// ---------- DOM Elements ----------

const assignmentTableBody = document.getElementById("assignmentTableBody");

const semesterFilter = document.getElementById("semesterFilter");
const subjectFilter = document.getElementById("subjectFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");

const recordCount = document.getElementById("recordCount");
const recordInfo = document.getElementById("recordInfo");
const pageNumbers = document.getElementById("pageNumbers");
const emptyState = document.getElementById("emptyState");

// ---------- Global Variables ----------

let assignments = [];
let filteredAssignments = [];

let currentPage = 1;
const ITEMS_PER_PAGE = 5;

// ==========================================
// Load JSON
// ==========================================

async function loadAssignments() {
    try {
        const res = await fetch("http://localhost:5000/api/assignments");

        console.log("API response:", res);

        assignments = await res.json();

        console.log("Assignments:", assignments);

        const submissionResponse = await fetch(
    "http://localhost:5000/api/submissions"
);

const submissions = await submissionResponse.json();

assignments = assignments.map(assignment => {

    const submitted = submissions.some(submission => {

        const assignmentId =
            typeof submission.assignment === "object"
                ? submission.assignment._id
                : submission.assignment;

        return (
            assignmentId === assignment.id &&
            submission.student === STUDENT_ID
        );

    });

    return {
        ...assignment,
        status: submitted ? "Submitted" : "Pending"
    };

});

        populateSubjectFilter();
        applyFilters();

    } catch (err) {
        console.error("Error loading assignments:", err);
    }
}

// ==========================================
// Subject Filter
// ==========================================

function populateSubjectFilter() {

    const subjects = [...new Set(assignments.map(item => item.subject))];

    subjectFilter.innerHTML = `<option value="">All Subjects</option>`;

    subjects.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        subjectFilter.appendChild(option);

    });

}

// ==========================================
// Remaining Days
// ==========================================

function getRemainingDays(date) {

    const today = new Date();

    const due = new Date(date);

    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "Expired";
    if (diff === 0) return "Today";

    return `${diff} days`;

}

// ==========================================
// Filters
// ==========================================
function applyFilters() {

    const semester = semesterFilter.value;
    const subject = subjectFilter.value;
    const status = statusFilter.value;
    const keyword = searchInput.value.toLowerCase();

    filteredAssignments = assignments.filter(item => {

        const semesterMatch =
            !semester || item.semester === semester;

        const subjectMatch =
            !subject || item.subject === subject;

        const statusMatch =
            !status || (item.status || "Pending") === status;

        const searchMatch =
            (item.title || "").toLowerCase().includes(keyword) ||
            (item.subject || "").toLowerCase().includes(keyword) ||
            (item.faculty || "").toLowerCase().includes(keyword);

        return semesterMatch &&
               subjectMatch &&
               statusMatch &&
               searchMatch;
    });

    currentPage = 1;

    renderAssignments();
}

// ==========================================
// Event Listeners
// ==========================================

semesterFilter.addEventListener("change", applyFilters);
subjectFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
// ==========================================
// Render Assignment Table
// ==========================================

function renderAssignments() {

    assignmentTableBody.innerHTML = "";

    if (filteredAssignments.length === 0) {

        emptyState.style.display = "block";

        recordCount.textContent = "Showing 0 assignments";

        if (recordInfo)
            recordInfo.textContent = "Showing 0 of 0";

        pageNumbers.innerHTML = "";

        return;

    }

    emptyState.style.display = "none";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const pageData = filteredAssignments.slice(start, end);

    pageData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.subject}</td>
            <td>${item.semester}</td>
            <td>${item.title}</td>
            <td>${item.faculty}</td>
            <td>${item.issuedOn}</td>
            <td>${item.dueDate}</td>

            <td>
    <span class="status-badge ${(item.status || "Pending").toLowerCase()}">
        ${item.status || "Pending"}
    </span>
</td>

            <td>${getRemainingDays(item.dueDate)}</td>

            <td>

                <button
                    class="btn btn-primary view-btn"
                    data-id="${item.id}">
                    View
                </button>

                <button
    class="btn btn-secondary submit-btn"
    data-id="${item.id}"
    ${item.status === "Submitted" ? "disabled" : ""}>
    ${item.status === "Submitted" ? "Submitted" : "Submit"}
</button>

            </td>
        `;

        assignmentTableBody.appendChild(row);

    });

    recordCount.textContent =
        `Showing ${filteredAssignments.length} assignments`;

    if (recordInfo) {

        recordInfo.textContent =
            `Showing ${start + 1} - ${Math.min(end, filteredAssignments.length)} of ${filteredAssignments.length}`;

    }

    renderPagination();

    attachButtonEvents();

}

// ==========================================
// Pagination
// ==========================================

function renderPagination() {

    pageNumbers.innerHTML = "";

    const totalPages = Math.ceil(
        filteredAssignments.length / ITEMS_PER_PAGE
    );

    if (totalPages <= 1)
        return;

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        if (i === currentPage)
            button.classList.add("active");

        button.addEventListener("click", () => {

            currentPage = i;

            renderAssignments();

        });

        pageNumbers.appendChild(button);

    }

}
// ==========================================
// Part 3 : Modals & Button Events
// ==========================================

// ---------- DOM ----------

const detailsModal = document.getElementById("detailsModal");
const submitModal = document.getElementById("submitModal");

const assignmentDetails = document.getElementById("assignmentDetails");

const uploadForm = document.getElementById("uploadForm");
const assignmentFile = document.getElementById("assignmentFile");
const progressBar = document.getElementById("progressBar");

const submitAssignmentBtn = document.getElementById("submitAssignmentBtn");

const toastContainer = document.getElementById("toastContainer");
let selectedAssignmentId = null;

// ==========================================
// Attach Button Events
// ==========================================

function attachButtonEvents() {

    document.querySelectorAll(".view-btn").forEach(button => {

        button.onclick = () => {

            const id = button.dataset.id;

            const assignment =
                assignments.find(item => item.id === id);

            if (!assignment) return;

            assignmentDetails.innerHTML = `
                <h3>${assignment.title}</h3>

                <p><strong>Subject:</strong> ${assignment.subject}</p>
                <p><strong>Semester:</strong> ${assignment.semester}</p>
                <p><strong>Faculty:</strong> ${assignment.faculty}</p>
                <p><strong>Issued On:</strong> ${assignment.issuedOn}</p>
                <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
                <p><strong>Status:</strong> ${assignment.status || "Pending"}</p>

                <hr>

                <p>${assignment.description}</p>

                <br>

                <strong>Attachment:</strong>
                <p>${assignment.attachment || "No attachment available"}</p>
            `;

            detailsModal.style.display = "flex";

        };

    });


    document.querySelectorAll(".submit-btn").forEach(button => {

        button.onclick = () => {

            selectedAssignmentId = button.dataset.id;

            uploadForm.reset();

            if (progressBar)
                progressBar.style.width = "0%";

            submitModal.style.display = "flex";

        };

    });

}

// ==========================================
// Close Modals
// ==========================================

document.querySelectorAll("[data-close]").forEach(button => {

    button.onclick = () => {

        const modalId = button.dataset.close;

        document.getElementById(modalId).style.display = "none";

    };

});

// Outside Click

window.onclick = (event) => {

    if (event.target === detailsModal)
        detailsModal.style.display = "none";

    if (event.target === submitModal)
        submitModal.style.display = "none";

};

// ==========================================
// Submit Assignment
// ==========================================

if (submitAssignmentBtn) {

    submitAssignmentBtn.onclick = async () => {

        const assignment = assignments.find(
            item => item.id === selectedAssignmentId
        );

        if (!assignment) {
            showToast("Assignment not found.");
            return;
        }

        if (assignment.status === "Submitted") {
    showToast("This assignment has already been submitted.");
    return;
}

        if (!assignmentFile.files.length) {
            showToast("Please choose a file.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/submissions",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        assignment: selectedAssignmentId,
                        student: "6abcb10dab945a702dde2676"
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Submission failed");
            }

            submitModal.style.display = "none";

            uploadForm.reset();

            progressBar.style.width = "0%";

            showToast("Assignment submitted successfully!");

            console.log("Submission created:", data);

        } catch (error) {

            console.error("Submission error:", error);

            showToast("Failed to submit assignment.");

        }
    };
}
// ==========================================
// Toast
// ==========================================

function showToast(message) {

    if (!toastContainer) {

        alert(message);

        return;

    }

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

// ==========================================
// Start App
// ==========================================

loadAssignments();