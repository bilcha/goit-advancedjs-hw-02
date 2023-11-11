import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const inputField = document.querySelector("#datetime-picker");
const daysField = document.querySelector("span[data-days]");
const hoursField= document.querySelector("span[data-hours]");
const minutesField = document.querySelector("span[data-minutes]");
const secondsField = document.querySelector("span[data-seconds]");

startBtn.disabled = true;
let countdounTime = 0;
startBtn.addEventListener("click", handlerStartBtnCick)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    checkDate(selectedDates[0].getTime(), this.now.getTime());
  },
};
flatpickr("#datetime-picker", options);

function checkDate(selectedDate, now){
  if (selectedDate > now) {
    startBtn.disabled = false;
    countdounTime = selectedDate - now;
    showTime(countdounTime);
  } else {
    startBtn.disabled = true;
    iziToast.warning({
      title: 'Warning',
      message: 'Please choose a date in the future',
      position: 'topRight'
    });
  }
}

function showTime(ms) {
  const time = convertMs(ms);
  daysField.textContent = addLeadingZero(time.days.toString());
  hoursField.textContent = addLeadingZero(time.hours.toString());
  minutesField.textContent = addLeadingZero(time.minutes.toString());
  secondsField.textContent = addLeadingZero(time.seconds.toString());
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function handlerStartBtnCick() {
  startBtn.disabled = true;
  inputField.disabled = true;
  const countInterval = setInterval(() => {
    if (countdounTime < 1000) {
      clearInterval(countInterval);
      inputField.disabled = false;
      return;
    }
    countdounTime -= 1000;
    showTime(countdounTime);
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}