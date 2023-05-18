import React, {useState,useEffect} from 'react';
import 
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
    <></>
  )
}

export default App;