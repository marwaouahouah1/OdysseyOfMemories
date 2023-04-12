import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';

function Home() {
  return (
    <div>
      <h1>Bienvenue sur notre site de cartes postales !</h1>
      <Link to='/generate'>
        <button>Générer votre carte postale</button>
      </Link>
    </div>
  );
}

export default Home;
