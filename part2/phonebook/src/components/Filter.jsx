const Filter = ({ handleChange,filteredData }) => {
	return (
		<div>
			filter show with<input onChange={handleChange} value={filteredData} />
		</div>
	);
};

export default Filter;