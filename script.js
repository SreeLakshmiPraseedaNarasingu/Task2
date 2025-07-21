let startTime = 0;
let elapsed = 0;
let interval;
let running = false;

const display = {
  d: document.getElementById("d"),
  h: document.getElementById("h"),
  m: document.getElementById("m"),
  s: document.getElementById("s"),
  ms: document.getElementById("ms")
};

const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");
const lapSound = document.getElementById("lapSound");

function updateDisplay(ms) {
  let total = ms;

  const days = Math.floor(total / 86400000);
  total %= 86400000;

  const hours = Math.floor(total / 3600000);
  total %= 3600000;

  const minutes = Math.floor(total / 60000);
  total %= 60000;

  const seconds = Math.floor(total / 1000);
  const milliseconds = total % 1000;

  display.d.textContent = String(days).padStart(2, '0');
  display.h.textContent = String(hours).padStart(2, '0');
  display.m.textContent = String(minutes).padStart(2, '0');
  display.s.textContent = String(seconds).padStart(2, '0');
  display.ms.textContent = String(milliseconds).padStart(3, '0');
}

function startTimer() {
  startTime = Date.now() - elapsed;
  interval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay(elapsed);
  }, 10);
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
    startStopBtn.textContent = "PAUSE";
  } else {
    clearInterval(interval);
    startStopBtn.textContent = "START";
  }
  running = !running;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  elapsed = 0;
  updateDisplay(0);
  laps.innerHTML = "";
  startStopBtn.textContent = "START";
  running = false;
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${display.d.textContent}:${display.h.textContent}:${display.m.textContent}:${display.s.textContent}.${display.ms.textContent}`;
    laps.appendChild(li);
    lapSound.play();
  }
});

updateDisplay(0);
