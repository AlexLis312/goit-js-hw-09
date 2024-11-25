import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ONE_SECOND = 1000;
let intervalID = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
  timerUI: document.querySelector('.timer'),
};

refs.startBtn.disabled = true;
refs.timerUI.style.display = 'flex';
refs.timerUI.style.gap = '10px';

let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.warning('Please choose a date in the future');
      return;
    }

    selectedDate = selectedDates[0];
    refs.startBtn.disabled = false;
  },
};

function startTimer() {
  if (intervalID) {
    Notiflix.Notify.info('Timer is already running!');
    return;
  }
  const currDate = Date.now();
  let timer = selectedDate - currDate;
  intervalID = setInterval(() => {
    if (timer <= 0) {
      clearInterval(intervalID);
      updateUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    timer -= ONE_SECOND;
    const timerForUI = convertMs(timer);
    updateUI(timerForUI);
  }, ONE_SECOND);
}

function updateUI({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

refs.startBtn.addEventListener('click', startTimer);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(refs.input, options);
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
