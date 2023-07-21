import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) setContacts(parsedContacts)
  }, []) 

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
const changeFilter = e => setFilter(e.target.value);

const deleteContact = contactId => {
    setContacts(prevState => {
    return prevState.filter(contact => contact.id !== contactId)
    })
    setFilter('')
  }

const formSubmitHandler = data => {
  const newContact = { ...data, id: nanoid() };
  setContacts([...contacts, newContact])
  }

const normalizedFilter = filter.toLowerCase();
const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter))
    
    return (
      <div className={css.mainContainer}>
        <h1 className={css.headers}>Phonebook</h1>
        <ContactForm onFormSubmit={formSubmitHandler} contacts={contacts } />
        <h2 className={css.headers}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
    );
};

export default App;






