import React from 'react';

function Postcard(props) {
  return (
    <div className="postcard">
      <div className="postcard-left">
        <p>Destinataire : {props.recipient}</p>
        <p>Votre message : {props.message}</p>
      </div>
      <div className="postcard-right">
        <img src={props.image} alt="Carte postale" />
      </div>
    </div>
  );
}

export default Postcard;