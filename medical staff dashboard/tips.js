document.addEventListener("DOMContentLoaded", () => {
    loadTips();
});

// Load tips from local storage and display them
function loadTips() {
    const tipsContainer = document.getElementById("tips-container");
    tipsContainer.innerHTML = ""; // Clear existing tips

    // Get tips from local storage
    const tips = JSON.parse(localStorage.getItem("mentalHealthTips")) || [];

    tips.forEach((tip, index) => {
        const tipElement = document.createElement("div");
        tipElement.classList.add("tip");
        tipElement.innerHTML = `
            <p>${tip.content}</p>
            <button onclick="editTip(${index})">Edit</button>
            <button onclick="deleteTip(${index})">Delete</button>
        `;
        tipsContainer.appendChild(tipElement);
    });
}

// Add a new tip
function addTip() {
    const tipContent = document.getElementById("tip-content").value;
    if (!tipContent) {
        alert("Please enter a tip before adding.");
        return;
    }

    const tips = JSON.parse(localStorage.getItem("mentalHealthTips")) || [];
    tips.push({ content: tipContent });
    localStorage.setItem("mentalHealthTips", JSON.stringify(tips));

    document.getElementById("tip-content").value = ""; // Clear input
    loadTips(); // Reload the list of tips
}

// Edit an existing tip
function editTip(index) {
    const tips = JSON.parse(localStorage.getItem("mentalHealthTips")) || [];
    const newContent = prompt("Edit the tip:", tips[index].content);
    if (newContent !== null) {
        tips[index].content = newContent;
        localStorage.setItem("mentalHealthTips", JSON.stringify(tips));
        loadTips();
    }
}

// Delete a tip
function deleteTip(index) {
    const tips = JSON.parse(localStorage.getItem("mentalHealthTips")) || [];
    tips.splice(index, 1); // Remove the tip from the array
    localStorage.setItem("mentalHealthTips", JSON.stringify(tips));
    loadTips(); // Reload the list of tips
}
