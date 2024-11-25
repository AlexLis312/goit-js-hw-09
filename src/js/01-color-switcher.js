const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);

refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
