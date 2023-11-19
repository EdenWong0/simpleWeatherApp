const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const forecastContainer = document.querySelector('.forecast');
const forecastList = document.getElementById('forecastList');

search.addEventListener('click', () => {
    const APIKey = '198feda8acd7cef0fa9c7d1d6ddc1e6f'
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';  // Fix typo: 'blokc' to 'block'
                error404.classList.add('fadeIn');
            } else {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/sun.png';
                        break;

                    case 'Clouds':
                        image.src = 'images/cloudy.png';
                        break;

                    case 'Mist':
                        image.src = 'images/misty.png';
                        break;

                    case 'Rain':
                        image.src = 'images/heavy-rain.png';
                        break;

                    case 'Snow':
                        image.src = 'images/snowflake.png';
                        break;

                    default:
                        image.src = '';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
})

