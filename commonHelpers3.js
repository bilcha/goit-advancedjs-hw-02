import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as c}from"./assets/vendor-651d7991.js";const p=document.querySelector("button"),u=document.querySelector(".form");p.addEventListener("click",f);function f(o){o.preventDefault();const l=u.elements.amount.value,n=+u.elements.delay.value,m=+u.elements.step.value;let s=[];for(let e=1;e<=l;e++)e===1?s.push(a(e,n)):s.push(a(e,n+m*(e-1)));Promise.allSettled(s).then(e=>{e.forEach((r,i)=>{const t=r.value?r.value.delay:r.reason.delay;setTimeout(()=>{r.value?(c.success({title:"Success",message:`Fulfilled promise ${i+1} in ${t}ms`,position:"topRight"}),console.log(`✅ Fulfilled promise ${i+1} in ${t}ms`)):(c.error({title:"Error",message:`Rejected promise ${i+1} in ${t}ms`,position:"topRight"}),console.log(`❌ Rejected promise ${i+1} in ${t}ms`))},t)})})}function a(o,l){const n=Math.random()>.3;return new Promise((m,s)=>{n?m({position:o,delay:l}):s({position:o,delay:l})})}
//# sourceMappingURL=commonHelpers3.js.map
