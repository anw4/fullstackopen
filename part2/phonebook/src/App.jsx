import PersonForm from './Components/personForm'
import Filter from './Components/filter'
import Persons from './Components/Persons'
import personService from './services/personService'
import { useEffect, useState } from "react"
import Notification from './Components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


 
 useEffect(() => {
  personService.getAll().then(initialPersons => {
    setPersons(initialPersons)
  })
}, [])


  const addPerson =(event) =>{
    event.preventDefault()

    const duplicate = persons.find(person =>person.name === newName)
    if(duplicate){
      const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
    if (!confirmUpdate) return

    const updatedPerson = { ...duplicate, number: newNumber }

    personService
      .update(duplicate.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson))
        setNotification(`Updated ${returnedPerson.name}'s number`)
        setNotificationType('success')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNotification(`Updated ${returnedPerson.name}`)
        setNotificationType('success')

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  })
  .catch(error => {
    setNotification(
      `Information of ${duplicate.name} has already been removed from server`
    )
    setNotificationType('error')

    setTimeout(() => {
      setNotification(null)
    }, 5000)

    // نحذف الشخص من state لأنه فعليًا غير موجود
    setPersons(persons.filter(p => p.id !== duplicate.id))
  })
    setNewName('')
    setNewNumber('')

      return
    }


  const personObject = { name : newName, number : newNumber}

  personService.create(personObject).then(returnedPerson => {

    setPersons(persons.concat(returnedPerson))
    setNotification(`Added ${returnedPerson.name}`)
    setNotificationType('success')
    setTimeout(() => {
      setNotification(null)
    }, 5000)  
    setNewName('')
    setNewNumber('')
})
}

  const deletePerson = (id, name) => {
  const confirmDelete = window.confirm(`Delete ${name}?`)
  if (!confirmDelete) return

  personService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      alert(`Information of ${name} has already been removed from server`)
      setPersons(persons.filter(person => person.id !== id))
    })
}
  
  const filteredPersons = persons.filter(person=>
    person.name.toLowerCase().includes(search.toLowerCase())   
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter search = {search} setSearch={setSearch}/>
     
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      
      <h2>Numbers</h2>
      <Persons 
        personsToShow={filteredPersons}
        deletePerson={deletePerson}
        />
      
    </div>
  )
}


export default App