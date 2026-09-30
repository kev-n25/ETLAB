/* ==========================================
   ETLAB LOGIN JAVASCRIPT
   ========================================== */


const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const showPassword =
    document.getElementById("showPassword");

const loginError =
    document.getElementById("loginError");



/* ==========================================
   SHOW / HIDE PASSWORD
   ========================================== */

showPassword.addEventListener(
    "click",
    function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

        } else {

            passwordInput.type = "password";

        }

    }
);



/* ==========================================
   LOGIN
   ========================================== */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value.trim();


        loginError.textContent = "";



        /* ==================================
           VALIDATION
           ================================== */

        if (username === "") {

            loginError.textContent =
                "Username is required.";

            return;
        }


        if (password === "") {

            loginError.textContent =
                "Password is required.";

            return;
        }



        /* ==================================
           BACKEND LOGIN
           ================================== */

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );


            const data =
                await response.json();



            /* ==================================
               LOGIN FAILED
               ================================== */

            if (!data.success) {

                loginError.textContent =
                    data.message ||
                    "Invalid username or password.";

                return;
            }



            /* ==================================
               LOGIN SUCCESSFUL
               ================================== */

            console.log(
                "Login successful:",
                data
            );


            /* ---------- Store JWT ---------- */

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            if (data.user.role === "faculty") {

                localStorage.setItem(
                    "facultyId",
                    data.profile._id
                );

            localStorage.setItem(
                "facultyName",
                data.profile.name
            );

            window.location.href =
                "faculty-dashboard.html";

            return;
        }


            /* ---------- Store user information ---------- */

            localStorage.setItem(
                "username",
                data.user.username
            );


            localStorage.setItem(
                "studentName",
                data.profile.name
            );


            /* ---------- Store student ID ---------- */

            localStorage.setItem(
                "studentId",
                data.profile._id
            );


            /* ---------- Login status ---------- */

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );



            /* ==================================
               REDIRECT TO DASHBOARD
               ================================== */

            window.location.href =
                "dashboard.html";


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            loginError.textContent =
                "Unable to connect to server.";

        }

    }
);