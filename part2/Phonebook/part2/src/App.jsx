import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      // If the name already exists, update the number
      if (window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      )
      personsService
        .update(existingPerson.id, {
          ...existingPerson,
          number: newNumber,
        })
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
        })
        .then(() => {
          setNotificationMessage({ message: `${newName} number updated`, isError: false });
          setTimeout(() => {
            setNotificationMessage({ message: null, isError: false });
          }, 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setNotificationMessage({
              message: `Information of ${newName} has already been removed from the server`,
              isError: true,
            });
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
          } else {
            console.error('Error updating number:', error);
            setNotificationMessage({ message: `Error updating number for ${newName}`, isError: true });
            setTimeout(() => {
              setNotificationMessage({ message: null, isError: false });
            }, 3000);
          }
        });  

    } else {
      // If the name doesn't exist, add a new person
      const numberObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(numberObject));
      personsService
        .create(numberObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .then(() => {
          setNotificationMessage({ message: `Added ${newName}`, isError: false });
          setTimeout(() => {
            setNotificationMessage({ message: null, isError: false });
          }, 3000);
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        });
    }

    setNewName('');
    setNewNumber('');
  };
  

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .then(() => {
          setNotificationMessage({ message: `${name} removed`, isError: false });
          setTimeout(() => {
            setNotificationMessage({ message: null, isError: false });
          }, 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setNotificationMessage({
              message: `Information of ${name} has already been removed from the server`,
              isError: true,
            });
            setPersons(persons.filter((person) => person.id !== id));
          } else {
            console.error('Error removing person:', error);
            setNotificationMessage({ message: `Error removing ${name}`, isError: true });
            setTimeout(() => {
              setNotificationMessage({ message: null, isError: false });
            }, 3000);
          }
        });
    }
  };
  
  
  
  const personsToShow = filterName
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    )
  : persons;

  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }

  const handleNumber = (event) => { 
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        setNotificationMessage={setNotificationMessage}
      />
      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />    
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App