document.querySelector('#search').addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = document.querySelector('#city_name').value.trim();

  if (!cityName) {
    return showALert('Você precisa digitar uma cidade...');
  }

  const apiKey = '2c4f6a060ff72db5f25eee3b2ae35687';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
      showInfos({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
      });
    } else {
      document.querySelector('#weather').classList.remove('show');
      showALert(`Não foi possível localizar...<br><img src="img/404.svg" alt="Erro 404">`);
    }
  } catch (error) {
    showALert('Erro ao conectar com a API. Verifique sua internet.');
    console.error(error);
  }
});

function showInfos(json) {
  showALert(); // limpa alertas anteriores
  document.querySelector('#weather').classList.add('show');

  // Título
  document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

  // Temperatura atual
  document.querySelector('#temp_value').innerHTML = 
    `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;

  document.querySelector('#temp_description').innerHTML = json.description;
  document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  // Temp. máxima
  const tempMaxC = json.tempMax;
  const tempMaxF = (tempMaxC * 9/5) + 32;
  document.querySelector('#temp_max').innerHTML = 
    `${tempMaxC.toFixed(1).toString().replace('.', ',')}°C / ${tempMaxF.toFixed(1)}°F`;

  // Temp. mínima
  const tempMinC = json.tempMin;
  const tempMinF = (tempMinC * 9/5) + 32;
  document.querySelector('#temp_min').innerHTML = 
    `${tempMinC.toFixed(1).toString().replace('.', ',')}°C / ${tempMinF.toFixed(1)}°F`;

  // Umidade e vento
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
  document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showALert(msg = '') {
  document.querySelector('#alert').innerHTML = msg;
}
