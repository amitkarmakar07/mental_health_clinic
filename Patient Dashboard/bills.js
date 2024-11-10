document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded, displaying bills...");
    loadBills(); // Load previously generated bills
});

// Display the list of generated bills
function loadBills() {
    const billsContainer = document.getElementById("bills-container");
    billsContainer.innerHTML = ""; // Clear previous bills

    // Retrieve bills from local storage
    const bills = JSON.parse(localStorage.getItem("generatedBills")) || [];

    if (bills.length === 0) {
        billsContainer.innerHTML = "<p>No bills available.</p>";
        return;
    }

    bills.forEach((bill) => {
        const billElement = document.createElement("div");
        billElement.classList.add("bill");
        billElement.innerHTML = `
            <p><strong>Patient:</strong> ${bill.patientName}</p>
            <p><strong>Mobile:</strong> ${bill.mobile}</p>
            <p><strong>Visit Date:</strong> ${bill.visitDate}</p>
            <p><strong>Billing Amount:</strong> $${bill.billingAmount}</p>
            <p><strong>Bill Date:</strong> ${bill.billDate}</p>
            <button class="download-btn" onclick="generatePDF('${bill.patientName}', '${bill.mobile}', '${bill.visitDate}', '${bill.billingAmount}', '${bill.billDate}')">Download PDF</button>
        `;
        billsContainer.appendChild(billElement);
    });
}

// Function to generate the PDF
function generatePDF(patientName, mobile, visitDate, billingAmount, billDate) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Mental Health Care System - Bill", 20, 20);

    // Bill Details
    doc.setFontSize(12);
    doc.text(`Patient: ${patientName}`, 20, 30);
    doc.text(`Mobile: ${mobile}`, 20, 40);
    doc.text(`Visit Date: ${visitDate}`, 20, 50);
    doc.text(`Billing Amount: $${billingAmount}`, 20, 60);
    doc.text(`Bill Date: ${billDate}`, 20, 70);

    // Save the PDF
    doc.save(`${patientName}_bill.pdf`);
}
