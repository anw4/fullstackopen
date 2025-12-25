const Persons = ({ personsToShow , deletePerson}) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}>
          {person.name}
          {person.number}
          <b onClick={()=> deletePerson(person.id, person.name)}> delete </b>
          </li>
      )}
    </ul>
  )
}

export default Persons
