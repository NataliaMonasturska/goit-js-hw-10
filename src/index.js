import './css/styles.css';
import { fetchCountries } from "../src/fetchCountries";
// import  _.debounce from "lodash.debounce";
var debounce = require('lodash.debounce');

const input = document.querySelector('input#search-box')

const DEBOUNCE_DELAY = 300;
let cauntry = 'peru';




input.addEventListener('input', debounce((e) => {
    cauntry = input.value;
    console.log(cauntry);
    fetchCountries(cauntry).then(data => {
  console.log(data);
  })
  .catch(error => {
   console.log(error);
  });
},DEBOUNCE_DELAY))


 


//   .then(data => {
//   console.log(data);
//   })
//   .catch(error => {
//    console.log(error);
//   });




// fetch('https://restcountries.com/v2/name/pery').then(response => {
//     return response.json();
   
// }).then(cauntry => {
//         console.log(cauntry);
//     })

// fetch('https://restcountries.com/v2/name/peru')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//   console.log(data);
//   })
//   .catch(error => {
//    console.log(error);
//   });