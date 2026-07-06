const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbybqhpdY5ilSjyfCh_-WD0l_75EdfAWFBLvDhr2fYw/dev";
// Auto Date & Time
function setDateTime() {
const now = new Date();


const dateTime =
    now.toLocaleDateString('en-GB') +
    " " +
    now.toLocaleTimeString();

document.getElementById("dateTime").value =
    dateTime;

}
function printBill() {

    const amount = document.getElementById("amount").value;
    const paymentMode = document.querySelector('input[name="paymentMode"]:checked').value;
    const description = document.getElementById("description").value;

    const now = new Date();

    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString();

    const bill = `
    <html>
    <head>
    <title>SSCSC eSevai Center Bill</title>

    <style>

    body{
        font-family:Calibri;
        margin:40px;
        color:#000;
    }

    h2,h3,p{
        text-align:center;
        margin:4px;
    }

    table{
        width:100%;
        border-collapse:collapse;
        margin-top:25px;
    }

    table,th,td{
        border:1px solid black;
    }

    th,td{
        padding:10px;
        text-align:center;
    }

    .footer{

        margin-top:70px;

        display:flex;

        justify-content:space-between;

    }

    </style>

    </head>

    <body>

        <h2>SSCSC eSevai Center</h2>

        <p><b>Village :</b> Thadicombu</p>

        <p><b>City :</b> Dindigul</p>

        <p><b>Owner :</b> Selvanayaki</p>

        <p><b>WhatsApp :</b> 8695957345</p>

        <hr>

        <table>

        <tr>

        <th>Date</th>

        <th>Time</th>

        <th>Amount</th>

        <th>Payment Mode</th>

        <th>Description</th>

        </tr>

        <tr>

        <td>${date}</td>

        <td>${time}</td>

        <td>₹ ${amount}</td>

        <td>${paymentMode}</td>

        <td>${description}</td>

        </tr>

        </table>

        <br>

        <h3>Total Amount : ₹ ${amount}</h3>

        <div class="footer">

            <div>

                ______________________

                <br><br>

                Shop Seal

            </div>

            <div>

                ______________________

                <br><br>

                Owner Signature

            </div>

        </div>

    </body>

    </html>
    `;

    var win = window.open("", "", "width=900,height=700");

    win.document.write(bill);

    win.document.close();

    win.focus();

    win.print();

    win.close();

}

// Generate Bill Number
function generateBillNo() {

    let currentNo = parseInt(localStorage.getItem("billCounter") || 1);

    document.getElementById("billNo").value =
        "ID" + String(currentNo).padStart(4, '0');

}
function openReports() {
    window.open(
        "https://docs.google.com/spreadsheets/d/1AF_gcWYApPa6qMEStFrF0EGYBL-_zFuNH-hCWmq6WRU/edit?gid=0#gid=0",
        "_blank"
    );
}

// Save Bill
function saveBill() {

    const data = {
        billNo: document.getElementById("billNo").value,
        dateTime: document.getElementById("dateTime").value,
        amount: document.getElementById("amount").value,
        paymentMode: document.querySelector('input[name="paymentMode"]:checked').value,
        description: document.getElementById("description").value
    };

    // Save selected payment mode
    localStorage.setItem("lastPaymentMode", data.paymentMode);

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {

        alert("✓ Bill Saved Successfully");

        // Increase Bill Number
        let currentNo = parseInt(localStorage.getItem("billCounter") || 1);
        currentNo++;
        localStorage.setItem("billCounter", currentNo);

        // Clear only required fields
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";

        // Generate next Bill No
        generateBillNo();

        // Update Date & Time
        setDateTime();

        // Keep same payment mode
        restorePaymentMode();

    })
    .catch(error => {

        alert("❌ Error Saving Bill");
        console.log(error);

    });

}
function restorePaymentMode() {

    var lastMode = localStorage.getItem("lastPaymentMode");

    if (lastMode) {

        var radio = document.querySelector(
            'input[name="paymentMode"][value="' + lastMode + '"]'
        );

        if (radio) {
            radio.checked = true;
        }

    } else {

        document.querySelector(
            'input[name="paymentMode"][value="Cash"]'
        ).checked = true;

    }

}

// Run on Page Load
window.onload = function () {

    generateBillNo();

    setDateTime();

    restorePaymentMode();

};
