const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter description and amount');
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
}


function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const li = document.createElement('li');
    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    li.innerHTML = `
        ${transaction.text} 
        <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
}


function updateValues() {

  
    let amounts = [];
    for (let i = 0; i < transactions.length; i++) {
        amounts.push(transactions[i].amount);
    }


    let total = 0;
    for (let i = 0; i < amounts.length; i++) {
        total = total + amounts[i];
    }


    let income = 0;
    for (let i = 0; i < amounts.length; i++) {
        if (amounts[i] > 0) {
            income = income + amounts[i];
        }
    }

 
    let expense = 0;
    for (let i = 0; i < amounts.length; i++) {
        if (amounts[i] < 0) {
            expense = expense + amounts[i];
        }
    }
    expense = expense * -1;

   
    balance.innerText = "₹" + total.toFixed(2);
    money_plus.innerText = "+₹" + income.toFixed(2);
    money_minus.innerText = "-₹" + expense.toFixed(2);
}


function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener('submit', addTransaction);

init();
