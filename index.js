const api = {
    key: 'a848a8e2177308c1c5eeefc38e8c4fe3',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        }).then(displayResult);
}

function displayResult(weather) {
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date().toLocaleDateString();
    let date = document.querySelector('.location .date');
    date.innerHTML = now;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>℃</span>`

    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${weather.main.temp_min}℃ / ${weather.main.temp_max}℃`

    switch (weather.weather[0].main) {
        case "Smoke":
            document.getElementById('body').style.backgroundImage = 'url(https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/lightning-cloud-crop.jpeg?itok=MKBfVAhZ)'
            break;
        case "Clouds":
            document.getElementById('body').style.backgroundImage = 'url(https://www.garni-concordia.it/img/slide/wetter01.jpg)'
            break;
        case "Rain":
            document.getElementById('body').style.backgroundImage = 'url(https://e3.365dm.com/22/11/2048x1152/skynews-rainfall-weather-umbrella_5954037.jpg)'
            break;
        case "Clear":
            document.getElementById('body').style.backgroundImage = 'url(https://cdn2.hubspot.net/hubfs/2936356/maxresdefault.jpg)'
            break;
            case "Snow":
            document.getElementById('body').style.backgroundImage = 'url(https://wjla.com/resources/media2/16x9/full/1015/center/80/2a85926f-e07c-42b4-bc77-b3681d864147-large16x9_be94f27fc70a4e6cb3cc9a448da929b8SnowfallsinEllicottCityVeronicaJohnson.jpeg)'
            break;
            case "Mist":
                document.getElementById('body').style.backgroundImage = 'url(https://brightpunjabexpress.com/wp-content/uploads/2020/11/foggy-weather.png)'
            default:
            break;
    }
}