// ==========================================
// ETLAB Clone - Assignments
// Part 1 : Setup & Data Loading
// ==========================================

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

        const response = await fetch("data/assignments.json");

        assignments = await response.json();

        filteredAssignments = [...assignments];

        populateSubjectFilter();

        applyFilters();

    } catch (error) {

        console.error("Unable to load assignments:", error);

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
    const keyword = searchInput.value.trim().toLowerCase();

    filteredAssignments = assignments.filter(item => {

        return (

            (!semester || item.semester === semester) &&
            (!subject || item.subject === subject) &&
            (!status || item.status === status) &&

            (
                item.title.toLowerCase().includes(keyword) ||
                item.subject.toLowerCase().includes(keyword) ||
                item.faculty.toLowerCase().includes(keyword)
            )

        );

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
                <span class="status-badge ${item.status.toLowerCase()}">
                    ${item.status}
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
                    data-id="${item.id}">
                    Submit
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

// ==========================================
// Attach Button Events
// ==========================================

function attachButtonEvents() {

    document.querySelectorAll(".view-btn").forEach(button => {

        button.onclick = () => {

            const id = Number(button.dataset.id);

            const assignment = assignments.find(item => item.id === id);

            if (!assignment) return;

            assignmentDetails.innerHTML = `
                <h3>${assignment.title}</h3>

                <p><strong>Subject:</strong> ${assignment.subject}</p>
                <p><strong>Semester:</strong> ${assignment.semester}</p>
                <p><strong>Faculty:</strong> ${assignment.faculty}</p>
                <p><strong>Issued On:</strong> ${assignment.issuedOn}</p>
                <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
                <p><strong>Status:</strong> ${assignment.status}</p>

                <hr>

                <p>${assignment.description}</p>

                <br>

                <strong>Attachment:</strong>
                <p>${assignment.attachment}</p>
            `;

            detailsModal.style.display = "flex";

        };

    });

    document.querySelectorAll(".submit-btn").forEach(button => {

        button.onclick = () => {

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

    submitAssignmentBtn.onclick = () => {

        if (!assignmentFile.files.length) {

            showToast("Please choose a file.");

            return;

        }

        let progress = 0;

        progressBar.style.width = "0%";

        const interval = setInterval(() => {

            progress += 10;

            progressBar.style.width = progress + "%";

            if (progress >= 100) {

                clearInterval(interval);

                submitModal.style.display = "none";

                uploadForm.reset();

                progressBar.style.width = "0%";

                showToast("Assignment submitted successfully!");

            }

        }, 120);

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