const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const invalidLocationError = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const ApiKey = 'eaef60b170bb40f113eb6a175b21943a';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return; 
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                invalidLocationError.style.display = 'block';
                invalidLocationError.classList.add('fade-in');
                return;
            }

            invalidLocationError.style.display = 'none'
            invalidLocationError.classList.remove('fade-in');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windSpeed = document.querySelector('.weather-details .windspeed span');
        
            switch (json.weather[0].main) {  
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                
                case 'Clouds':
                    image.src = 'images/clouds.png';
                    break;

                case 'Haze':
                    image.src = 'images/haze.png';
                    break;
                
                default:
                    image.src = 'images/season.png';
            }

            temperature.innerHTML = `${parseInt(kelvinToCelcius(json.main.temp))}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windSpeed.innerHTML = `${msToKmh(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
            container.style.height = '590px';
        });
});

const kelvinToCelcius = function(temp) {
    return Math.round(temp - 273.15);
}

const msToKmh = function(speed) {
    return (speed * 3.6).toFixed(1);
}