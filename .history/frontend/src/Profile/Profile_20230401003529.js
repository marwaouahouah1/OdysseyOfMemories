import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Récupérer le token d'accès depuis le localStorage
    const access_token = localStorage.getItem('access_token');

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
      console.error('Erreur lors de la récupération du profil', error);
    });
  }, []);

  return (
    <div className="history-container">
      <h2>Profil</h2>
      {historyData.map((data) => (
        <div key={data.id} className="history-item">
         
        </div>
      ))}
    </div>
  );
};

export default Profile;
