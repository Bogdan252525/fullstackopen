const Persons = ({ list,handleDelete }) => {
	return (
		<ul className="lists">
			{list.map((entry) =>
				<li
					key={entry.id}
					className="list"
				>
					{entry.name} {entry.number}
					<button
						onClick={() => handleDelete(entry.id)}
						className="list-button"
					>
						delete
					</button>
				</li>
			)}
		</ul>
	);
};

export default Persons;