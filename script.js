// 1. Инициализация на графиката
const ctx = document.getElementById('airChart').getContext('2d');
let airChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:00'], // Времеви интервали
        datasets: [{
            label: 'Air Pollution Level',
            data: [150, 200, 450, 300, 280, 600, 200], // Примерни исторически данни
            borderColor: '#00ff88',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(0, 255, 136, 0.1)'
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { 
                grid: { color: '#333' },
                ticks: { color: '#888' }
            },
            x: { 
                grid: { color: '#333' },
                ticks: { color: '#888' }
            }
        }
    }
});

// 2. Функция за промяна на дизайна спрямо данните
function updateUI(mq135, mq6) {
    const statusText = document.getElementById('status-text');
    const mainOrb = document.getElementById('main-orb');
    const mq135Val = document.getElementById('mq135-val');
    const mq6Val = document.getElementById('mq6-val');
    
    // Обновяваме цифрите
    mq135Val.innerText = mq135;
    mq6Val.innerText = mq6;

    let color, label, icon;

    // Логика за качеството (адаптирана за MQ сензори)
    if (mq135 > 600 || mq6 > 400) {
        color = "#ff4444"; // Червено
        label = "POOR / DANGER";
        icon = "😷";
    } else if (mq135 > 300 || mq6 > 200) {
        color = "#ffcc00"; // Жълто
        label = "MODERATE";
        icon = "⚠️";
    } else {
        color = "#00ff88"; // Зелено
        label = "GOOD";
        icon = "🍃";
    }

    // Прилагаме цветовете към твоя дизайн
    statusText.innerText = label;
    statusText.style.color = color;
    mainOrb.style.borderColor = color;
    mainOrb.style.boxShadow = `0 0 20px ${color}44`; // Добавя лек сияен ефект
    document.querySelector('.status-icon').innerText = icon;
    
    // Променяме цвета на стойностите в картите
    mq135Val.style.color = color;
    mq6Val.style.color = color;
}

// 3. СИМУЛАЦИЯ (Замени това с твоя fetch код от get_data.php)
setInterval(() => {
    // Тук симулираме промяна на данните от сензорите
    let rawMQ135 = Math.floor(Math.random() * 800);
    let rawMQ6 = Math.floor(Math.random() * 500);
    
    updateUI(rawMQ135, rawMQ6);
}, 3000);