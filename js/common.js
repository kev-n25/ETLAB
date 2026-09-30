/* ==========================================
   ETLAB COMMON JAVASCRIPT
   ========================================== */


const logoutButton =
    document.getElementById("logoutButton");


/* ==========================================
   LOGOUT
   ========================================== */

function logoutUser() {

    /*
     * Remove all authentication information.
     */

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("isLoggedIn");

    /*
     * Remove student information.
     */

    localStorage.removeItem("username");

    localStorage.removeItem("studentName");

    localStorage.removeItem("studentId");

    /*
     * Remove faculty information.
     */

    localStorage.removeItem("facultyId");

    localStorage.removeItem("facultyName");


    /*
     * Redirect to login.
     */

    window.location.href =
        "index.html";
}


/* ==========================================
   LOGOUT BUTTON
   ========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logoutUser
            );

        }

    }
);