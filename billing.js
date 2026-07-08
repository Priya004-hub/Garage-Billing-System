const WEB_APP_URL="https://script.google.com/macros/s/AKfycbwFBLDghXms4gMkUVnUCfWKBdnH1_H58bZXq139r-7AUdvt7MhnDB4kfLmcVWJPFE_i/exec";

const REPORT_URL="https://docs.google.com/spreadsheets/d/1tePj4TK6Y74TFmBkTnvwcprNUHseUG-B-rNvOLq8nqQ/edit";

function generateBillNo(){

let bill=parseInt(localStorage.getItem("billCounter")||1);

document.getElementById("billNo").value="ID"+String(bill).padStart(4,"0");

}

function setDateTime(){

const now=new Date();

document.getElementById("dateTime").value=

now.toLocaleDateString("en-GB")+" "+now.toLocaleTimeString();

}

function saveBill(){

const payment=document.querySelector('input[name="paymentMode"]:checked');

if(payment==null){

alert("Select Payment Mode");

return;

}

const amount=document.getElementById("amount").value.trim();

if(amount==""){

alert("Enter Amount");

return;

}

const data={

billNo:document.getElementById("billNo").value,

dateTime:document.getElementById("dateTime").value,

amount:amount,

paymentMode:payment.value,

description:document.getElementById("description").value

};


fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.text())

.then(result=>{

alert("Bill Saved Successfully");

let bill=parseInt(localStorage.getItem("billCounter")||1);

bill++;

localStorage.setItem("billCounter",bill);

document.getElementById("amount").value="";

document.getElementById("description").value="";

generateBillNo();

setDateTime();

restorePaymentMode();

})

.catch(err=>{

console.log(err);

alert("Saving Failed");

});

}

function printBill(){

const payment=document.querySelector('input[name="paymentMode"]:checked');

const amount=document.getElementById("amount").value;

const description=document.getElementById("description").value;

const now=new Date();

const date=now.toLocaleDateString("en-GB");

const time=now.toLocaleTimeString();

let win=window.open("","","width=900,height=700");

win.document.write(`

<html>

<head>

<title>Bill</title>

<style>

body{

font-family:Calibri;

margin:40px;

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

table,th,td{

border:1px solid black;

}

th,td{

padding:10px;

text-align:center;

}

.footer{

display:flex;

justify-content:space-between;

margin-top:80px;

}

</style>

</head>

<body>

<h2 style="text-align:center;">SSCSC eSevai Center</h2>

<p style="text-align:center;">

Village : Thadicombu<br>

City : Dindigul<br>

Owner : Selvanayaki<br>

WhatsApp : 8695957345

</p>

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

<td>${payment.value}</td>

<td>${description}</td>

</tr>

</table>

<h3 style="text-align:right;">Total : ₹ ${amount}</h3>

<div class="footer">

<div>

_________________<br>

Shop Seal

</div>

<div>

_________________<br>

Owner Signature

</div>

</div>

</body>

</html>

`);

win.document.close();

win.print();

}

function openReports(){

window.open(REPORT_URL,"_blank");

}

function logout(){

localStorage.removeItem("isLoggedIn");

window.location.href="index.html";

}

window.onload = function () {

    generateBillNo();

    setDateTime();

    // Default payment mode
    document.querySelector(
        'input[name="paymentMode"][value="Cash"]'
    ).checked = true;

};
