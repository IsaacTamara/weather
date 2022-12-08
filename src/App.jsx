import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)       
  }

  const newCallAPISearch = (cityName) => {
    const API_KEY = "96e8c60e024bea8edd79826d06ed4517"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
      .then(res => setWeather(res.data))
      .catch(err => alert("Not found this place"))
  }

  const changeUnitTemperature = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)      
  }, [])

  useEffect(() => {
    if (coords) {
      const API_KEY = "96e8c60e024bea8edd79826d06ed4517"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(1)
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTimeout(()=> {
            setTemperature(newTemperature)
            setWeather(res.data)
          }, 2000) 
          
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather ? (
          <WeatherCard 
            weather={weather} 
            temperature={temperature}
            isCelsius={isCelsius} 
            changeUnitTemperature={changeUnitTemperature}
            newCallAPISearch={newCallAPISearch}
            />
        ) : <Loader />
      }
    </div>
  )
}

export default App
