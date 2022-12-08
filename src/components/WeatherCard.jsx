import React, { useState } from 'react'

const WeatherCard = ({weather, temperature, isCelsius, changeUnitTemperature, newCallAPISearch}) => {
  
  const [place, setPlace] = useState("")

  const handleChangePlace = (e) => {
    setPlace(e.target.value)
  }

  return (
    <article className='wetherCard'>

      <h1>Weather App</h1>

      <div className='search'>
      <input 
        type="text" 
        value={place}
        onChange={handleChangePlace} 
        placeholder="Search..."/>
        <button className='weatherCard-button1' onClick={() => newCallAPISearch(place)}><i class='bx bx-search-alt-2'></i></button>
      </div>

      <h3>{`${weather.name}, ${weather.sys.country}`}</h3>

      <section className='weatherCard-body'>
        <div className='wetherCard-img'>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />          
        </div>

        <p className='temp'>{isCelsius ? `${temperature.celsius} °C` : `${temperature.fahrenheit} °F`}</p>

        <p>{weather.weather[0].description}</p>

        <ul>
          <li><i class='bx bx-wind'></i> Wind speed: {weather.wind.speed} m/s</li>
          <li><i class='bx bxs-cloud'></i> Clouds: {weather.clouds.all}%</li>
          <li><i class='bx bxs-thermometer'></i> Pressure: {weather.main.pressure} hPa </li>
        </ul>
      </section>

      <button className='weatherCard-button' onClick={changeUnitTemperature}>Degrees °F/°C</button>
    </article>
  )
}

export default WeatherCard