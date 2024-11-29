const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div className="block-list">
        <h3>capital</h3>
        <ul>
          {country.capital.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
      <h3>area {country.area}</h3>
      <div className="block-list">
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
        />
      </div>
    </>
  );
};

export default CountryInfo;
