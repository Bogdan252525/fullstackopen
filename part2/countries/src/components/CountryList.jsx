const CountryList = ({ handleShowCountry,searchCountries }) => {
  return (
    <ul>
      {searchCountries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShowCountry(country.cca3)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
