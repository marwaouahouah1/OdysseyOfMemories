import React, {useState,useEffect} from 'react';
import './User/Connexion/Login'

function App(){
  const [data,setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log("data");
      }
    )
  },[])

  return (
    <Log/>
  )
}

export default App;