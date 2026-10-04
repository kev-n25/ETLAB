/* ==========================================
   ETLAB LOGIN JAVASCRIPT
   ========================================== */


/* ==========================================
   ELEMENTS
   ========================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


const usernameInput =
    document.getElementById(
        "username"
    );


const passwordInput =
    document.getElementById(
        "password"
    );


const showPassword =
    document.getElementById(
        "showPassword"
    );


const loginError =
    document.getElementById(
        "loginError"
    );


/* ==========================================
   SHOW / HIDE PASSWORD
   ========================================== */

if (showPassword) {

    showPassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

            } else {

                passwordInput.type =
                    "password";

            }

        }
    );

}


/* ==========================================
   LOGIN
   ========================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                usernameInput.value.trim();


            const password =
                passwordInput.value.trim();


            loginError.textContent =
                "";


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

                const response =
                    await fetch(
                        "http://localhost:5000/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username:
                                        username,

                                    password:
                                        password
                                })
                        }
                    );


                const data =
                    await response.json();


                /* ==================================
                   LOGIN FAILED
                   ================================== */

                if (
                    !response.ok ||
                    !data.success
                ) {

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


                /* ==================================
                   STORE JWT
                   ================================== */

                localStorage.setItem(
                    "token",
                    data.token
                );


                /* ==================================
                   STORE ROLE
                   ================================== */

                localStorage.setItem(
                    "role",
                    data.user.role
                );


                /* ==================================
                   LOGIN STATUS
                   ================================== */

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                /* ==================================
                   FACULTY LOGIN
                   ================================== */

                if (
                    data.user.role ===
                    "faculty"
                ) {

                    if (
                        data.profile &&
                        data.profile._id
                    ) {

                        localStorage.setItem(
                            "facultyId",
                            data.profile._id
                        );

                    }


                    if (
                        data.profile &&
                        data.profile.name
                    ) {

                        localStorage.setItem(
                            "facultyName",
                            data.profile.name
                        );

                    }


                    window.location.href =
                        "faculty-dashboard.html";


                    return;

                }


                /* ==================================
                   STUDENT LOGIN
                   ================================== */

                localStorage.setItem(
                    "username",
                    data.user.username ||
                    username
                );


                if (
                    data.profile &&
                    data.profile.name
                ) {

                    localStorage.setItem(
                        "studentName",
                        data.profile.name
                    );

                }


                if (
                    data.profile &&
                    data.profile._id
                ) {

                    localStorage.setItem(
                        "studentId",
                        data.profile._id
                    );

                }


                /* ==================================
                   REDIRECT TO STUDENT DASHBOARD
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

}