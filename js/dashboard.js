function renderDashboard() {

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
                    class="nav-item active"
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
                    href="results.html"
                    class="nav-item"
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
                    href="timetable.html"
                    class="nav-item"
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
                    href="assignments.html"
                    class="nav-item"
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
                    href="class-materials.html"
                    class="nav-item"
                    
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
                    class="nav-item"
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

                &nbsp;

                Home

                &nbsp; › &nbsp;

                <span class="current">
                    Dashboard
                </span>

            </div>


            <!-- ==================================
                 DASHBOARD
                 ================================== -->

            <main class="dashboard-container">


                <!-- ==================================
                     LEFT PANEL
                     ================================== -->

                <section class="left-panel">


                    <!-- Vision / Mission -->

                    <div class="vision-mission-card">

                        <h3>
                            Vision of the College
                        </h3>

                        <p>

                            Excellence in education and
                            research with socio-economic
                            and environmental commitment.

                        </p>


                        <h3>
                            Mission of the College
                        </h3>

                        <p>

                            To provide quality education

                        </p>

                    </div>


                    <!-- ==================================
                         SERVICES
                         ================================== -->

                    <div class="services-grid">


                        <!-- Profile -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Profile"
                        >

                            <i class="fa-solid fa-user text-blue"></i>

                            <span>
                                Profile
                            </span>

                        </a>


                        <!-- Fee Details -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Fee Details"
                        >

                            <i class="fa-solid fa-money-bill-wave text-green"></i>

                            <span>
                                Fee Details
                            </span>

                        </a>


                        <!-- Messages -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Messages"
                        >

                            <i class="fa-solid fa-envelope text-orange"></i>

                            <span>
                                Messages
                            </span>

                        </a>


                        <!-- Attendance -->

                        <a
                            href="attendance.html"
                            class="service-card action-card"
                            data-route="attendance.html"
                        >

                            <i class="fa-solid fa-clipboard-user text-purple"></i>

                            <span>
                                Attendance
                            </span>

                        </a>


                        <!-- Timetable -->

                        <a
                            href="timetable.html"
                            class="service-card action-card"
                            data-route="timetable.html"
                        >

                            <i class="fa-solid fa-calendar-days text-red"></i>

                            <span>
                                Timetable
                            </span>

                        </a>


                        <!-- Results -->

                        <a
                            href="results.html"
                            class="service-card action-card"
                            data-route="results.html"
                        >

                            <i class="fa-solid fa-square-poll-vertical text-teal"></i>

                            <span>
                                Results
                            </span>

                        </a>


                        <!-- Disciplinary Action -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Disciplinary Action"
                        >

                            <i class="fa-solid fa-gavel text-gray"></i>

                            <span>
                                Disciplinary Action
                            </span>

                        </a>


                        <!-- Library -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Library"
                        >

                            <i class="fa-solid fa-book text-blue"></i>

                            <span>
                                Library
                            </span>

                        </a>


                        <!-- Course Registration -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Course Registration"
                        >

                            <i class="fa-solid fa-chalkboard-user text-green"></i>

                            <span>
                                Course Registration
                            </span>

                        </a>


                        <!-- Feedback -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Feedback"
                        >

                            <i class="fa-solid fa-comments text-orange"></i>

                            <span>
                                Feedback
                            </span>

                        </a>


                        <!-- Assignments -->

                        <a
                            href="assignments.html"
                            class="service-card action-card"
                            data-route="assignments.html"
                        >

                            <i class="fa-solid fa-file-lines text-purple"></i>

                            <span>
                                Assignments
                            </span>

                        </a>


                        <!-- Transport -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Transport"
                        >

                            <i class="fa-solid fa-bus text-red"></i>

                            <span>
                                Transport
                            </span>

                        </a>


                        <!-- Hostel -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Hostel"
                        >

                            <i class="fa-solid fa-bed text-teal"></i>

                            <span>
                                Hostel
                            </span>

                        </a>


                        <!-- Certificates -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Certificates"
                        >

                            <i class="fa-solid fa-certificate text-gray"></i>

                            <span>
                                Certificates
                            </span>

                        </a>


                        <!-- Scholarships -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Scholarships"
                        >

                            <i class="fa-solid fa-hand-holding-heart text-blue"></i>

                            <span>
                                Scholarships
                            </span>

                        </a>


                        <!-- Alumni -->

                        <a
                            href="#"
                            class="service-card action-card"
                            data-feature="Alumni"
                        >

                            <i class="fa-solid fa-user-graduate text-green"></i>

                            <span>
                                Alumni
                            </span>

                        </a>


                    </div>

                </section>


                <!-- ==================================
                     RIGHT PANEL
                     ================================== -->

                <aside class="right-panel">


                    <!-- Calendar -->

                    <div class="widget-box">


                        <div class="widget-header">

                            <i class="fa-solid fa-calendar-days"></i>

                            Calendar

                        </div>


                        <div class="widget-content p-0">


                            <table class="calendar-table">

                                <thead>

                                    <tr>

                                        <th
                                            colspan="7"
                                            class="calendar-month"
                                        >
                                            August 2026
                                        </th>

                                    </tr>


                                    <tr>

                                        <th>Sun</th>

                                        <th>Mon</th>

                                        <th>Tue</th>

                                        <th>Wed</th>

                                        <th>Thu</th>

                                        <th>Fri</th>

                                        <th>Sat</th>

                                    </tr>

                                </thead>


                                <tbody>


                                    <tr>

                                        <td class="text-muted">
                                            26
                                        </td>

                                        <td class="text-muted">
                                            27
                                        </td>

                                        <td class="text-muted">
                                            28
                                        </td>

                                        <td class="text-muted">
                                            29
                                        </td>

                                        <td class="text-muted">
                                            30
                                        </td>

                                        <td class="text-muted">
                                            31
                                        </td>

                                        <td>
                                            1
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            2
                                        </td>

                                        <td>
                                            3
                                        </td>

                                        <td>
                                            4
                                        </td>

                                        <td class="today">
                                            5
                                        </td>

                                        <td>
                                            6
                                        </td>

                                        <td>
                                            7
                                        </td>

                                        <td>
                                            8
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            9
                                        </td>

                                        <td>
                                            10
                                        </td>

                                        <td>
                                            11
                                        </td>

                                        <td>
                                            12
                                        </td>

                                        <td>
                                            13
                                        </td>

                                        <td>
                                            14
                                        </td>

                                        <td>
                                            15
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            16
                                        </td>

                                        <td>
                                            17
                                        </td>

                                        <td>
                                            18
                                        </td>

                                        <td>
                                            19
                                        </td>

                                        <td>
                                            20
                                        </td>

                                        <td>
                                            21
                                        </td>

                                        <td>
                                            22
                                        </td>

                                    </tr>


                                    <tr>

                                        <td>
                                            23
                                        </td>

                                        <td>
                                            24
                                        </td>

                                        <td>
                                            25
                                        </td>

                                        <td>
                                            26
                                        </td>

                                        <td>
                                            27
                                        </td>

                                        <td>
                                            28
                                        </td>

                                        <td>
                                            29
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>


                    <!-- Notice Board -->

                    <div class="widget-box mt-3">


                        <div class="widget-header">

                            <i class="fa-solid fa-clipboard-list"></i>

                            Notice Board

                        </div>


                        <div class="widget-content">


                            <ul class="notice-list">


                                <li>

                                    <div class="notice-date">

                                        05 Aug 2026

                                    </div>


                                    <div class="notice-title">

                                        <a href="#">

                                            End Semester Examination
                                            Timetable Published.

                                        </a>

                                    </div>

                                </li>


                                <li>

                                    <div class="notice-date">

                                        01 Aug 2026

                                    </div>


                                    <div class="notice-title">

                                        <a href="#">

                                            Fee Payment Deadline
                                            Extended.

                                        </a>

                                    </div>

                                </li>


                                <li>

                                    <div class="notice-date">

                                        28 Jul 2026

                                    </div>


                                    <div class="notice-title">

                                        <a href="#">

                                            Campus Placement Drive
                                            2026 Registration Open.

                                        </a>

                                    </div>

                                </li>


                            </ul>

                        </div>

                    </div>


                </aside>

            </main>

        </div>


        <!-- ==================================
             WORK TO BE COMPLETED MODAL
             ================================== -->

        <div
            id="notImplementedModal"
            class="modal"
        >

            <div class="modal-content">

                <span
                    class="close-modal"
                    id="closeModal"
                >
                    &times;
                </span>


                <div class="modal-icon">

                    <i class="fa-solid fa-person-digging"></i>

                </div>


                <h2>
                    Work to be completed
                </h2>


                <p id="modalFeatureName">
                    This section is currently under development.
                </p>


                <button
                    type="button"
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
   ACTIVE ROUTES
   ================================================== */

/*
 * Only pages that are actually implemented
 * should be placed here.
 *
 * At the moment Attendance is ready.
 *
 * Example:
 *
 * assignments: "assignments.html"
 *
 * can be added later when that page is ready.
 */

const availableRoutes = {

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
        "block";

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
   HANDLE FEATURE CLICK
   ================================================== */

function handleFeatureClick(
    event,
    featureName
) {

    event.preventDefault();


    /*
     * Check whether the requested page
     * has actually been implemented.
     */

    const route =
        availableRoutes[
            featureName
        ];


    if (route) {

        window.location.href =
            route;

        return;

    }


    /*
     * Page does not exist yet.
     */

    showWorkInProgress(
        featureName
    );

}


/* ==================================================
   EVENT BINDING
   ================================================== */

function bindEvents() {


    /* ==============================================
       DASHBOARD CARDS
       ============================================== */

    const actionCards =
        document.querySelectorAll(
            ".action-card"
        );


    actionCards.forEach(
        (card) => {

            const featureName =
                card.dataset.feature;


            /*
             * If the card has a real route,
             * allow normal navigation.
             *
             * Attendance currently uses this.
             */

            const directRoute =
                card.dataset.route;


            if (directRoute) {

                card.addEventListener(
                    "click",
                    () => {

                        window.location.href =
                            directRoute;

                    }
                );

                return;

            }


            /*
             * Otherwise show the
             * work-in-progress modal.
             */

            card.addEventListener(
                "click",
                (event) => {

                    handleFeatureClick(
                        event,
                        featureName
                    );

                }
            );


            /*
             * Keyboard accessibility.
             */

            card.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        if (availableRoutes[featureName]) {

                            window.location.href =
                                availableRoutes[
                                    featureName
                                ];

                        } else {

                            showWorkInProgress(
                                featureName
                            );

                        }

                    }

                }
            );

        }
    );


    /* ==============================================
       SIDEBAR ITEMS
       ============================================== */

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

                    handleFeatureClick(
                        event,
                        featureName
                    );

                }
            );

        }
    );





    /* ==============================================
       MODAL CLOSE BUTTON
       ============================================== */

    const closeModal =
        document.getElementById(
            "closeModal"
        );


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeWorkInProgressModal
        );

    }


    /* ==============================================
       MODAL CLOSE BUTTON
       ============================================== */

    const modalCloseButton =
        document.getElementById(
            "modalCloseButton"
        );


    if (modalCloseButton) {

        modalCloseButton.addEventListener(
            "click",
            closeWorkInProgressModal
        );

    }


    /* ==============================================
       CLICK OUTSIDE MODAL
       ============================================== */

    const modal =
        document.getElementById(
            "notImplementedModal"
        );


    if (modal) {

        window.addEventListener(
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


    /* ==============================================
       ESCAPE KEY
       ============================================== */

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


    /* ==============================================
       LOGOUT
       ============================================== */

    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

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

}


/* ==================================================
   INITIALIZE DASHBOARD
   ================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderDashboard();

    }
);