import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const submitBtn = document.querySelector('button');
const form = document.querySelector('.form');
submitBtn.addEventListener('click', handlerSubmitBtnClick);

function handlerSubmitBtnClick(evt) {
  evt.preventDefault();
  const promisesQuantity = form.elements.amount.value;
  let promiseDelay = +form.elements.delay.value;
  const promiseStep = +form.elements.step.value;

  for (let i = 1; i <= promisesQuantity; i++){
    createPromise(i, promiseDelay).then((value) => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise ${value.position} in ${value.delay}ms`,
        position: 'topRight'
      });
    }).catch((err) => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise ${err.position} in ${err.delay}ms`,
          position: 'topRight'
        });
    })    
    promiseDelay += promiseStep;
  }
 form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}
