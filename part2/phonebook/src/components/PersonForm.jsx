const PersonForm = ({ handleSubmit,handleName,handleNumber,newName,newNumber }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input onChange={handleName} value={newName} />
			</div>
			<div>
				number: <input onChange={handleNumber} value={newNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;