function setUserRole(role) {
    document.getElementById('username').value = role; // Auto-fill username with the role
}

function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "admin dashboard/admin.html";
    } else if (username === "patient" && password === "patient123") {
        window.location.href = "Patient Dashboard/patient-home.html";
    } else if (username === "doctor" && password === "doctor123") {
        window.location.href = "doctor dashboard/doctor.html";
    } else if (username === "staff" && password === "staff123") {
        window.location.href = "medical staff dashboard/medstaff_dashboard.html";
    } else {
        alert("Invalid Username or Password");
    }

    return false; // Prevent default form submission
}
