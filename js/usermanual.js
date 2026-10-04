function renderUserManual() {

    const app = document.getElementById("app");

    if (!app) {
        return;
    }


    app.innerHTML = `

        <!-- ==================================
             SIDEBAR
             ================================== -->

        <aside class="sidebar">

            <div class="brand">

                <span>
                    ◔
                </span>

                <span class="brand-text">
                    etlab
                </span>

            </div>


            <nav>

                <!-- Dashboard -->

                <a
                    href="dashboard.html"
                    class="nav-item"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-house"></i>
                    </span>

                    <span>
                        Dashboard
                    </span>

                </a>


                <!-- Attendance -->

                <a
                    href="attendance.html"
                    class="nav-item"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-clipboard-user"></i>
                    </span>

                    <span>
                        Attendance
                    </span>

                </a>


                <!-- Results -->

                <a
                    href="#"
                    class="nav-item"
                    data-feature="Results"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-square-poll-vertical"></i>
                    </span>

                    <span>
                        Results
                    </span>

                </a>


                <!-- Timetable -->

                <a
                    href="#"
                    class="nav-item"
                    data-feature="Timetable"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-calendar-days"></i>
                    </span>

                    <span>
                        TimeTable
                    </span>

                </a>


                <!-- Assignments -->

                <a
                    href="#"
                    class="nav-item"
                    data-feature="Assignments"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-file-lines"></i>
                    </span>

                    <span>
                        Assignments
                    </span>

                </a>


                <!-- Materials -->

                <a
                    href="#"
                    class="nav-item"
                    data-feature="Materials"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-book"></i>
                    </span>

                    <span>
                        Materials
                    </span>

                </a>


                <!-- User Manual -->

                <a
                    href="usermanual.html"
                    class="nav-item active"
                >

                    <span class="nav-icon">
                        <i class="fa-solid fa-circle-question"></i>
                    </span>

                    <span>
                        User Manual
                    </span>

                </a>

            </nav>

        </aside>


        <!-- ==================================
             MAIN CONTENT
             ================================== -->

        <div class="content">


            <!-- ==================================
                 TOPBAR
                 ================================== -->

            <header class="topbar">

                <div>
                    TKM College of Engineering
                </div>


                <div class="top-actions">

                    <div class="top-action username">

                        <i class="fa-solid fa-user"></i>

                        KEVIN REJI

                    </div>


                    <div class="top-action">

                        <i class="fa-solid fa-envelope"></i>

                        Messages

                        <span class="message-count">
                            0
                        </span>

                    </div>


                    <button
                        id="logoutButton"
                        class="logout-button"
                    >

                        <i class="fa-solid fa-right-from-bracket"></i>

                        Logout

                    </button>

                </div>

            </header>


            <!-- ==================================
                 BREADCRUMB
                 ================================== -->

            <div class="breadcrumb">

                <i class="fa-solid fa-house"></i>

                <span>
                    Home
                </span>

                <span class="breadcrumb-separator">
                    ›
                </span>

                <span class="current">
                    User Manual
                </span>

            </div>


            <!-- ==================================
                 USER MANUAL CONTENT
                 ================================== -->

            <main class="manual-container">


                <!-- Banner -->

                <div class="manual-banner">

                    USER MANUAL

                </div>


                <!-- Manual Cards -->

                <div class="manual-cards">


                    <!-- Rubrics -->

                    <div
                        class="manual-card"
                        data-feature="Rubrics"
                        tabindex="0"
                    >

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1004/1004733.png"
                            alt="Rubrics"
                            class="card-icon"
                        >

                        <div class="card-title">
                            Rubrics
                        </div>

                    </div>


                    <!-- Mentor -->

                    <div
                        class="manual-card"
                        data-feature="Mentor"
                        tabindex="0"
                    >

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1004/1004733.png"
                            alt="Mentor"
                            class="card-icon"
                        >

                        <div class="card-title">
                            Mentor
                        </div>

                    </div>


                    <!-- Certificate Management -->

                    <div
                        class="manual-card"
                        data-feature="Certificate Management"
                        tabindex="0"
                    >

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1004/1004733.png"
                            alt="Certificate Management"
                            class="card-icon"
                        >

                        <div class="card-title">
                            Certificate Management
                        </div>

                    </div>


                </div>

            </main>


            <!-- ==================================
                 FOOTER
                 ================================== -->

            <footer class="manual-footer">

                <span>
                    Page Generated in 0.02732 seconds
                </span>

                <span>
                    © 2026 Etuwa Concepts, All rights reserved.
                </span>

            </footer>


        </div>


        <!-- ==================================
             WORK IN PROGRESS MODAL
             ================================== -->

        <div
            id="notImplementedModal"
            class="manual-modal"
        >

            <div class="manual-modal-content">


                <button
                    type="button"
                    class="close-modal"
                    id="closeModal"
                    aria-label="Close"
                >

                    &times;

                </button>


                <div class="modal-icon">

                    <i class="fa-solid fa-person-digging"></i>

                </div>


                <h2>
                    Work to be completed
                </h2>


                <p id="modalFeatureName">

                    This section is currently
                    under development.

                </p>


                <button
                    type="button"
                    class="modal-close-button"
                    id="modalCloseButton"
                >

                    Close

                </button>


            </div>

        </div>

    `;


    bindEvents();

}


/* ==================================================
   AVAILABLE ROUTES
   ================================================== */

const availableRoutes = {

    Dashboard:
        "dashboard.html",

    Attendance:
        "attendance.html",

    "User Manual":
        "usermanual.html"

};


/* ==================================================
   SHOW WORK-IN-PROGRESS MODAL
   ================================================== */

function showWorkInProgress(featureName) {

    const modal =
        document.getElementById(
            "notImplementedModal"
        );


    const featureText =
        document.getElementById(
            "modalFeatureName"
        );


    if (!modal) {
        return;
    }


    if (featureText) {

        featureText.textContent =
            `${featureName} is currently under development.`;

    }


    modal.style.display =
        "flex";

}


/* ==================================================
   CLOSE MODAL
   ================================================== */

function closeWorkInProgressModal() {

    const modal =
        document.getElementById(
            "notImplementedModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* ==================================================
   SIDEBAR NAVIGATION
   ================================================== */

function bindSidebarNavigation() {

    const sidebarItems =
        document.querySelectorAll(
            ".nav-item[data-feature]"
        );


    sidebarItems.forEach(
        (item) => {

            const featureName =
                item.dataset.feature;


            item.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    const route =
                        availableRoutes[
                            featureName
                        ];


                    if (route) {

                        window.location.href =
                            route;

                    } else {

                        showWorkInProgress(
                            featureName
                        );

                    }

                }
            );

        }
    );

}


/* ==================================================
   USER MANUAL CARDS
   ================================================== */

function bindManualCards() {

    const cards =
        document.querySelectorAll(
            ".manual-card"
        );


    cards.forEach(
        (card) => {

            const featureName =
                card.dataset.feature;


            card.addEventListener(
                "click",
                () => {

                    showWorkInProgress(
                        featureName
                    );

                }
            );


            card.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        showWorkInProgress(
                            featureName
                        );

                    }

                }
            );

        }
    );

}


/* ==================================================
   MODAL
   ================================================== */

function bindModal() {

    const modal =
        document.getElementById(
            "notImplementedModal"
        );


    const closeButton =
        document.getElementById(
            "closeModal"
        );


    const modalCloseButton =
        document.getElementById(
            "modalCloseButton"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeWorkInProgressModal
        );

    }


    if (modalCloseButton) {

        modalCloseButton.addEventListener(
            "click",
            closeWorkInProgressModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === modal
                ) {

                    closeWorkInProgressModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeWorkInProgressModal();

            }

        }
    );

}


/* ==================================================
   LOGOUT
   ================================================== */

function bindLogout() {

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (!logoutButton) {
        return;
    }


    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "user"
            );

            localStorage.removeItem(
                "token"
            );

            sessionStorage.clear();


            window.location.href =
                "index.html";

        }
    );

}


/* ==================================================
   INITIALIZE
   ================================================== */

function bindEvents() {

    bindSidebarNavigation();

    bindManualCards();

    bindModal();

    bindLogout();

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderUserManual();

    }
);