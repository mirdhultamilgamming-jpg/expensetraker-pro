// ===============================
// Expense Tracker Pro
// Part 1
// ===============================

// Load saved transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Get HTML Elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const type = document.getElementById("type");

const addBtn = document.getElementById("addBtn");

const list = document.getElementById("transactionList");

const search = document.getElementById("search");

// ===============================
// Save Data
// ===============================

function saveData(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}

// ===============================
// Update Cards
// ===============================

function updateSummary(){

let totalIncome = 0;
let totalExpense = 0;

transactions.forEach(item=>{

if(item.type==="Income"){

totalIncome += Number(item.amount);

}else{

totalExpense += Number(item.amount);

}

});

balance.innerText =
"₹" + (totalIncome-totalExpense).toFixed(2);

income.innerText =
"₹" + totalIncome.toFixed(2);

expense.innerText =
"₹" + totalExpense.toFixed(2);

}

// ===============================
// Show Transactions
// ===============================

function displayTransactions(){

list.innerHTML="";

transactions.forEach((item,index)=>{

const row = document.createElement("tr");

row.innerHTML = `
<td>${item.date}</td>

<td>${item.title}</td>

<td class="${
item.type==="Income"
?
"incomeText"
:
"expenseText"
}">
${item.type}
</td>

<td>₹${Number(item.amount).toFixed(2)}</td>

<td>

<button
class="editBtn"
onclick="editTransaction(${index})">

Edit

</button>

<button
class="deleteBtn"
onclick="deleteTransaction(${index})">

Delete

</button>

</td>
`;

list.appendChild(row);

});

updateSummary();

saveData();

}

// ===============================
// Start App
// ===============================

displayTransactions();
// ===============================
// Part 2
// Add / Delete / Edit
// ===============================

// Add Transaction
addBtn.addEventListener("click", addTransaction);

function addTransaction(){

const transactionTitle = title.value.trim();
const transactionAmount = amount.value.trim();
const transactionDate = date.value;

if(
transactionTitle === "" ||
transactionAmount === "" ||
transactionDate === ""
){
alert("Please fill all fields.");
return;
}

transactions.push({

title: transactionTitle,

amount: Number(transactionAmount),

date: transactionDate,

type: type.value

});

clearInputs();

displayTransactions();

}

// Delete Transaction

function deleteTransaction(index){

if(confirm("Delete this transaction?")){

transactions.splice(index,1);

displayTransactions();

}

}

// Edit Transaction

function editTransaction(index){

const item = transactions[index];

title.value = item.title;

amount.value = item.amount;

date.value = item.date;

type.value = item.type;

transactions.splice(index,1);

displayTransactions();

}

// Clear Input Boxes

function clearInputs(){

title.value="";

amount.value="";

date.value="";

type.value="Income";

}

// Press Enter to Add

document.addEventListener("keydown",function(e){

if(e.key==="Enter"){

addTransaction();

}

});
// ===============================
// Part 3
// Search + Dark Mode + Toast
// ===============================

// Search Transactions
search.addEventListener("keyup", function () {

const text = search.value.toLowerCase();

const rows = list.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

const rowText = rows[i].innerText.toLowerCase();

if(rowText.includes(text)){

rows[i].style.display="";

}else{

rows[i].style.display="none";

}

}

});

// ===============================
// Dark Mode
// ===============================

const themeBtn=document.getElementById("themeBtn");

let darkMode=localStorage.getItem("darkMode");

if(darkMode==="true"){

document.body.classList.add("dark");

themeBtn.innerHTML="☀️";

}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const enabled=document.body.classList.contains("dark");

localStorage.setItem("darkMode",enabled);

themeBtn.innerHTML=enabled?"☀️":"🌙";

});

// ===============================
// Toast Notification
// ===============================

function showToast(message){

let toast=document.querySelector(".toast");

if(!toast){

toast=document.createElement("div");

toast.className="toast";

document.body.appendChild(toast);

}

toast.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

// ===============================
// Replace alert()
// ===============================

const oldAddTransaction=addTransaction;

addTransaction=function(){

const transactionTitle=title.value.trim();
const transactionAmount=amount.value.trim();
const transactionDate=date.value;

if(
transactionTitle===""||
transactionAmount===""||
transactionDate===""){
showToast("Please fill all fields.");
return;
}

oldAddTransaction();

showToast("Transaction Added Successfully!");

};
const printBtn = document.getElementById("printBtn");

printBtn.addEventListener("click", () => {
    window.print();
});