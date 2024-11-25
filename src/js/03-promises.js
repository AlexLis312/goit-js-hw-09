import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.delay.value);
  const amount = Number(form.amount.value);
  const step = Number(form.step.value);

  for (let i = 1; i <= amount; i += 1) {
    const currDelay = delay + (i - 1) * step;

    createPromise(i, currDelay)
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
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
