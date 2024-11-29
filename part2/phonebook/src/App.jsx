import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

function App() {
	const [person, setPerson] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filteredData, setFilteredData] = useState('')
	const [message, setMessage] = useState({
		text: null,
		isError: false
	})

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPerson(initialPersons)
			})
			.catch(error => {
				console.log(error.message);
			})
	}, [])

	const handleInputName = (event) => {
		setNewName(event.target.value)
	}

	const handleInputNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleAddNewEntry = (event) => {
		event.preventDefault()
		const isAlready = person.find(entry => entry.name === newName)
		if (isAlready) {
			if (window.confirm(`${isAlready.name} is already added to phonebook, replace the old number with a new one?`)) {
				const newObject ={ ...isAlready, number: newNumber}
				personService
					.update(newObject.id, newObject)
					.then(returnedPerson => {
						setPerson(person.map(p => p.id === newObject.id ? returnedPerson : p))
						setNewName('')
						setNewNumber('')
						setMessage(prevState => ({
							...prevState,
							text: `A number for ${newObject.name} is changed`,
							isError: false
						}))
						setTimeout(() => {
							setMessage(prevState => ({
								...prevState,
								text: null
							}))
						}, 5000)
					})
					.catch(() => {
						setMessage(prevState => ({
							...prevState,
							text: `Information of ${newObject.name} has already been removed from server`,
							isError: true
						}))
						setTimeout(() => {
							setMessage(prevState => ({
								...prevState,
								text: null
							}))
						}, 5000)
					})
			}
		} else {
			const entryObject = {
				name: newName,
				number: newNumber,
			}

			personService
				.create(entryObject)
				.then(returnedPerson => {
					setPerson(person.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setMessage(prevState => ({
						...prevState,
						text: `${entryObject.name} is added`,
						isError: false
					}))
					setTimeout(() => {
						setMessage(prevState => ({
							...prevState,
							text: null
						}))
					}, 5000)
				})
				.catch(error => {
					console.log(error.message);
				})
		}
	}

	const handleDeleteEntry = (id) => {
		const object = person.find(p => p.id === id)
		if (window.confirm(`Delete ${object.name}`)) {
			personService
			.remove(id)
			.then(() => {
				setPerson(person.filter(p => p.id !== id))
			})
			.catch(error => {
				console.log(error.message)
			})
		}
	}

	const handleFilteredData = (event) => {
		setFilteredData(event.target.value)
	}

	const filteredPersons = person.filter(entry => entry.name.toLowerCase().includes(filteredData.toLowerCase()) );

  return (
    <div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter
				handleChange={handleFilteredData}
				filteredData={filteredData}/>
			<h3>add a new</h3>
			<PersonForm
				handleSubmit={handleAddNewEntry}
				handleName={handleInputName}
				handleNumber={handleInputNumber}
				newName={newName}
				newNumber={newNumber}
			/>
			<h3>Numbers</h3>
			<Persons
				list={filteredPersons}
				handleDelete={handleDeleteEntry}
			/>
    </div>
  )
}

export default App
