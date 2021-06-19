import React, {useState} from 'react';
import { useHistory } from 'react-router';

const AddContact = ({ addContactHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const addToList = (e) => {
    e.preventDefault();
    if (name === '' || email==='') {
      alert('All the fileds are mandatory');
      return;
    }
    addContactHandler(name, email);
    setName('');
    setEmail('');
    history.push('/')
  }

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={addToList}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="field">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" id="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <button className="ui button pink">Add</button>
      </form>
    </div>
  )
}

export default AddContact
