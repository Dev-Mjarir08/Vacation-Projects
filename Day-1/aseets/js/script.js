// =======================
// Student Management System
// =======================

let studentForm = document.getElementById("studentForm");
let studentName = document.getElementById("studentName");
let studentAge = document.getElementById("studentAge");
let studentClass = document.getElementById("studentClass");
let studentTableBody = document.getElementById("studentTableBody");
let editIndex = document.getElementById("editIndex");
let submitBtn = document.getElementById("submitBtn");

// Load existing students
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display initially
displayStudents();

// ------------- Form Submit -------------
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validation
    if (!studentName.value.trim()) return alert("Enter Name");
    if (!studentAge.value.trim() || studentAge.value <= 0) return alert("Enter Valid Age");
    if (!studentClass.value.trim()) return alert("Enter Class");

    let studentObj = {
        name: studentName.value,
        age: studentAge.value,
        class: studentClass.value,
    };

    // Edit Mode
    if (editIndex.value) {
        students[editIndex.value] = studentObj;
        submitBtn.innerText = "Add Student";
    }
    // Add Mode
    else {
        students.push(studentObj);
    }

    // Save to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Reset
    studentForm.reset();
    editIndex.value = "";

    displayStudents();
});

// ------------- Display Students -------------
function displayStudents() {
    studentTableBody.innerHTML = "";

    students.forEach((student, index) => {
        studentTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.class}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ------------- Edit Student -------------
function editStudent(index) {
    let student = students[index];

    studentName.value = student.name;
    studentAge.value = student.age;
    studentClass.value = student.class;

    editIndex.value = index;
    submitBtn.innerText = "Update Student";
}

// ------------- Delete Student -------------
function deleteStudent(index) {
    if (confirm("Are you sure?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}
