import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
let intervalId = null;
let targetTime = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetTime = selectedDates[0].getTime();
    const startTime = Date.now();

    if (targetTime < startTime) {
      Notify.failure('Please choose a date in the future');
      if (startBtn.getAttribute('disabled')) {
        return;
      }
    }
    startBtn.disabled = false;
    startBtn.addEventListener('click', timer);
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
function timer() {
  inputEl.setAttribute('disabled', 'true');
  startBtn.disabled = true;

  let currentTime = Date.now();
  let deltaTime = targetTime - currentTime;
  updateTimerLook(deltaTime);

  intervalId = setInterval(() => {
    currentTime = Date.now();
    deltaTime = targetTime - currentTime;

    if (deltaTime < 1000 && deltaTime >= 0) {
      clearInterval(intervalId);
    }
    updateTimerLook(deltaTime);
  }, 1000);
}

function updateTimerLook(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}
