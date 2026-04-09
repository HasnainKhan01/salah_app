navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    const data = await response.json();

    const timings = data.data.timings;
    const date = data.data.date.readable;
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    document.getElementById('date').textContent = date;

    const container = document.getElementById('prayer-times');

    prayers.forEach(prayer => {
        const card = document.createElement('div');
        card.classList.add('prayer-card');
        card.innerHTML = `
            <span class="prayer-name">${prayer}</span>
            <span class="prayer-time">${timings[prayer]}</span>
        `;
        container.appendChild(card);
    });
});