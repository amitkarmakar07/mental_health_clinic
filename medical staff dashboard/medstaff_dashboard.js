// Script for potential interactivity

// Example of handling search input
document.querySelector('.header input[type="text"]').addEventListener('input', function (event) {
    let query = event.target.value.toLowerCase();
    let appointments = document.querySelectorAll('.appointment');

    appointments.forEach(appointment => {
        let name = appointment.querySelector('strong').textContent.toLowerCase();
        if (name.includes(query)) {
            appointment.style.display = 'block';
        } else {
            appointment.style.display = 'none';
        }
    });
});
