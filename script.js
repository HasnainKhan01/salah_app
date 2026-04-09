navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    const data = await response.json();

    const timings = data.data.timings;
    const date = data.data.date.readable;
    const hijri = data.data.date.hijri;
    const hijriDate = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    document.getElementById('date').textContent = `${date} · ${hijriDate}`;

    const container = document.getElementById('prayer-times');

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
    }

    const prayerMinutes = prayers.map(prayer => timeToMinutes(timings[prayer]));

    let currentPrayerIndex = -1;
    for (let i = prayerMinutes.length - 1; i >= 0; i--) {
        if (currentMinutes >= prayerMinutes[i]) {
            currentPrayerIndex = i;
            break;
        }
    }

    prayers.forEach((prayer, index) => {
        const card = document.createElement('div');
        card.classList.add('prayer-card');
        if (index === currentPrayerIndex) card.classList.add('active');
        card.innerHTML = `
            <span class="prayer-name">${prayer}</span>
            <span class="prayer-time">${timings[prayer]}</span>
        `;
        container.appendChild(card);
    });
});