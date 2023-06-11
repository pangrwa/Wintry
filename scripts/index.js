const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const invalidLocationError = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const ApiKey = 'eaef60b170bb40f113eb6a175b21943a';
    const city = document.querySelector('.searchbox input').value;

    if (city === '') {
        return; 
    }

    fetch(`hhttps://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404')
        })




})