// If already logged in, go directly to Billing Page
if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "billing.html";
}

// Login Function
function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const remember = document.getElementById("rememberMe").checked;

    if (username === "Selvanayaki" && password === "Selvi@123") {

        localStorage.setItem("isLoggedIn", "true");

        if (remember) {
            localStorage.setItem("savedUsername", username);
            localStorage.setItem("savedPassword", password);
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
            localStorage.removeItem("rememberMe");
        }

        alert("Login Successful");
        window.location.href = "billing.html";

    } else {

        alert("Invalid Username or Password");

    }
}

// Load saved credentials
window.onload = function () {

    if (localStorage.getItem("rememberMe") === "true") {

        document.getElementById("username").value =
            localStorage.getItem("savedUsername") || "";

        document.getElementById("password").value =
            localStorage.getItem("savedPassword") || "";

        document.getElementById("rememberMe").checked = true;
    }

};
