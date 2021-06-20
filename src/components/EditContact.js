import React, {useState} from 'react';
import { useHistory } from 'react-router';

const EditContact = (props) => {
  // console.log(props)
  const {contact} = props.location.state;
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const history = useHistory();

  const update = (e) => {
    e.preventDefault();
    if (name === '' || email==='') {
      alert('All the fileds are mandatory');
      return;
    }
    props.updateContactHandler({id:contact.id, name, email});
    setName('');
    setEmail('');
    history.push('/')
  }

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="field">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" id="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <button className="ui button pink">Update</button>
      </form>
    </div>
  )
}

export default EditContact
