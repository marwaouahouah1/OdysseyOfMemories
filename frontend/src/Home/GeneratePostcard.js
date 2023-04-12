import React, { useState } from 'react';

function GeneratePostcard() {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ici vous pouvez envoyer les données vers le backend pour générer la carte postale
  };

  return (
    <div className='form-container'>
        <div className='app'>
            <span style={{textAlign:"center", marginBottom:"20px"}}><h2>Générer votre carte postale</h2></span>
        </div>  
      <form onSubmit={handleSubmit}>

        <label>
        <span>Destinataire:</span>
          <input
            type='text'
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </label>

        <br /><br />

        <label>
        <span>Expéditeur:</span>
          <input
            type='text'
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </label>

        <br /><br />

        <label>
          <span>De:</span>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <br /><br />

        <label>
        <span>Message:</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <br /><br />

        <input type='file' />
        <br />
        <button type='submit'>Générer la carte postale</button>
      </form>

       {/* Affichage du message de confirmation */}
        {message && <p>{message}</p>}
    </div>
  );
}

export default GeneratePostcard;
