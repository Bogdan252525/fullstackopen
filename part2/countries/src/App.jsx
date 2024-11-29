import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import WeatherInfo from './components/WeatherInfo';
const api_key = import.meta.env.VITE_SOME_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState(null);
  const [isOne, setIsOne] = useState(false);
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(44.34);
  const [lon, setLon] = useState(10.99);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error.massage);
      });
  }, []);

  useEffect(() => {
    if (lat && lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        })
				.catch((error) => {
					console.log(error.massage);
				});
    }
  }, [lat, lon]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (searchCountries.length > 11) {
      setMessage('Too many matches, specify another filter');
      setIsOne(false);
    } else if (searchCountries.length === 1) {
      setIsOne(true);
      setMessage(null);
      setLat(searchCountries[0].capitalInfo.latlng[0]);
      setLon(searchCountries[0].capitalInfo.latlng[1]);
    } else {
      setMessage(null);
      setIsOne(false);
    }
  }, [searchCountries, lat, lon]);

  const handleSearchCountry = (e) => {
    e.preventDefault();
    if (inputText) {
      const filteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(inputText.toLowerCase());
      });
      if (filteredCountries.length > 0) {
        setSearchCountries(filteredCountries);
      } else {
        setMessage('Has no matches');
        setTimeout(() => setMessage(false), 2000);
      }
      setInputText('');
    }
  };

  const handleShowCountry = (id) => {
    const show = searchCountries.filter((country) => {
      return country.cca3 === id;
    });
    const oneCountry = show[0];
    setShowCountry(oneCountry);
    setLat(oneCountry.capitalInfo.latlng[0]);
    setLon(oneCountry.capitalInfo.latlng[1]);
  };

  return (
    <>
			<Form
				handleSearchCountry={handleSearchCountry}
				handleInputChange={handleInputChange}
				inputText={inputText}
			/>
      <p>{message}</p>
      {isOne ||
        (!message && (
					<CountryList
						handleShowCountry={handleShowCountry}
						searchCountries={searchCountries}
					/>
        ))}
      {isOne ? (
        <div>
					<CountryInfo
						country={searchCountries[0]}
					/>
					<WeatherInfo
						weather={weather}
					/>
        </div>
      ) : (
        showCountry && (
          <div>
						<CountryInfo
							country={showCountry}
						/>
						<WeatherInfo
							weather={weather}
						/>
          </div>
        )
      )}
    </>
  );
}

export default App;
