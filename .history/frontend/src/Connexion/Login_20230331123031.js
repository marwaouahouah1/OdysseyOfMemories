import React, { useState } from 'react';
import axios from 'axios';
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
  
      if (response.data.message === "Connexion réussie") {
        // Stocker le token d'accès dans le local storage
        localStorage.setItem("access_token", response.data.access_token);
  
        // Stocker les informations de l'utilisateur connecté et gérer l'authentification de l'utilisateur
        console.log(response.data);
  
        // Rediriger vers la page protégée ou actualiser l'interface utilisateur
      } else {
        console.error("Erreur lors de la connexion", response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
    }
  };

  const fetchProtectedData = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:5000/protected', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données protégées', error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
