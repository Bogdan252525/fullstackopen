import { useState } from "react"

const Button = ({ handleClick, text }) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const Statistics = ({
	good,
	neutral,
	bad,
	allClicked,
	average,
	positive
}) => {
	if (allClicked <= 0) {
		return (
			<p>No feedback given</p>
		)
	}
	return (
		<div>
			<table>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="allClicked" value={allClicked} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={`${positive} %`} />
			</table>
		</div>
	)
}

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>
				{text}
			</td> 
			<td>
				{value}
			</td>
		</tr>
	)
}

const  App = () => {
  const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [allClicked, setAll] = useState(0)
	const [average, setAverage] = useState(0)
	const [positive, setPositive] = useState(0)

	const getAverage = (good, bad, clicked) => {
		setAverage((good - bad) / clicked)
	}

	const getPositive = (good, clicked) => {
		setPositive(good / clicked * 100)
	}

	const handleGoodClick = () => {
		const resultOfGood = good + 1
		const resultOfClicked = allClicked + 1
		setGood(resultOfGood)
		setAll(resultOfClicked)
		getAverage(resultOfGood, bad, resultOfClicked)
		getPositive(resultOfGood, resultOfClicked)
	}

	const handleNeutralClick = () => {
		const resultOfClicked = allClicked + 1
		setNeutral(neutral + 1)
		setAll(resultOfClicked)
		getAverage(good, bad, resultOfClicked)
		getPositive(good, resultOfClicked)
	}

	const handleBadClick = () => {
		const resultOfBad = bad + 1
		const resultOfClicked = allClicked + 1
		setBad(resultOfBad)
		setAll(resultOfClicked)
		getAverage(good, resultOfBad, resultOfClicked)
		getPositive(good, resultOfClicked)
	}

  return (
    <div>
			<h2>give feedback</h2>
			<Button handleClick={handleGoodClick} text="good" />
			<Button handleClick={handleNeutralClick} text="neutral" />
			<Button handleClick={handleBadClick} text="bad" />
			<h2>statistics</h2>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				allClicked={allClicked}
				average={average}
				positive={positive}
			/>
    </div>
  )
}

export default App
