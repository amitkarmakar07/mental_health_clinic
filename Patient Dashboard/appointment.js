// Load appointments and display on page
document.addEventListener("DOMContentLoaded", () => {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const appointmentList = document.getElementById("appointment-list");

    // Check if there are any appointments
    if (appointments.length === 0) {
        appointmentList.innerHTML = "<p>No appointments found. Please book an appointment.</p>";
    } else {
        // Display each appointment
        appointments.forEach((appointment, index) => {
            const appointmentStatus = appointment.status || "Pending"; // Default to "Pending" if status is missing
            const doctorName = appointment.doctorName || "undefined";
            const fees = appointment.fees !== undefined ? `$${appointment.fees}` : "undefined";

            const appointmentCard = document.createElement("div");
            appointmentCard.className = "card";
            appointmentCard.innerHTML = `
                <h3>Appointment ${index + 1}</h3>
                <p><strong>Name:</strong> ${appointment.name || "undefined"}</p>
                <p><strong>Mobile:</strong> ${appointment.mobile || "undefined"}</p>
                <p><strong>Disease:</strong> ${appointment.disease || "undefined"}</p>
                <p><strong>Day:</strong> ${appointment.day || "undefined"}</p>
                <p><strong>Time Slot:</strong> ${appointment.time || "undefined"}</p>
                <p><strong>Description:</strong> ${appointment.description || "undefined"}</p>
                <p><strong>Doctor:</strong> ${doctorName}</p>
                <p><strong>Fees:</strong> ${fees}</p>
                <p><strong>Status:</strong> <span class="status">${appointmentStatus}</span></p> <!-- Display status -->
            `;
            appointmentList.appendChild(appointmentCard);
        });
    }
});

// Function to handle booking an appointment
function bookAppointment(doctor) {
    // Show the modal
    const modal = document.getElementById("appointmentModal");
    modal.style.display = "block";

    // Handle form submission
    document.getElementById("appointment-form").onsubmit = function(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById("patient-name").value;
        const mobile = document.getElementById("mobile-number").value;
        const disease = document.getElementById("disease").value;
        const day = document.getElementById("appointment-day").value;
        const timeSlot = document.getElementById("time-slot").value;
        const description = document.getElementById("description").value;

        // Create appointment object with default status "Pending"
        const appointment = {
            name,
            mobile,
            disease,
            day,
            timeSlot,
            description,
            doctorName: doctor?.name || "undefined",
            fees: doctor?.fees || "undefined",
            status: "Pending" // Set default status to "Pending"
        };

        // Save appointment to localStorage
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Booking Successful!");

        // Close modal
        modal.style.display = "none";

        // Redirect to appointment list page
        window.location.href = "appointment.html";
    };
}
