document.querySelectorAll('.side-panel ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        document.querySelectorAll('.main-content section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(targetId).classList.add('active');
    });
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    window.location.href = 'index.html';
});
