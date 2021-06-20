import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuid_v4 } from 'uuid';
import api from '../api/contacts'
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts'
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data;
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts)
    }
  }

  const addContactHandler = async (name, email) => {
    const request = { id: uuid_v4(), name:name, email:email}

    const response = await api.post('/contacts', request)
    setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (contact) => {
    // const newContact = {name: editName, email: editEmail}
    const response = await api.put(`/contacts/${contact.id}`, contact);
    console.log(response.data)
    const { id, name, email } = response.data;
    // const editContact = contacts.map(contact => {
    //   if (contact.id === id) {
    //     return response.data
    //   }
    //   return {...contact}
    // })
    // setContacts(editContact)
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data } : contact;
      })
    )
  }

  const removeContactHanlder = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter(contact => {
      return contact.id !== id
    })
    setContacts(newContacts);
  }

  useEffect(() => {
    // const getContactsFromLocal = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (getContactsFromLocal) setContacts(getContactsFromLocal)
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts)
    }
    getAllContacts()
  }, [])

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route 
            path='/' 
            exact
            render={(props)=>(
              <ContactList 
                {...props} 
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                removeContactHanlder={removeContactHanlder} 
                term={searchTerm}
                searchKeyword={ searchHandler } 
              />)} 
          />
          <Route 
            path='/add'
            render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler} />)}
            // component={()=>} 
          />
          <Route 
            path='/edit'
            render={(props)=>(<EditContact {...props} updateContactHandler={updateContactHandler} />)}
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
