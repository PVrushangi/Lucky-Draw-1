async function fetchHistory() {
    const response = await fetch("http://localhost:5000/api/history");
    const data = await response.json();
    const tableBody = document.getElementById("history");
    tableBody.innerHTML = "";
    
    data.forEach(entry => {
        let row = `<tr><td>${entry.number}</td><td>${entry.date}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

async function updateNumbers() {
    const response = await fetch("http://localhost:5000/api/generate", { method: "POST" });
    const data = await response.json();

    document.getElementById("num1").innerText = data.num1;
    document.getElementById("num2").innerText = data.num2;

    fetchHistory();
}

// Auto-refresh at 4PM daily
function scheduleDraw() {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(16, 0, 0, 0);
    
    if (now >= targetTime) targetTime.setDate(targetTime.getDate() + 1);
    
    const timeUntilDraw = targetTime - now;
    setTimeout(() => {
        updateNumbers();
        setInterval(updateNumbers, 24 * 60 * 60 * 1000);
    }, timeUntilDraw);
}

// Initialize
fetchHistory();
scheduleDraw();
