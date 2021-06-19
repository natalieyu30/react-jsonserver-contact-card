import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts'
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (name, email) => {
    // console.log(name, email)
    setContacts([...contacts, {id:uuid(), name, email}])
  }

  const removeContactHanlder = (id) => {
    const newContacts = contacts.filter(contact => {
      return contact.id !== id
    })
    setContacts(newContacts);
  }

  useEffect(() => {
    const getContactsFromLocal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (getContactsFromLocal) setContacts(getContactsFromLocal)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route 
            path='/' 
            exact
            render={(props)=>(<ContactList {...props} contacts={contacts} removeContactHanlder={removeContactHanlder} />)} 
            // component={()=>}
          />
          <Route 
            path='/add'
            render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler} />)}
            // component={()=>} 
          />
          <Route 
            path='/contact/:id'
            component={ContactDetail}
          />
        </Switch>
      </Router>
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} removeContactHanlder={removeContactHanlder}/> */}
    </div>
  );
}

export default App;
