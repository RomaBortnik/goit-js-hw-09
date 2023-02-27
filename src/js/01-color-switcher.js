const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onButtonStart);
stopBtn.addEventListener('click', onButtonStop);

stopBtn.setAttribute('disabled', 'true');
let intervalId = null;

function onButtonStart(event) {
  document.body.style.backgroundColor = getRandomHexColor();
  startBtn.setAttribute('disabled', 'true');
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStop(event) {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
