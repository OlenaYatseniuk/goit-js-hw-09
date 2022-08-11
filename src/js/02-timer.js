import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let chosenDate = null;
let timerId = null;
const DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    if (Date.now() > chosenDate) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      btnStart.addEventListener('click', onStartBntClick);
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBntClick() {
  btnStart.removeEventListener('click', onStartBntClick);
  btnStart.disabled = true;
  dateInput.disabled = true;
  dateInput.style.cursor = 'not-allowed';

  if (isTimeReached(Date.now(), chosenDate)) {
    Notify.failure('Please choose a date in the future');
    dateInput.style.cursor = 'pointer';
    dateInput.disabled = false;
    return;
  }

  changeTextContent();

  timerId = setInterval(() => {
    if (isTimeReached(Date.now(), chosenDate)) {
      return;
    }
    changeTextContent();
  }, DELAY);
}

function isTimeReached(currentTime, neededTime) {
  if (currentTime >= neededTime) {
    console.log('stop');
    clearInterval(timerId);
    dateInput.style.cursor = 'pointer';
    dateInput.disabled = false;
    return true;
  }
  return false;
}

function changeTextContent() {
  const delta = chosenDate - Date.now();
  console.log('delta is:', delta);
  const { days, hours, minutes, seconds } = convertMs(delta);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
