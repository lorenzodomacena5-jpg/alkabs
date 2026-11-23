let students = [];
let editIndex = -1;

function addStudent() {
    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("studentName").value.trim();
    let course = document.getElementById("course").value.trim();
    let year = document.getElementById("year").value;

    if (!id || !name || !course || !year) {
        alert("Please complete all fields!");
        return;
    }

    if (!Number.isInteger(Number(year)) || Number(year) < 1 || Number(year) > 6) {
        alert("Please enter a valid year level!");
        return;
    }

    if (students.some((student, index) =>
        student.id === id && index !== editIndex)) {
        alert("Student ID already exists!");
        return;
    }

    let student = { id, name, course, year };

    if (editIndex === -1) {
        students.push(student);
        alert("Student added successfully!");
    } else {
        students[editIndex] = student;
        editIndex = -1;
        document.getElementById("addBtn").textContent = "Add Student";
        alert("Student updated successfully!");
    }

    clearFields();
    displayStudents();
}

function displayStudents(data = students) {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    data.forEach(student => {
        let index = students.indexOf(student);
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.year}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(index) {
    let student = students[index];
    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("year").value = student.year;

    editIndex = index;
    document.getElementById("addBtn").textContent = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            clearFields();
            document.getElementById("addBtn").textContent = "Add Student";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayStudents();
    }
}

function searchStudent() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let filtered = students.filter(student =>
        student.id.toLowerCase().includes(search) ||
        student.name.toLowerCase().includes(search) ||
        student.course.toLowerCase().includes(search)
    );
    displayStudents(filtered);
}

function clearFields() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("course").value = "";
    document.getElementById("year").value = "";
}
