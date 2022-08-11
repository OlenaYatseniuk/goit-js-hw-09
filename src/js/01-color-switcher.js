const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.disabled = true;
let timeId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timeId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function onBtnStopClick() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timeId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
