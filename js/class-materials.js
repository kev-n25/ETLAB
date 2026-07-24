// ==========================================
// ETLAB Clone - Class Materials
// Part 1 : Setup & Data Loading
// ==========================================

// ---------- DOM Elements ----------

const materialTableBody =
document.getElementById("materialsTableBody");

const semesterFilter = document.getElementById("semesterFilter");
const subjectFilter = document.getElementById("subjectFilter");
const typeFilter = document.getElementById("typeFilter");
const searchInput = document.getElementById("searchInput");

const recordCount = document.getElementById("recordCount");
const recordInfo = document.getElementById("recordInfo");
const pageNumbers = document.getElementById("pageNumbers");
const emptyState = document.getElementById("emptyState");

// ---------- Global Variables ----------

let materials = [];
let filteredMaterials = [];

let currentPage = 1;

const ITEMS_PER_PAGE = 5;

// ==========================================
// Load JSON
// ==========================================

async function loadMaterials() {

    try {

        const response = await fetch("data/materials.json");

        materials = await response.json();

        filteredMaterials = [...materials];

        populateSubjectFilter();

        populateTypeFilter();

        applyFilters();

    }

    catch (error) {

        console.error("Unable to load materials:", error);

    }

}

// ==========================================
// Populate Subject Filter
// ==========================================

function populateSubjectFilter() {

    const subjects =
        [...new Set(materials.map(item => item.subject))];

    subjectFilter.innerHTML =
        `<option value="">All Subjects</option>`;

    subjects.forEach(subject => {

        const option = document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        subjectFilter.appendChild(option);

    });

}

// ==========================================
// Populate Type Filter
// ==========================================

function populateTypeFilter() {

    const types =
        [...new Set(materials.map(item => item.type))];

    typeFilter.innerHTML =
        `<option value="">All Types</option>`;

    types.forEach(type => {

        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);

    });

}

// ==========================================
// Filter Materials
// ==========================================

function applyFilters() {

    const semester = semesterFilter.value.trim();
    const subject = subjectFilter.value;
    const type = typeFilter.value;

    const keyword =
        searchInput.value.trim().toLowerCase();

    filteredMaterials = materials.filter(item => {

        return (

            (!semester || item.semester.trim() === semester) &&

            (!subject || item.subject === subject) &&

            (!type || item.type === type) &&

            (

                item.title.toLowerCase().includes(keyword) ||

                item.subject.toLowerCase().includes(keyword) ||

                item.module.toLowerCase().includes(keyword)

            )

        );

    });

    currentPage = 1;

    renderMaterials();

}

// ==========================================
// Event Listeners
// ==========================================

semesterFilter.addEventListener("change", applyFilters);

subjectFilter.addEventListener("change", applyFilters);

typeFilter.addEventListener("change", applyFilters);

searchInput.addEventListener("input", applyFilters);
// ==========================================
// Render Materials Table
// ==========================================

function renderMaterials() {

    materialTableBody.innerHTML = "";

    if (filteredMaterials.length === 0) {

        emptyState.style.display = "block";

        recordCount.textContent = "Showing 0 materials";

        if (recordInfo)
            recordInfo.textContent = "Showing 0 of 0";

        pageNumbers.innerHTML = "";

        return;

    }

    emptyState.style.display = "none";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const pageData = filteredMaterials.slice(start, end);

    pageData.forEach(item => {

        const row = document.createElement("tr");

        row.innerHTML = `

           <td>${item.subject}</td>

<td>${item.semester}</td>

<td>${item.module}</td>

<td>${item.title}</td>

<td>
    ${
        item.description.length > 35
            ? item.description.substring(0, 35) + "..."
            : item.description
    }
</td>

<td>
    <span class="type-badge ${item.type.toLowerCase()}">
        ${item.type}
    </span>
</td>

<td>${item.addedOn}</td>

<td>

    <button
        class="btn btn-primary view-btn"
        data-id="${item.id}">
        View
    </button>

    <button
        class="btn btn-secondary download-btn"
        data-id="${item.id}">
        Download
    </button>

</td>

        `;

        materialTableBody.appendChild(row);

    });

    recordCount.textContent =
        `Showing ${filteredMaterials.length} materials`;

    if (recordInfo) {

        recordInfo.textContent =
            `Showing ${start + 1} - ${Math.min(end, filteredMaterials.length)} of ${filteredMaterials.length}`;

    }

    renderPagination();

    attachButtonEvents();

}

// ==========================================
// Pagination
// ==========================================

function renderPagination() {

    pageNumbers.innerHTML = "";

    const totalPages =
        Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);

    if (totalPages <= 1)
        return;

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        if (i === currentPage)
            button.classList.add("active");

        button.addEventListener("click", () => {

            currentPage = i;

            renderMaterials();

        });

        pageNumbers.appendChild(button);

    }

}
// ==========================================
// Part 3 : Preview, Details & Download
// ==========================================

// ---------- DOM ----------

const previewModal = document.getElementById("previewModal");
const detailsModal = document.getElementById("detailsModal");

const previewContent = document.getElementById("previewContent");
const materialDetails = document.getElementById("materialDetails");

const toastContainer = document.getElementById("toastContainer");

// ==========================================
// Attach Button Events
// ==========================================

function attachButtonEvents() {

    document.querySelectorAll(".view-btn").forEach(button => {

        button.onclick = () => {

            const id = Number(button.dataset.id);

            const material =
                materials.find(item => item.id === id);

            if (!material) return;

            previewContent.innerHTML = `
                <h3>${material.title}</h3>

                <p><strong>Subject:</strong> ${material.subject}</p>

                <p><strong>Module:</strong> ${material.module}</p>

                <p><strong>Type:</strong> ${material.type}</p>

                <hr>

                <p>${material.description}</p>

                <br>

                <strong>File:</strong>

                <p>${material.file}</p>

                <br>

                <button
                    id="openDetailsBtn"
                    class="btn btn-primary">

                    View Details

                </button>
            `;

            previewModal.style.display = "flex";

            document
                .getElementById("openDetailsBtn")
                .onclick = () => {

                previewModal.style.display = "none";

                materialDetails.innerHTML = `
                    <h3>${material.title}</h3>

                    <p><strong>Subject:</strong> ${material.subject}</p>

                    <p><strong>Semester:</strong> ${material.semester}</p>

                    <p><strong>Module:</strong> ${material.module}</p>

                    <p><strong>Type:</strong> ${material.type}</p>

                    <p><strong>Added On:</strong> ${material.addedOn}</p>

                    <p><strong>Description:</strong></p>

                    <p>${material.description}</p>

                    <hr>

                    <p><strong>File:</strong> ${material.file}</p>
                `;

                detailsModal.style.display = "flex";

            };

        };

    });

    document.querySelectorAll(".download-btn").forEach(button => {

        button.onclick = () => {

            showToast("Downloading material...");

        };

    });

}

// ==========================================
// Close Modals
// ==========================================

document.querySelectorAll("[data-close]").forEach(button => {

    button.onclick = () => {

        document
            .getElementById(button.dataset.close)
            .style.display = "none";

    };

});

window.onclick = event => {

    if (event.target === previewModal)
        previewModal.style.display = "none";

    if (event.target === detailsModal)
        detailsModal.style.display = "none";

};

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

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}

// ==========================================
// Start
// ==========================================

loadMaterials();