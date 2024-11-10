document.addEventListener('DOMContentLoaded', function() {
    // Fetch profile details from local storage (simulating saved profile data)
    const doctorName = localStorage.getItem('doctorName') || 'Koustav Podder';
    const doctorEmail = localStorage.getItem('doctorEmail') || 'koustav.podder@example.com';
    const doctorPhone = localStorage.getItem('doctorPhone') || '+1234567890';
    const doctorSpecialization = localStorage.getItem('doctorSpecialization') || 'Mental Health';
    const doctorExperience = localStorage.getItem('doctorExperience') || '10 years';
    const doctorQualifications = localStorage.getItem('doctorQualifications') || 'MBBS, MD';

    // Update profile name in the header
    document.getElementById('profile-name').textContent = doctorName;

    // Get the modal and elements to display profile details
    var modal = document.getElementById("profile-modal");
    var profilePic = document.getElementById("profile-pic");
    var closeButton = document.getElementById("close-button");

    // Display profile details in the modal
    document.getElementById('modal-doctor-name').textContent = doctorName;
    document.getElementById('modal-doctor-email').textContent = doctorEmail;
    document.getElementById('modal-doctor-phone').textContent = doctorPhone;
    document.getElementById('modal-doctor-specialization').textContent = doctorSpecialization;
    document.getElementById('modal-doctor-experience').textContent = doctorExperience;
    document.getElementById('modal-doctor-qualifications').textContent = doctorQualifications;

    // When the user clicks on the profile picture, open the modal
    profilePic.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});