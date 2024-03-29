import React, { useState } from 'react';
import "./signupuser.css"

function SignUpUser() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('SignUpUser', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        console.log(data)
        console.log("test")
      });
  };

  return (
    <div className="signup-container">

    <div className='app'>
    <span style={{textAlign:"center", marginBottom:"20px"}}><h2>Inscription</h2></span>
    
    <form style={{display:"flex", justifyContent: "space-betwee" }}onSubmit={handleSubmit}>
      <label>
        Nom :
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br /><br />
      <label>
        Adresse mail :
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br /><br />
      <label>
        Mot de passe :
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br /><br />
      <button type="submit">Créer son compte</button>
    </form>
    {/* Affichage du message de confirmation */}
    {message && <p>{message}</p>}
    </div>
    </div>

  );
}

export default SignUpUser;