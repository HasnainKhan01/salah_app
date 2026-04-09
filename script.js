navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`);
    const data = await response.json();

    const timings = data.data.timings;
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    const container = document.getElementById('prayer-times');

    prayers.forEach(prayer => {
        const div = document.createElement('div');
        div.textContent = `${prayer}: ${timings[prayer]}`;
        container.appendChild(div);
    });
});