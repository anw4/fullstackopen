import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails.jsx'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Find countries</h2>
    <div>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setSelectedCountry(null)
        }}
      />
    </div>

    {selectedCountry ? (
      <CountryDetails country={selectedCountry} />
    ) : (
      <CountryList
        countries={filteredCountries}
        onShow={setSelectedCountry}
      />
    )}
  </div>

  )
}

export default App
