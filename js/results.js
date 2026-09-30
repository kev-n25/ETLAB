// ======================================================
// ETLAB Clone - Results Page
// ======================================================

// HTML Elements
const resultsBody = document.getElementById("resultsBody");
const semesterSelect = document.getElementById("semester");
const tabButtons = document.querySelectorAll(".result-tabs button");

// Store JSON data
let resultsData = [];
let currentType = "Sessional Exams";

// ======================================================
// Load Results JSON
// ======================================================

async function loadResults() {

    try {

        const response = await fetch("data/results.json");

        resultsData = await response.json();

        renderResults();

    }

    catch (error) {

        console.error("Error loading results:", error);

        resultsBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Failed to load results.
                </td>
            </tr>
        `;

    }

}

// ======================================================
// Render Results Table
// ======================================================

function renderResults() {

    // Get selected semester number
    const selectedSemester = parseInt(
        semesterSelect.value.replace("Semester ", "")
    );

    // Filter based on semester and selected tab
    const filteredResults = resultsData.filter(result =>

        result.semester === selectedSemester &&
        result.type === currentType

    );

    // No results found
    if (filteredResults.length === 0) {

        resultsBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No published results available.
                </td>
            </tr>
        `;

        return;

    }

    // Build table rows
    let html = "";

    filteredResults.forEach(result => {

        html += `
            <tr>

                <td>${result.subject}</td>

                <td>S${result.semester}</td>

                <td>${result.date}</td>

                <td>${result.marks}</td>

                <td>${result.total}</td>

            </tr>
        `;

    });

    // Update table once
    resultsBody.innerHTML = html;

}

// ======================================================
// Semester Dropdown
// ======================================================

semesterSelect.addEventListener("change", renderResults);

// ======================================================
// Result Tabs
// ======================================================

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        // Add active class
        button.classList.add("active");

        // Store selected result type
        currentType = button.textContent.trim();

        // Refresh table
        renderResults();

    });

});

// ======================================================
// Initial Load
// ======================================================

loadResults();