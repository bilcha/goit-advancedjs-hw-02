const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtn.addEventListener("click", hanleStartBtnClick);
stopBtn.addEventListener("click", hanleStopBtnClick);
let timer;

function hanleStartBtnClick(evt) {
  toggleBtns(evt);
  body.style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);

}

function hanleStopBtnClick(evt) {
  toggleBtns(evt);
  clearInterval(timer);
}
function toggleBtns(evt) {
  startBtn.disabled = evt.target === startBtn ? true : false;
  stopBtn.disabled = evt.target === stopBtn ? true : false;
}