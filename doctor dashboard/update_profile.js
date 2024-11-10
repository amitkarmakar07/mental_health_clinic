document.addEventListener('DOMContentLoaded', function() {
    // Pre-fill form with current profile details from local storage
    document.getElementById('name').value = localStorage.getItem('doctorName') || 'Koustav Podder';
    document.getElementById('email').value = localStorage.getItem('doctorEmail') || 'koustav.podder@example.com';
    document.getElementById('phone').value = localStorage.getItem('doctorPhone') || '+1234567890';
    document.getElementById('specialization').value = localStorage.getItem('doctorSpecialization') || 'Mental Health';
    document.getElementById('experience').value = localStorage.getItem('doctorExperience') || '10';
    document.getElementById('qualifications').value = localStorage.getItem('doctorQualifications') || 'MBBS, MD';

    // Handle form submission
    document.getElementById('update-profile-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get updated profile details from the form
        const updatedName = document.getElementById('name').value;
        const updatedEmail = document.getElementById('email').value;
        const updatedPhone = document.getElementById('phone').value;
        const updatedSpecialization = document.getElementById('specialization').value;
        const updatedExperience = document.getElementById('experience').value;
        const updatedQualifications = document.getElementById('qualifications').value;

        // Save the updated profile details to local storage
        localStorage.setItem('doctorName', updatedName);
        localStorage.setItem('doctorEmail', updatedEmail);
        localStorage.setItem('doctorPhone', updatedPhone);
        localStorage.setItem('doctorSpecialization', updatedSpecialization);
        localStorage.setItem('doctorExperience', updatedExperience + ' years');
        localStorage.setItem('doctorQualifications', updatedQualifications);

        // Redirect back to the dashboard or display a success message
        alert('Profile updated successfully!');
        window.location.href = 'doctor.html';
    });
});