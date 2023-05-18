import { useEffect, useState } from 'react';
import axios from 'axios';
import "../user.css"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Récupérer le token d'accès depuis le localStorage
    const access_token = localStorage.getItem('access_token');

    // Envoyer une demande GET à l'API RESTful pour récupérer les informations de l'utilisateur
    axios.get('http://localhost:5000/user', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then((response) => {
      // Mettre à jour l'état avec les informations de l'utilisateur
      setUser(response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du profil', error);
    });

    // Envoyer une demande GET à l'API RESTful pour récupérer l'historique de l'utilisateur
    axios.get('http://localhost:5000/history', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then((response) => {
      // Mettre à jour l'état avec les données d'historique
      setHistoryData(response.data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération de l\'historique', error);
    });
  }, []);

  return (
    <div className="history-container">
      <h2>Profil</h2>
      {user && <p>Bienvenue {user.name} !</p>}
      {historyData.map((data) => (
        <div key={data.id} className="history-item">
          <p>{data.title}</p>
          <p>{data.description}</p>
          <p>{data.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
