/* ==========================================
   ETLAB COMMON JAVASCRIPT
   ========================================== */


const logoutButton =
    document.getElementById("logoutButton");


/* ---------- Logout ---------- */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "isLoggedIn"
            );

            localStorage.removeItem(
                "username"
            );


            window.location.href =
                "index.html";

        }
    );

}