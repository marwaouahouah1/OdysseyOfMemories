import React, { useState, useRef} from 'react';
import generatePDF from '../CartePostal/generatePDF';
import sendEmail from '../CartePostal/sendMail';

import '../css/carte.css';

function GeneratePostcard() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [sender, setSender] = useState('');

  const [postcard, setPostcard] = useState(null);
  const formRef = useRef(null);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postcard = {
      recipient: recipient,
      message: message,
      image: image,
      sender: sender,
      location: location
    };
  
    setPostcard(postcard);
    formRef.current.style.display = 'none';
  };


  return (
    <div className='form-container'>
        <div className='app'>
            <span style={{textAlign:"center", marginBottom:"20px"}}><h2>Générer votre carte postale</h2></span>
        </div>  

      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
        <span>Destinataire:</span>
          <input
            type='text'
            value={recipient}
            onChange={handleRecipientChange}
          />
        </label>

        <br /><br />

        <label>
        <span>Expéditeur:</span>
          <input
            type='text'
            value={sender}
            onChange={handleSenderChange}
          />
        </label>

        <br /><br />

        <label>
          <span>De:</span>
          <input
            type='text'
            value={location}
            onChange={handleLocationChange}
          />
        </label>

        <br /><br />

        <label>
        <span>Message:</span>
          <textarea
            value={message}
            onChange={handleMessageChange}
          />
        </label>

        <br /><br />

        <label>
        <input type='file' accept='image/*' onChange={handleImageChange} />
        </label>

        <br />
        <button type='submit'>Générer la carte postale</button>
      </form>

      {postcard && ( 
       <div> 
        <div className="Postcard">
          <div className="SenderLocation">
            <div className='titre'>
              <span>Carte Postale </span>
            </div>
            <div className="Sender">
              <span>Expéditeur :</span>
              {postcard.sender}
              </div>
            <div className="Recipient">
              <span> Destinataire: </span>
              {postcard.recipient}
            </div>
            <div className="Location">
              <span>De : </span>
              {postcard.location}
            </div>
            <div className="Message">
              <span>Message :</span>
              {postcard.message}
            </div>
          </div>
          <div className="Image">
            <img src={postcard.image} alt="Postcard" />
          </div>
        </div>
      </div>
      )}

    <div className="buttons-container">
      <button onClick={() => generatePDF(postcard)}>PDF</button>
      <button onClick={() => sendEmail(postcard)}>Envoyer par mail</button>
    </div>
  </div>
    
  );
}

export default GeneratePostcard;
