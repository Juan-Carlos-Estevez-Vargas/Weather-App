/**
 * API_KEY traida de Open API Waether.
 */
const API_KEY = "73e7de11543d31d67142354335c5930e";

/**
 * Obtiene los datos necesarios de la información del clima según la posición (coordenadas) del usuario.
 *
 * @param {*} position del usuario que esté consultando la información.
 */
const fetchData = (position) => {
  const { latitude, longitude } = position.coords; // Obteniendo las coordenadas del usuario.
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json()) // Transformando la información a formato json.
    .then((data) => setWeatherData(data)); // Seteando la data a la función encargada de procesarla.
};

/**
 * Obtiene la fecha actual del sistema del usuario.
 * ñ
 * @returns Formato de fecha actual del sistema.
 */
const getDate = () => {
  let date = new Date();
  return `${date.getDate()} - ${("0" + (date.getMonth() + 1)).slice(
    -2
  )} - ${date.getFullYear()}`;
};

/**
 * Setea la data obtenida del API del clima en los componentes HTML.
 *
 * @param {*} data con los datos del clima.
 */
const setWeatherData = (data) => {
  const weatherData = {
    location: data.name,
    temperature: data.main.temp,
    date: getDate(),
  };
  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });
};

/**
 * Obtiene la localización del usuario en cuestión.
 */
const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
