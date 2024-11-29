const WeatherInfo = ({weather}) => {
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default WeatherInfo;
