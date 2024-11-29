const Form = ({ handleSearchCountry,handleInputChange,inputText }) => {
	return (
		<form onSubmit={handleSearchCountry}>
			find countries
			<input
          onChange={handleInputChange}
          value={inputText}
      />
			<button type="submit">search</button>
		</form>
	);
};

export default Form;