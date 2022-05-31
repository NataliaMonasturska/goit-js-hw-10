import './css/styles.css';
import { fetchCountries } from "../src/fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const input = document.querySelector('input#search-box')
const countryUl = document.querySelector('ul.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;
let country = '';




input.addEventListener('input', debounce((e) => {
  country = input.value.trim();
    countryInfo.innerHTML = '';
      countryUl.innerHTML = '';
  if (country === '') {
    
    return
  

  } 
    console.log(country);
  fetchCountries(country).then(data => {
  
    console.log(data);

    if (data.length > 10)
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    if (data.length >= 2 && data.length <= 10) {
      const markup = data.map(({ flag, name }) => 
         `<li>
        <img src=${flag}
        alt="flag"
        width="27"
        height="auto">
        <div><p>${name}</p></div></li>`
      ).join(""); 
      countryUl.insertAdjacentHTML('beforeend', markup);
      
    }
    if (data.length === 1) {
    
        countryUl.innerHTML = '';
        const oneCountry = data.map(({ name, capital, population, flag, languages }) => 
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
      countryInfo.insertAdjacentHTML('beforeend', oneCountry);
    }
       
  })
  .catch(error => {
  Notiflix.Notify.failure("Oops, there is no country with that name");
  });
},DEBOUNCE_DELAY))

// const ulGallery = document.querySelector("ul.gallery");
// const gallery = images.map(({ url, alt }) => 
//   `<li class="item-gallery">
//   <img class="image-gallery" src=${url} alt ="${alt}" width="300" height="180" />
// </li>`
// ).join("");
// ulGallery.insertAdjacentHTML("afterbegin", gallery);