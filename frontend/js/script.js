async function fetchNumbers() {
    const response = await fetch('http://localhost:5000/api/draws');
    const data = await response.json();
    
    if (data.length > 0) {
        document.getElementById('num1').innerText = data[0].number || "--";
        document.getElementById('num2').innerText = data[1]?.number || "--";
        updateTable(data);
    }
}

function updateTable(history) {
    const tableBody = document.getElementById('history');
    tableBody.innerHTML = '';
    history.forEach(entry => {
        let row = `<tr><td>${entry.number}</td><td>${new Date(entry.date).toLocaleDateString()}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Fetch data every 4PM
fetchNumbers();
setInterval(fetchNumbers, 24 * 60 * 60 * 1000);
