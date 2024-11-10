document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('doctors')) {
        initializeDoctors();
    }
    loadDoctors();
});

// Initialize localStorage with default doctors
function initializeDoctors() {
    const defaultDoctors = [
        { name: "Dr. John Smith", age: 45, specialist: "Psychiatrist", salary: 120000 },
        { name: "Dr. Emily Jones", age: 38, specialist: "Psychologist", salary: 115000 },
        { name: "Dr. Michael Brown", age: 50, specialist: "Forensic psychiatrist", salary: 130000 },
        { name: "Dr. Sarah Wilson", age: 42, specialist: "Neuropsychiatrist", salary: 110000 },
        { name: "Dr. Linda Martinez", age: 40, specialist: "Psychologist", salary: 125000 },
        { name: "Dr. James Lee", age: 36, specialist: "Psychologist", salary: 105000 }
    ];
    localStorage.setItem('doctors', JSON.stringify(defaultDoctors));
}

// Function to search doctors by name
function searchDoctors() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    Array.from(cards).forEach(card => {
        const name = card.querySelector('.doctor-name').textContent.toLowerCase();
        if (name.includes(searchInput)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to open the edit modal
function editDoctor(button) {
    const card = button.closest('.card');
    document.getElementById('doctor-name').value = card.querySelector('.doctor-name').textContent;
    document.getElementById('doctor-age').value = card.querySelector('.doctor-age').textContent;
    document.getElementById('doctor-specialist').value = card.querySelector('.doctor-specialist').textContent;
    document.getElementById('doctor-salary').value = card.querySelector('.doctor-salary').textContent;

    // Store the card index for updating later
    document.getElementById('edit-doctor-index').value = Array.from(card.parentNode.children).indexOf(card);

    // Display the modal
    document.getElementById('edit-modal').style.display = 'flex';
}

// Function to close the edit modal
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Handle form submission to save changes
document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const index = document.getElementById('edit-doctor-index').value;
    const card = document.querySelectorAll('.card')[index];
    
    card.querySelector('.doctor-name').textContent = document.getElementById('doctor-name').value;
    card.querySelector('.doctor-age').textContent = document.getElementById('doctor-age').value;
    card.querySelector('.doctor-specialist').textContent = document.getElementById('doctor-specialist').value;
    card.querySelector('.doctor-salary').textContent = document.getElementById('doctor-salary').value;

    // Save the updated data to localStorage
    saveDoctors();

    // Close the modal
    closeModal();
});

// Function to save all doctor data to localStorage
function saveDoctors() {
    const cards = document.querySelectorAll('.card');
    const doctors = Array.from(cards).map(card => ({
        name: card.querySelector('.doctor-name').textContent,
        age: card.querySelector('.doctor-age').textContent,
        specialist: card.querySelector('.doctor-specialist').textContent,
        salary: card.querySelector('.doctor-salary').textContent
    }));
    localStorage.setItem('doctors', JSON.stringify(doctors));
}

// Function to load doctor data from localStorage and populate the page
function loadDoctors() {
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

    const container = document.getElementById('doctor-list');
    container.innerHTML = '';

    doctors.forEach((doctor, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="doctor-icon.png" alt="Doctor Icon" class="doctor-icon">
            <h2 class="doctor-name">${doctor.name}</h2>
            <p><strong>Age:</strong> <span class="doctor-age">${doctor.age}</span></p>
            <p><strong>Specialist:</strong> <span class="doctor-specialist">${doctor.specialist}</span></p>
            <p><strong>Salary:</strong> $<span class="doctor-salary">${doctor.salary}</span></p>
            <button class="edit-btn" onclick="editDoctor(this)">Edit Profile</button>
        `;
        container.appendChild(card);
    });
}
