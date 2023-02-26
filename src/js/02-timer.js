import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
let intervalId = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const targetTime = selectedDates[0].getTime();
    const startTime = Date.now();

    if (targetTime < startTime) {
      alert('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', 'true');
        intervalId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = targetTime - currentTime;

          if (deltaTime <= 1000 && deltaTime > 0) {
            clearInterval(intervalId);
          }

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          daysEl.textContent = days;
          hoursEl.textContent = hours;
          minutesEl.textContent = minutes;
          secondsEl.textContent = seconds;
        }, 1000);
      });
    }
  },
};

const calendar = flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function fdfsd(value) {
  console.log(value);
  startBtn.setAttribute('disabled', 'true');
  intervalId = setInterval(() => {
    console.log(value);
    const currentTime = Date.now();
    const deltaTime = targetTime - currentTime;

    if (deltaTime <= 1000 && deltaTime > 0) {
      clearInterval(intervalId);
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
}
