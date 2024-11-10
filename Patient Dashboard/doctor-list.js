// doctor-list.js

document.addEventListener('DOMContentLoaded', function () {
    const doctors = [
        { name: "Dr.Koustav", specialization: "Psychiatrist", days: ["Monday", "Wednesday", "Friday"], fees: 500 },
        { name: "Dr. Alice Smith", specialization: "Therapist", days: ["Tuesday", "Thursday", "Saturday"], fees: 400 },
        { name: "Dr. David Lee", specialization: "Counselor", days: ["Monday", "Thursday", "Saturday"], fees: 300 },
        { name: "Dr. Mary Johnson", specialization: "Clinical Psychologist", days: ["Tuesday", "Friday"], fees: 450 },
        { name: "Dr. Richard Brown", specialization: "Psychiatrist", days: ["Wednesday", "Saturday"], fees: 550 },
        { name: "Dr. Emily Clark", specialization: "Therapist", days: ["Monday", "Thursday"], fees: 350 }
    ];

    const doctorListContainer = document.getElementById('doctor-list');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');
    let selectedDoctorName = '';

    function renderDoctors() {
        doctorListContainer.innerHTML = ''; // Clear any existing content
        doctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctor-card');
            doctorCard.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Specialty: ${doctor.specialization}</p>
                <p>Visiting Days: ${doctor.days.join(', ')}</p>
                <p>Fees: $${doctor.fees}</p>
                <button class="book-btn" data-name="${doctor.name}">Book Appointment</button>
            `;
            doctorListContainer.appendChild(doctorCard);
        });

        // Attach event listeners to all 'Book Appointment' buttons
        const bookButtons = document.querySelectorAll('.book-btn');
        bookButtons.forEach(button => {
            button.addEventListener('click', openBookingModal);
        });
    }

    function openBookingModal(event) {
        selectedDoctorName = event.target.getAttribute('data-name'); // Store selected doctor name
        document.getElementById('day').innerHTML = ''; // Clear existing options
        const selectedDoctor = doctors.find(doc => doc.name === selectedDoctorName);
        
        // Populate the day options based on selected doctor's available days
        selectedDoctor.days.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            document.getElementById('day').appendChild(option);
        });
        bookingModal.style.display = 'block';
    }

    closeModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    document.getElementById('submitAppointment').addEventListener('click', function () {
        // Collect appointment details from the form
        const appointmentDetails = {
            doctorName: selectedDoctorName,
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            disease: document.getElementById('disease').value,
            day: document.getElementById('day').value,
            time: document.getElementById('time').value,
            description: document.getElementById('description').value,
            status: 'Pending' // Initialize status as 'Pending'
        };

        // Save the appointment in localStorage
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointmentDetails);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert('Booking Successful! Your appointment has been stored with a "Pending" status.');
        bookingModal.style.display = 'none';
    });

    renderDoctors();
});
