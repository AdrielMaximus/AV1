const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
  menu.classList.toggle('ativo');
  NavMenu.classList.toggle('ativo');
});

const balanceAmount = document.getElementById('balance-amount');
const transactionsList = document.getElementById('transactions-list');
const addTransactionForm = document.getElementById('add-transaction-form');
const removeTransactionButton = document.getElementById('remove-transaction-button');
const clearTransactionsButton = document.getElementById('clear-transactions-button');

let balance = 0;
let transactions = [];

function addTransaction(event) {
  event.preventDefault();
  const amountInput = document.getElementById('transaction-amount');
  const descriptionInput = document.getElementById('transaction-description');
  const amount = parseFloat(amountInput.value);
  const description = descriptionInput.value;

  // Check if amount is a valid number
  if (isNaN(amount)) {
    amountInput.value = '';
    descriptionInput.value = '';
    return;
  }

  const transaction = { amount, description };
  transactions.push(transaction);
  updateTransactions();
  updateBalance();
  amountInput.value = '';
  descriptionInput.value = '';
}

function removeLastTransaction() {
  transactions.pop();
  updateTransactions();
  updateBalance();
}

function clearTransactions() {
  transactions = [];
  updateTransactions();
  updateBalance();
}

function updateTransactions() {
  transactionsList.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const li = document.createElement('li');
    li.classList.add('transaction');
    const amountSpan = document.createElement('span');
    amountSpan.textContent = transaction.amount.toFixed(2);
    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = transaction.description;
    li.appendChild(amountSpan);
    li.appendChild(descriptionSpan);
    transactionsList.appendChild(li);
  }
}


function updateBalance() {
  balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    balance += transaction.amount;
  }
  if (isNaN(balance)) {
    balanceAmount.style.display = 'none'; // hide balance if it's NaN
  } else {
    balanceAmount.style.display = 'block'; // show balance if it's valid
    balanceAmount.textContent = '$' + balance.toFixed(2);
    if (balance >= 0) {
      balanceAmount.style.color = 'green';
    } else {
      balanceAmount.style.color = 'red';
    }
  }
}


addTransactionForm.addEventListener('submit', addTransaction);
removeTransactionButton.addEventListener('click', removeLastTransaction);
clearTransactionsButton.addEventListener('click', clearTransactions);
