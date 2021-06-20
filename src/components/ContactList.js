import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const inputElement = useRef('')
  // const contacts = [
  //   {id: '1', name:'Natdev', email:'natdev@email.com'}
  // ]
  // console.log(props)
  const renderContactList = props.contacts.map(contact => {
    return (
      <ContactCard contact={contact} key={contact.id} removeContactHanlder={props.removeContactHanlder} />
    )
  })

  const getSearchTerm = () => {
    props.searchKeyword(inputElement.current.value)
  }
  return (
    <div className="main">
      <h2>Contact List
        <Link to='/add'>
          <button className="ui button pink right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={inputElement} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : 'No Contacts available..'}
      </div>
    </div>
  )
}

export default ContactList
