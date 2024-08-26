let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function updateDisplay() {
    const time = Date.now() - startTime + elapsedTime;
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    document.getElementById('display').textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}

document.getElementById('startStopBtn').addEventListener('click', function() {
    if (!isRunning) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

function startStopwatch() {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    document.getElementById('startStopBtn').textContent = 'Pause';
    document.getElementById('resetBtn').disabled = false;
    document.getElementById('lapBtn').disabled = false;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    document.getElementById('startStopBtn').textContent = 'Start';
}

document.getElementById('resetBtn').addEventListener('click', function() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    document.getElementById('display').textContent = '00:00:00.00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;
    document.getElementById('lapsList').innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', function() {
    const lapTime = document.getElementById('display').textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    document.getElementById('lapsList').appendChild(lapItem);
});
