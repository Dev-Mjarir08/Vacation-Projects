// ==========================
// Expense Tracker Project
// ==========================

let expenseForm = document.getElementById("expenseForm");
let desc = document.getElementById("desc");
let amount = document.getElementById("amount");
let expenseTableBody = document.getElementById("expenseTableBody");
let totalAmount = document.getElementById("totalAmount");
let editIndex = document.getElementById("editIndex");
let submitBtn = document.getElementById("submitBtn");

// Load from LocalStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display initially
displayExpenses();
calculateTotal();

// ----------------- FORM SUBMIT -----------------
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validation
    if (!desc.value.trim()) return alert("Enter description!");
    if (!amount.value.trim() || amount.value <= 0) return alert("Enter valid amount!");

    let expenseObj = {
        description: desc.value,
        amount: Number(amount.value)
    };

    // Editing mode
    if (editIndex.value) {
        expenses[editIndex.value] = expenseObj;
        submitBtn.innerText = "Add Expense";
    }
    // Add mode
    else {
        expenses.push(expenseObj);
    }

    // Save to LocalStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Reset form
    expenseForm.reset();
    editIndex.value = "";

    displayExpenses();
    calculateTotal();
});

// ----------------- DISPLAY EXPENSES -----------------
function displayExpenses() {
    expenseTableBody.innerHTML = "";

    expenses.forEach((ex, index) => {
        expenseTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${ex.description}</td>
                <td>₹ ${ex.amount}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ----------------- EDIT EXPENSE -----------------
function editExpense(index) {
    let ex = expenses[index];

    desc.value = ex.description;
    amount.value = ex.amount;

    editIndex.value = index;
    submitBtn.innerText = "Update Expense";
}

// ----------------- DELETE EXPENSE -----------------
function deleteExpense(index) {
    if (confirm("Delete this expense?")) {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        displayExpenses();
        calculateTotal();
    }
}

// ----------------- CALCULATE TOTAL -----------------
function calculateTotal() {
    let total = expenses.reduce((sum, ex) => sum + ex.amount, 0);
    totalAmount.innerText = total;
}
