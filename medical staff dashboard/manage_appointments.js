document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded, initializing...");
    loadAppointments();
    document.getElementById("search-input").addEventListener("input", filterAppointments);
});

// Load appointments from local storage and render them in the container
function loadAppointments() {
    const appointmentContainer = document.getElementById("appointment-container");
    appointmentContainer.innerHTML = "";

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    console.log("Loaded appointments:", appointments);

    appointments.forEach((appointment, index) => {
        if (!appointment.id) {
            appointment.id = Date.now().toString() + index; // Create a unique ID for each appointment
        }

        console.log("Rendering appointment:", appointment);

        const appointmentCard = document.createElement("div");
        appointmentCard.classList.add("appointment");
        appointmentCard.innerHTML = `
            <strong>Patient: ${appointment.name || "undefined"}</strong> - ${appointment.time || "undefined"}<br>
            <p><strong>Status:</strong> <span class="status">${appointment.status || "Pending"}</span></p>
            ${
                appointment.status === "Pending" 
                ? `<button class="confirm" onclick="updateAppointmentStatus('${appointment.id}', 'Confirmed')">Confirm</button>
                   <button class="reject" onclick="updateAppointmentStatus('${appointment.id}', 'Rejected')">Reject</button>`
                : appointment.status === "Confirmed"
                ? `<button class="visited" onclick="updateAppointmentStatus('${appointment.id}', 'Visited')">Mark as Visited</button>`
                : ''
            }
        `;
        appointmentContainer.appendChild(appointmentCard);
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));
}

// Update appointment status in local storage
function updateAppointmentStatus(id, newStatus) {
    console.log(`Updating appointment ${id} to status ${newStatus}`);
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const updatedAppointments = appointments.map(appointment => {
        if (appointment.id === id) {
            console.log(`Found appointment to update:`, appointment);
            return { ...appointment, status: newStatus };
        }
        return appointment;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    loadAppointments(); 
}

// Filter appointments based on search input
function filterAppointments() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const appointments = document.querySelectorAll('.appointment');

    appointments.forEach(appointment => {
        const name = appointment.querySelector('strong').textContent.toLowerCase();
        if (name.includes(query)) {
            appointment.style.display = 'block';
        } else {
            appointment.style.display = 'none';
        }
    });
}
