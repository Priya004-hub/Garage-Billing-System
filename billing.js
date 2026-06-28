const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxs_9KqMNVBXB_aLASUMhf9_mLNkmcTIJveF10duDUU6E4jCkXKOCc3uIVcewpBNw4K/exec";
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

// Generate Bill Number
function generateBillNo() {

let currentNo =
    parseInt(localStorage.getItem("billCounter") || 1);

document.getElementById("billNo").value =
    "ID" + String(currentNo).padStart(2, '0');

}
function openReports() {
    window.open(
        "https://docs.google.com/spreadsheets/d/1IfWlPUjZViWfR3VLycx7an-7DfcK-_r_53nwwKO_gj4/edit?gid=0#gid=0",
        "_blank"
    );
}

// Save Bill
function saveBill() {

const data = {
    amount: document.getElementById("amount").value,
    paymentMode: document.querySelector('input[name="paymentMode"]:checked').value,
    description: document.getElementById("description").value
};
console.log(data);

alert(
  "BillNo: " + data.billNo +
  "\nDateTime: " + data.dateTime
);

fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(data)
})
.then(response => response.text())
.then(result => {

    alert("✓ Bill Saved Successfully");

    // Increase Bill Number
    let currentNo =
        parseInt(localStorage.getItem("billCounter") || 1);

    currentNo++;

    localStorage.setItem(
        "billCounter",
        currentNo
    );

    // Clear Form
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    // Refresh Auto Fields
    setDateTime();
    generateBillNo();
})
.catch(error => {

    alert("❌ Error Saving Bill");

    console.log(error);
});


}

// Run on Page Load
window.onload = function() {
setDateTime();
generateBillNo();
};
