function renderDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-logo">
                <img src="https://tkmce.etlab.in/images/etlab_logo.png" alt="Etlab" onerror="this.src='https://via.placeholder.com/40x40?text=E'">
            </div>
            <ul class="sidebar-menu">
                <li><a href="#" class="sidebar-item" title="Dashboard"><i class="fa-solid fa-gauge"></i></a></li>
                <li><a href="#" class="sidebar-item" title="Profile"><i class="fa-solid fa-user"></i></a></li>
                <li><a href="#" class="sidebar-item" title="Attendance"><i class="fa-solid fa-clipboard-user"></i></a></li>
                <li><a href="#" class="sidebar-item" title="Academics"><i class="fa-solid fa-graduation-cap"></i></a></li>
                <li><a href="#" class="sidebar-item" title="Results"><i class="fa-solid fa-square-poll-vertical"></i></a></li>
                <li><a href="#" class="sidebar-item" title="User Manual"><i class="fa-solid fa-book"></i></a></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Top Navbar -->
            <div class="topbar">
                <div class="topbar-left">
                    <i class="fa-solid fa-bars"></i>
                    <span class="college-name">TKM College of Engineering</span>
                </div>
                <div class="topbar-right">
                    <span class="user-info">Logged in as: Student Name | Role: Student</span>
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>

            <!-- Dashboard Layout -->
            <div class="dashboard-container">
                <!-- Left Panel: Vision/Mission & Services Grid -->
                <div class="left-panel">
                    <!-- Vision & Mission -->
                    <div class="vision-mission-card">
                        <h3 class="text-center">Vision of the College</h3>
                        <p class="text-center text-muted text-sm">Excellence in education and research with socio-economic and environmental commitment.</p>
                        <h3 class="text-center">Mission of the College</h3>
                        <p class="text-center text-muted text-sm">To provide quality education</p>
                    </div>

                    <!-- Services Grid -->
                    <div class="services-grid">
                        <!-- Cards -->
                        <div class="service-card action-card">
                            <i class="fa-solid fa-user text-blue"></i>
                            <span>Profile</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-money-bill-wave text-green"></i>
                            <span>Fee Details</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-envelope text-orange"></i>
                            <span>Messages</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-clipboard-user text-purple"></i>
                            <span>Attendance</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-calendar-days text-red"></i>
                            <span>Timetable</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-square-poll-vertical text-teal"></i>
                            <span>Marks</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-gavel text-gray"></i>
                            <span>Disciplinary Action</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-book text-blue"></i>
                            <span>Library</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-chalkboard-user text-green"></i>
                            <span>Course Registration</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-comments text-orange"></i>
                            <span>Feedback</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-file-lines text-purple"></i>
                            <span>Assignments</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-bus text-red"></i>
                            <span>Transport</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-bed text-teal"></i>
                            <span>Hostel</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-certificate text-gray"></i>
                            <span>Certificates</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-hand-holding-heart text-blue"></i>
                            <span>Scholarships</span>
                        </div>
                        <div class="service-card action-card">
                            <i class="fa-solid fa-user-graduate text-green"></i>
                            <span>Alumni</span>
                        </div>
                    </div>
                </div>

                <!-- Right Panel: Calendar & Notice Board -->
                <div class="right-panel">
                    <!-- Calendar -->
                    <div class="widget-box">
                        <div class="widget-header">
                            <i class="fa-solid fa-calendar-alt"></i> Calendar
                        </div>
                        <div class="widget-content p-0">
                            <!-- Mock Calendar Table -->
                            <table class="calendar-table">
                                <thead>
                                    <tr>
                                        <th colspan="7" class="calendar-month">August 2026</th>
                                    </tr>
                                    <tr>
                                        <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-muted">26</td><td class="text-muted">27</td><td class="text-muted">28</td><td class="text-muted">29</td><td class="text-muted">30</td><td class="text-muted">31</td><td>1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td><td>3</td><td>4</td><td class="today">5</td><td>6</td><td>7</td><td>8</td>
                                    </tr>
                                    <tr>
                                        <td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
                                    </tr>
                                    <tr>
                                        <td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
                                    </tr>
                                    <tr>
                                        <td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Notice Board -->
                    <div class="widget-box mt-3">
                        <div class="widget-header">
                            <i class="fa-solid fa-clipboard-list"></i> Notice Board
                        </div>
                        <div class="widget-content">
                            <ul class="notice-list">
                                <li>
                                    <div class="notice-date">05 Aug 2026</div>
                                    <div class="notice-title"><a href="#" class="action-card">End Semester Examination Timetable Published.</a></div>
                                </li>
                                <li>
                                    <div class="notice-date">01 Aug 2026</div>
                                    <div class="notice-title"><a href="#" class="action-card">Fee Payment Deadline Extended.</a></div>
                                </li>
                                <li>
                                    <div class="notice-date">28 Jul 2026</div>
                                    <div class="notice-title"><a href="#" class="action-card">Campus Placement Drive 2026 Registration Open.</a></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Popup for Not Implemented -->
        <div id="notImplementedModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Notice</h2>
                <p>Not implemented yet.</p>
            </div>
        </div>
    `;

    bindEvents();
}

function bindEvents() {
    const modal = document.getElementById("notImplementedModal");
    const closeBtn = document.querySelector(".close-modal");
    
    // Get all items that should trigger the modal
    const clickableElements = document.querySelectorAll(".action-card, .sidebar-item, .manual-card");
    
    // Add click event to each element
    if (clickableElements) {
        clickableElements.forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                modal.style.display = "block";
            });
        });
    }

    if (closeBtn) {
        // Close modal when clicking on (x)
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderDashboard();
});
