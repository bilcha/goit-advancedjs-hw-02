import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const submitBtn = document.querySelector('button');
const form = document.querySelector('.form');
submitBtn.addEventListener('click', handlerSubmitBtnClick);

function handlerSubmitBtnClick(evt) {
  evt.preventDefault();
  const promisesQuantity = form.elements.amount.value;
  const promiseDelay = +form.elements.delay.value;
  const promiseStep = +form.elements.step.value;

  let promises = [];

  for (let i = 1; i <= promisesQuantity; i++){
    if (i === 1) {
      promises.push(createPromise(i, promiseDelay));
    } else {
      promises.push(createPromise(i, promiseDelay + promiseStep * (i-1)));
    }
  }

  Promise.allSettled(promises).then((items) => { 
    items.forEach((item, idx) => { 
      const delay = item.value ? item.value.delay : item.reason.delay;
      setTimeout(() => {
        if (item.value) {
          iziToast.success({
            title: 'Success',
            message: `Fulfilled promise ${idx+1} in ${delay}ms`,
            position: 'topRight'
          });
          console.log(`✅ Fulfilled promise ${idx+1} in ${delay}ms`);

        } else {
          iziToast.error({
            title: 'Error',
            message: `Rejected promise ${idx+1} in ${delay}ms`,
            position: 'topRight'
          });
          console.log(`❌ Rejected promise ${idx+1} in ${delay}ms`);
        }
       }, delay);
    })
  })
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((response, reject) => {
    if (shouldResolve) {
      response({ position, delay });
    } else {
      reject({ position, delay });
    }
  })
}
