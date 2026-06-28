<script src="js files/login.js"></script>

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(username === "admin" &&
       password === "admin123") {

        window.location.href =
            "billing.html";

    } else {

        alert("Wrong Username or Password");

    }
}