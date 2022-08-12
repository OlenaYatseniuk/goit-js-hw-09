import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  const inputValues = {
    delay: Number(event.target.elements.delay.value),
    step: Number(event.target.elements.step.value),
    amount: Number(event.target.elements.amount.value),
  };
  event.target.reset();
  const { delay, step, amount } = inputValues;
  generatePromises(delay, step, amount);
}

function generatePromises(delay, step, amount) {
  if (amount < 0) {
    return Notify.failure(`❌ Choose option > 0, please`);
  }
  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      createPromise(i, (delay += step))
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}
