const buttonStartElement = document.querySelector('[data-start]');
const buttonStopElement = document.querySelector('[data-stop]');
let timerID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const handleStartColorChange = () => {
  document.body.style.backgroundColor = getRandomHexColor();

  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  buttonStartElement.setAttribute('disabled', true);
};

const handleStopColorChange = () => {
  clearInterval(timerID);
  buttonStartElement.removeAttribute('disabled');
};

buttonStartElement.addEventListener('click', handleStartColorChange);
buttonStopElement.addEventListener('click', handleStopColorChange);
