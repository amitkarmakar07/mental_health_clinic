document.addEventListener("DOMContentLoaded", () => {
    loadVisitedAppointments();
});

// Function to load and display appointments with status "Visited"
function loadVisitedAppointments() {
    const historyContainer = document.getElementById("history-container");
    historyContainer.innerHTML = ""; // Clear previous content

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const visitedAppointments = appointments.filter(appointment => appointment.status === "Visited");

    // Display message if no visited appointments are found
    if (visitedAppointments.length === 0) {
        historyContainer.innerHTML = "<p>No visited appointments found.</p>";
        return;
    }

    // Render each visited appointment with only selected details
    visitedAppointments.forEach(appointment => {
        const appointmentCard = document.createElement("div");
        appointmentCard.classList.add("history-item");
        appointmentCard.innerHTML = `
            <h3>Patient: ${appointment.name || "N/A"}</h3>
            <p><strong>Mobile:</strong> ${appointment.mobile || "N/A"}</p>
            <p><strong>Disease/Concern:</strong> ${appointment.disease || "N/A"}</p>
            <p><strong>Description:</strong> ${appointment.description || "N/A"}</p>
            <p><strong>Doctor:</strong> ${appointment.doctorName || "N/A"}</p>
        `;
        historyContainer.appendChild(appointmentCard);
    });
}
