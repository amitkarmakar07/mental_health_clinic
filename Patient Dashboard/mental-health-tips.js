document.addEventListener("DOMContentLoaded", () => {
    loadTips();
});

// Load tips from local storage and display them
function loadTips() {
    const tipsContainer = document.getElementById("tips-container");
    tipsContainer.innerHTML = ""; // Clear existing tips

    // Get tips from local storage
    const tips = JSON.parse(localStorage.getItem("mentalHealthTips")) || [];

    tips.forEach((tip) => {
        const tipElement = document.createElement("div");
        tipElement.classList.add("tip");
        tipElement.textContent = tip.content; // Fetching tip content
        tipsContainer.appendChild(tipElement);
    });
}
