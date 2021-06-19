import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const ContactCard = ({contact, removeContactHanlder}) => {

  return (
    <div className="item">
      <img src={user} alt="user avatar" className="ui avatar image" />
      <div className="content">
        <Link to={{pathname:`/contact/${contact.id}`, state:{contact}}}>
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>
      <i onClick={() => removeContactHanlder(contact.id)} className="trash alternate outline icon" style={{color:'red', marginTop:'7px'}}></i>
    </div>
  )
}

export default ContactCard
