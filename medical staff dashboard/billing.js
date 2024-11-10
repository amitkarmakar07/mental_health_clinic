document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded, initializing billing...");
    loadVisitedAppointments();  // Load patients with status "Visited" only
    loadBills();  // Load previously generated bills
});

// Load visited patients for billing
function loadVisitedAppointments() {
    const patientSelect = document.getElementById("patient-select");
    patientSelect.innerHTML = ""; // Clear previous options

    // Load appointments from local storage and filter by "Visited" status
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const visitedAppointments = appointments.filter(appointment => appointment.status === "Visited");
    console.log("Loaded visited appointments:", visitedAppointments);

    visitedAppointments.forEach((appointment) => {
        const option = document.createElement("option");
        option.value = appointment.id;
        option.textContent = `${appointment.name} - Visit Date: ${appointment.time || "N/A"}`;
        patientSelect.appendChild(option);
    });
}

// Generate a new bill and save it to local storage
function generateBill() {
    const patientId = document.getElementById("patient-select").value;
    const billingAmount = document.getElementById("billing-amount").value;

    if (!patientId || !billingAmount) {
        alert("Please select a patient and enter a billing amount.");
        return;
    }

    // Retrieve selected patient information
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const selectedPatient = appointments.find(p => p.id == patientId);

    const bill = {
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        visitDate: selectedPatient.date,
        mobile: selectedPatient.mobile,
        billingAmount: billingAmount,
        billDate: new Date().toLocaleDateString()
    };

    // Save the generated bill in local storage
    const bills = JSON.parse(localStorage.getItem("generatedBills")) || [];
    bills.push(bill);
    localStorage.setItem("generatedBills", JSON.stringify(bills));

    document.getElementById("billing-amount").value = ""; // Clear input
    loadBills(); // Reload the list of bills
}

// Display the list of generated bills
function loadBills() {
    const billsContainer = document.getElementById("bills-container");
    billsContainer.innerHTML = ""; // Clear previous bills

    const bills = JSON.parse(localStorage.getItem("generatedBills")) || [];

    bills.forEach((bill) => {
        const billElement = document.createElement("div");
        billElement.classList.add("bill");
        billElement.innerHTML = `
            <p><strong>Patient:</strong> ${bill.patientName}</p>
            <p><strong>Mobile:</strong> ${bill.mobile}</p>
            <p><strong>Visit Date:</strong> ${bill.visitDate}</p>
            <p><strong>Billing Amount:</strong> $${bill.billingAmount}</p>
            <p><strong>Bill Date:</strong> ${bill.billDate}</p>
        `;
        billsContainer.appendChild(billElement);
    });
}
