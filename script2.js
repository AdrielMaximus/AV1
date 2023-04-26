
const balanceAmount = document.getElementById('balance-amount');
const transactionsList = document.getElementById('transactions-list');
const addTransactionForm = document.getElementById('add-transaction-form');

let balance = 0;
let transactions = [];

function addTransaction(event) {
  event.preventDefault();
  const amountInput = document.getElementById('transaction-amount');
  const descriptionInput = document.getElementById('transaction-description');
  const amount = parseFloat(amountInput.value);
  const description = descriptionInput.value;
  const transaction = { amount, description };
  transactions.push(transaction);
  updateTransactions();
  updateBalance();
  amountInput.value = '';
  descriptionInput.value = '';
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
  balanceAmount.textContent = 'R$' + balance.toFixed(2);
  if (balance < 0) {
    balanceAmount.style.color = 'red';
  } else {
    balanceAmount.style.color = 'black';
  }
}

addTransactionForm.addEventListener('submit', addTransaction);
