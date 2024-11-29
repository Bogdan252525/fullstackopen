const Total = ({parts}) => {

	const total = parts.reduce((acc, part) => {
		return acc + part.exercises
	}, 0)

	return (
		<div>
			<b>total of {total} exercises</b>
		</div>
	);
};

export default Total;