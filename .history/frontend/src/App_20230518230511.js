import React, {useState,useEffect} from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";
import Map from './components/voyage/map';

function App(){

  return (
    <>
			<Router>
				<Routes>
					<Route path="/" element={<Maap/>}/>
				</Routes>
			</Router>	

		</>
  )
}

export default App;