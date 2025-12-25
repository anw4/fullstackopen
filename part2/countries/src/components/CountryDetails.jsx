import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
const [weather, setWeather] = useState(null)
const api_key = import.meta.env.VITE_WEATHER_API_KEY
const capital = country.capital[0]
 

useEffect(() => {
if (!capital) return

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
axios.get(weatherUrl).then(response => {
    setWeather(response.data)
})

}, [capital, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      <h3> Weather in {capital}</h3>
      {!weather ? (
        <p>Loading weather...</p>
        ) : (
        <div>
          <p>temperature {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
        )
      } 
    </div>
  )
}

export default CountryDetails
