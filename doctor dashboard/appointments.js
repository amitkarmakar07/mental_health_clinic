document.addEventListener("DOMContentLoaded", () => {
    loadConfirmedAppointments();
});

function loadConfirmedAppointments() {
    const doctorAppointmentContainer = document.getElementById("doctor-appointment-container");
    doctorAppointmentContainer.innerHTML = ""; 

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Filter appointments by "Confirmed" status
    const confirmedAppointments = appointments.filter(appointment => appointment.status === "Confirmed");

    if (confirmedAppointments.length === 0) {
        doctorAppointmentContainer.innerHTML = "<p>No confirmed appointments found.</p>";
        return;
    }

    confirmedAppointments.forEach(appointment => {
        const appointmentCard = document.createElement("div");
        appointmentCard.classList.add("appointment");
        appointmentCard.innerHTML = `
            <strong>Patient:</strong> ${appointment.name || "N/A"}<br>
            <strong>Time:</strong> ${appointment.time || "N/A"}<br>
            <strong>Day:</strong> ${appointment.day || "N/A"}<br>
            <strong>Description:</strong> ${appointment.description || "N/A"}<br>
            <p><strong>Status:</strong> <span class="status">${appointment.status}</span></p>
        `;
        doctorAppointmentContainer.appendChild(appointmentCard);
    });
}
