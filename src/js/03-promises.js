import Notiflix from 'notiflix';

const formElement = document.querySelector('.form');
const delayInputElement = document.querySelector('[name="delay"]');
const stepInputElement = document.querySelector('[name="step"]');
const amountInputElement = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      resolve({ position, delay });
    });
  } else {
    return new Promise((resolve, reject) => {
      reject({ position, delay });
    });
  }
}

formElement.addEventListener('submit', event => {
  event.preventDefault();
  let counter = 0;
  let step = Number(stepInputElement.value) + Number(delayInputElement.value);

  setTimeout(() => {
    const timerID = setInterval(() => {
      counter += 1;
      createPromise(counter, step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });

      step += Number(stepInputElement.value);

      if (counter === Number(amountInputElement.value)) {
        clearInterval(timerID);
      }
    }, stepInputElement.value);
  }, delayInputElement.value - stepInputElement.value);
});
