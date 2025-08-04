function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-IN', { hour12: true });
  const dateString = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  document.getElementById('datetime').textContent = timeString;
  document.getElementById('date').textContent = dateString;
}

let interval;

function startClock() {
  updateClock();
  clearInterval(interval);
  interval = setInterval(updateClock, 1000);
}

// Auto-start the clock when the page loads
window.onload = () => {
  startClock();
};