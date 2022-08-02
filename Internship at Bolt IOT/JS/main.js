//var $ = require('jQuery'); 

// var script = document.createElement('script'); 
 
// script.src = '//code.jquery.com/jquery-1.11.0.min.js'; 
// document.getElementsByTagName('head')[0].appendChild(script); 

const balance = document.getElementById("balance");
const inflow = document.getElementById("income");
const outflow = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");

const text = document.getElementById("category");

const amount = document.getElementById("amount");

const text_note = document.getElementById("text_note");
const date = document.getElementById("date");


const b1 = document.getElementById("list[0]");
const b2 = document.getElementById("list[1]");

//var select = document.getElementById('language');
//var option = select.options[select.selectedIndex];

var select = document.getElementById('category');
var option = select.options[select.selectedIndex];

// import { readFileSync } from 'fs'
//import { writeFileSync } from 'fs';
const c =document.getElementById('ot');

// Get transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions") 
);                                          
                                                                                             
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
  console.log(transactions);

//<div class="form-control">

function extraCategory(){
  var newcategory = document.getElementById("add_category");
    newcategory.innerHTML ='<label for="text" id = "label_category">Add Category</label><input type="text" id="category_change" placeholder="Add new Category" style="width: 400px;margin-top: 15px;padding: 5px 8px;border-radius: 1rem;margin-left: 38px;"/>'
    console.log("New Category");
    
  }

function addCategory(){
  const addc = document.getElementById("category_change");
    //'<div class="form-control"><label for="text">Add Category</label><input type="text" id="category_change" onfocus="this.value=" "" placeholder="Add new Category" style="width: 400px;margin-top: 15px;padding: 5px 8px;border-radius: 1rem;margin-left: 38px;"/></div>'
    console.log(addc.value);
    console.log(c.text);

    //c.innerHTML.text=addc.value;

    // document.getElementById('category').innerHTML
    // = `<option value="x">${addc.value}</option>`;

    // var $newdiv1 = $(`<option value='x'>${addc.value}</option>`);
    // //newdiv2 = document.createElement();
    // $(`<select class = 'combo' id='category' onChange='update()'></select>`).append( $newdiv1);

    $( ".combo" ).append( `<option value='x'>${addc.value}</option>` );
    
    addc.value = "";
    const element1 = document.getElementById("category_change");
    const element2 = document.getElementById("label_category");
    element1.remove();
    element2.remove();

  }  
 

function update (){
  var select = document.getElementById('category');
  var option = select.options[select.selectedIndex];

 //   var text = "text";   

    //document.getElementById('value').value = option.value;
    //document.getElementById('text').value = option.text;

  
  // if (option.text === "Other") {
  //   document.getElementById("add_category").innerHTML =
  //   '<label for="text">Add Category</label><input type="text" id="category_change" placeholder="Add new Category" style="width: 400px;margin-top: 30px;padding: 5px 8px;border-radius: 1rem;margin-left: 38px;"/>'
  // } 
//   var t = document.getElementById("cat");
//           console.log(t.value);
}




// Add transaction
function addTransaction(e) {
  e.preventDefault();
  var select = document.getElementById('category');
  var option = select.options[select.selectedIndex];
  var ex_category = document.getElementById('category_change');

  if (date.value.trim() === "" || amount.value.trim() === "" || option.text.trim() === "") {
    document.getElementById("error_msg").innerHTML =
      "<span >Error: Please enter Category , Amount and Date</span>";
    setTimeout(
      () => (document.getElementById("error_msg").innerHTML = ""),
      1000
    );
  } else {
    const transaction = {
      id: generateID(),
      option: option.text,
      amount: +amount.value,
      text_note: text_note.value,
      date: date.value,
    };
    
    //document.getElementById('value').value = option.value;
    //document.getElementById('text').value = option.text;

        

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();


   // console.log(select.text);
    console.log(option.text);
    console.log(transaction.text);
    
    
    //select.value="";
    //tra.value = "";
    amount.value = "";
    text_note.value = "";
    date.value = "";
    //ex_category.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Transactions history
function addTransactionDOM(transaction) {
  // Get sign
  var select = document.getElementById('category');
  var option = select.options[select.selectedIndex];
  var ex_category = document.getElementById('category_change');

    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");
  
    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    //console.log(ex_category.text);
  
    // item.innerHTML = `<hr class="new1">
    //   ${option.text}<br>${transaction.text_note} ${sign}${Math.abs(
    //   transaction.amount
    // )} <button class="delete-btn" onclick="removeTransaction(${
    //   transaction.id
    // })">x</button><br>
    // `;
  //if (ex_category.text === " ") {

    item.innerHTML = `${transaction.option}  : ${transaction.text_note}  (Date: ${transaction.date}) ${sign} ${Math.abs(transaction.amount
      )} <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `;
  // }
  //  else
  //  {
  //    item.innerHTML = `${ex_category.text}  : ${transaction.text_note}  (Date: ${transaction.date}) ${sign} ${Math.abs(transaction.amount
  //    )} <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;  
  //  }
    
    list.appendChild(item);

 // const textToBeWritten = 'Hopefully, you enjoyed going through the article'
  //writeFileSync('./newFileCreated.txt', item)
//}
}              


// Update the balance, inflow and outflow
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);

  const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((value) => value < 0)
      .reduce((bal, value) => (bal += value), 0) * -(1).toFixed(2);

  balance.innerText = `Rs. ${total}/-`;
  inflow.innerText = `Rs. ${income}/-`;
  outflow.innerText = `Rs. ${expense}/-`;

  const spend_balance = parseFloat(total);
  const num_income = 0.1 * parseFloat(income);

  if (spend_balance < num_income) {
    document.getElementById("notice").innerHTML =
       "<span >Caution : Balance is low.</span>";
  //   setTimeout(
  //     () => (document.getElementById("error_msg").innerHTML = ""),
  //     5000
    //);
   } else {
  //   console.log("You have sufficient Transaction Money");
  //   };
  console.log(total);
  console.log(income);
  document.getElementById("notice").innerHTML =
       "<span >Balance is sufficient for Transaction</span>";
  setTimeout(
   () => (document.getElementById("notice").innerHTML = ""),
       3000);
  }
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();

  start();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Start app
function start() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

start();

form.addEventListener("submit", addTransaction);       










































































