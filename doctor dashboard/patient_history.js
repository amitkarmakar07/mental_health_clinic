document.addEventListener("DOMContentLoaded", () => {
    loadVisitedPatients();
});

function loadVisitedPatients() {
    const patientListContainer = document.getElementById("patient-list");
    patientListContainer.innerHTML = "";

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const visitedPatients = appointments.filter(appointment => appointment.status === "Visited");

    if (visitedPatients.length === 0) {
        patientListContainer.innerHTML = "<p>No visited patients found.</p>";
        return;
    }

    visitedPatients.forEach(patient => {
        const patientItem = document.createElement("div");
        patientItem.classList.add("patient-item");
        patientItem.innerHTML = `
            <h3>${patient.name || "N/A"}</h3>
            <p>Last Visit: ${patient.day || "N/A"}</p>
        `;
        patientItem.addEventListener("click", () => showPatientDetails(patient));
        patientListContainer.appendChild(patientItem);
    });
}

function showPatientDetails(patient) {
    document.getElementById("patient-name").textContent = patient.name || "N/A";
    document.getElementById("patient-mobile").textContent = patient.mobile || "N/A";
    document.getElementById("patient-disease").textContent = patient.disease || "N/A";
    document.getElementById("patient-description").textContent = patient.description || "N/A";
    document.getElementById("doctor-name").textContent = patient.doctorName || "N/A";
}
