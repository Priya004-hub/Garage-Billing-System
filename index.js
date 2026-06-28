<script src="js files/index.js"></script>

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(username === "Selvanayaki" &&
       password === "Selvi@123") {

        window.location.href =
            "billing.html";

    } else {

        alert("Wrong Username or Password");

    }
}
