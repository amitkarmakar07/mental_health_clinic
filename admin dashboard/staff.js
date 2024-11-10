// Sample staff data
const staffData = [
    { name: "John Doe", role: "Nurse", age: 30, salary: 40000 },
    { name: "Jane Smith", role: "Receptionist", age: 25, salary: 30000 },
    { name: "Mark Taylor", role: "Security", age: 45, salary: 35000 },
    // Add more staff as needed
];

// Render staff list
function renderStaffList() {
    const staffList = document.getElementById('staff-list');
    staffList.innerHTML = ''; // Clear existing staff

    staffData.forEach((staff, index) => {
        const staffCard = document.createElement('div');
        staffCard.classList.add('card');
        staffCard.innerHTML = `
            <img src="profile.png" alt="${staff.name}">
            <div class="staff-name">${staff.name}</div>
            <p>Role: ${staff.role}</p>
            <p>Age: ${staff.age}</p>
            <p>Salary: $${staff.salary}</p>
            <button class="edit-btn" onclick="editStaff(${index})">Edit</button>
        `;
        staffList.appendChild(staffCard);
    });
}

// Open edit modal and populate fields
function editStaff(index) {
    const staff = staffData[index];
    document.getElementById('staff-name').value = staff.name;
    document.getElementById('staff-role').value = staff.role;
    document.getElementById('staff-age').value = staff.age;
    document.getElementById('staff-salary').value = staff.salary;
    document.getElementById('edit-staff-index').value = index;

    document.getElementById('edit-modal').style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Handle form submission
document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const index = document.getElementById('edit-staff-index').value;
    const updatedStaff = {
        name: document.getElementById('staff-name').value,
        role: document.getElementById('staff-role').value,
        age: parseInt(document.getElementById('staff-age').value),
        salary: parseInt(document.getElementById('staff-salary').value)
    };

    staffData[index] = updatedStaff; // Update the staff data
    renderStaffList(); // Re-render the staff list with updated data
    closeModal(); // Close the modal
});

// Initial rendering
renderStaffList();
