import './css/styles.css';
import { fetchCountries } from "../src/fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const input = document.querySelector('input#search-box')
const countryUl = document.querySelector('ul.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
    countryInfo.innerHTML = '';
    countryUl.innerHTML = '';
   let country = input.value.trim();
  if (country === '') {
    return
  } 
  fetchCountries(country)
    .then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (data.length >= 2 && data.length <= 10) {
      makeListCountries(data);
    }
    if (data.length === 1) {
      makeOneCountries(data);
    }
  })
  .catch(error => {
  Notiflix.Notify.failure("Oops, there is no country with that name");
  });
}
function makeHtmlListCountries(data) {
 return data.map(({ flag, name }) => 
         `<li>
        <img src=${flag}
        alt="flag"
        width="27"
        height="auto">
        <div><p>${name}</p></div></li>`
      ).join(""); 
}
function makeListCountries(data) {
   const markup = makeHtmlListCountries(data);
   countryUl.insertAdjacentHTML('beforeend', markup); 
}
function makeHtmlOneCountries(data){
 return data.map(({ name, capital, population, flag, languages }) => 
        `
        <div class="div-flex">
        <img src=${flag}
        alt="flag"
        width="27"
        height="auto">
      
        <div class="name"><h2>${name}</h2></div>
        </div>
        <ul class="countriData">
            <li class="item-countriData">
                <span class="fatty-span">Capital:</span><span class="span">${capital}</span>
            </li>
            <li  class="item-countriData">
                <span class="fatty-span">Population:</span><span class="span">${population}</span>
            </li>
            <li  class="item-countriData">
                <span class="fatty-span">Languages:</span><span class="span">${languages.map(i => ` ${i.name}`)}</span>
            </li>
        </ul>
        `
      ).join(""); 
}
 function makeOneCountries(data) {
    const oneCountry = makeHtmlOneCountries(data);
      countryInfo.insertAdjacentHTML('beforeend', oneCountry);
} 
 