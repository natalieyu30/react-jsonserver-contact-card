import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const ContactDetail = (props) => {
  const {name, email, id} = props.location.state.contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user avatar" />
        </div>
        <div className="content">
          <small className='gray'>{id}</small>
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
        <div className="center-div">
          <Link to='/'>
            <button className="ui button pink center">
              Back to Contact List
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactDetail
