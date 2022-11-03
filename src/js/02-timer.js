import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerStartElement = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let currentDate = null;
timerStartElement.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = selectedDates[0];

    if (currentDate - new Date() <= 0) {
      timerStartElement.setAttribute('disabled', true);
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      timerStartElement.removeAttribute('disabled');
    }
  },
};
flatpickr('#datetime-picker', options);

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

const addLeadingZero = value => {
  return String(value).length === 1 ? `0${value}` : value;
};

const handleTimerStart = () => {
  const timerID = setInterval(() => {
    const timerSettings = convertMs(currentDate - new Date());

    days.textContent = addLeadingZero(timerSettings.days);
    hours.textContent = addLeadingZero(timerSettings.hours);
    minutes.textContent = addLeadingZero(timerSettings.minutes);
    seconds.textContent = addLeadingZero(timerSettings.seconds);

    if (
      days.textContent === '00' &&
      hours.textContent === '00' &&
      minutes.textContent === '00' &&
      seconds.textContent === '00'
    ) {
      timerStartElement.setAttribute('disabled', true);
      clearInterval(timerID);
    }
  }, 1000);
};

timerStartElement.addEventListener('click', handleTimerStart);
