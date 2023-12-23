const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => props.removePerson(person.id, person.name)}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;