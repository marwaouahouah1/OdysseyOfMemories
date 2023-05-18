import React, {useState,useEffect,useLayoutEffect} from "react";
import {flushSync} from 'react-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Line
} from "react-simple-maps";
import '../../css/voyage/mapchart.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ChakraProvider, Text, Box, Button, Input } from "@chakra-ui/react";
import { PersonForm } from "./Form";
import {FaChevronCircleLeft,FaChevronCircleRight,FaTrashAlt} from "react-icons/fa/";
import citiesList from "./cities";
import mainlandList from "./mainland";


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/";

const MapChart = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nbVoyages, setNbVoyages] = useState(0);
    const [startCreate, setStartCreate] = useState(false);
    const [basicInfos, setBasicInfos] = useState([]);
    const [cityStep, setCityStep] = useState([]);

    const [userVoyages, setUserVoyages] = useState([{}])
    const [voyagesFilteredByContinent,setVoyagesFilteredByContinent] = useState([]);
    const [etapesVoyage,setEtapesVoyage] = useState([]);
    const [cityFilteredByVoyage, setCityFilteredByVoyage] = useState([]);
    const [coordonnees, setCoordonnees] = useState([]);

    const [citiesOptionsList, setCitiesOptionList] = useState([]);
    const [markers,setMarkers] = useState();
    const [urlImg,setUrlImg] = useState("");

    const [idVoyageDelete, setIdVoyageDelete] = useState("");
    const [modifyCity, setModifyCity] = useState(false);
    const [newSouvenirDescription, setNewSouvenirDescription] = useState("");
    const [newSouvenirFile, setNewSouvenirFile] = useState();

    const handleNewDescriptionChange = (e) =>{
      setNewSouvenirDescription(e.target.value);
    }

    const handleNewSouvenirFile = (e) => {
      setNewSouvenirFile(e.target.files[0]);
    }

    const sendStepVoyageModification = async (id_etape_voyage) => {
      //e.preventDefault();
      const data = new FormData();
      data.append('id_etape_voyage',id_etape_voyage);
      data.append('souvenir_description', newSouvenirDescription);
      console.log(newSouvenirFile);
      data.append('souvenir_file',newSouvenirFile);

      let rep = await fetch('/voyage/modifyStep',
      {
          method: 'post',
          body: data,
      }
      );
      let res = await rep.json();
    }

    useEffect(() => {
      fetch("/voyages/1").then(
        res => res.json()
      ).then(
        data => {
          setUserVoyages(data);   
          filterUserVoyagesByContinent(data,0);
          cityFilteredByMainland(0);     
        }
      );
    }, []);

function getBasicInfos(infos) {
  setBasicInfos(infos);
}   


function getCityStep(cityInfos) {
  console.log(cityInfos);
  setCityStep(prev => [...prev, cityInfos]);
}

async function getEtapeVoyage(idVoyage){
  let url = "/voyage/"+idVoyage;
  await fetch(url).then(
    res => res.json()
  ).then(
    data => {
      setEtapesVoyage(data);   
      getStepVoyage(data);    
    }
  );
}

const handleDeleteIdVoyage = (e) =>{
    const voyageId = e.target.value;
    setIdVoyageDelete(voyageId);
    console.log(voyageId);
}
const deleteVoyage= async (idVoy) =>{
    const data = new FormData();
    data.append('idVoyageDelete',idVoy);

    let rep = await fetch('/voyage/delete',
    {
        method: 'post',
        body: data,
    }
    );
    let res = await rep.json();
}

function getStepVoyage(data){
  var villeList = data.map((city) => city.nom_ville);
  var cityToDisplay = citiesList.filter(city => villeList.includes(city.name))
  setCityFilteredByVoyage(cityToDisplay);
  
  var coordinatesCities = cityToDisplay.map((city) => city.coordinates);
  setCoordonnees(coordinatesCities);

}


const goBack = () => {
    if((currentIndex - 1) < 0){
        setCurrentIndex(4);
        filterUserVoyagesByContinent(userVoyages,4);
        cityFilteredByMainland(4);
    }else{
        setCurrentIndex(currentIndex - 1);
        filterUserVoyagesByContinent(userVoyages, currentIndex -1);
        cityFilteredByMainland(currentIndex - 1);
    }

    setCityFilteredByVoyage([]);
    setCoordonnees([]);
}

const goNext = () => {
    if((currentIndex + 1) > 4){
        setCurrentIndex(0);
        filterUserVoyagesByContinent(userVoyages,0);
        cityFilteredByMainland(0);
    }else{
        setCurrentIndex(currentIndex + 1);
        filterUserVoyagesByContinent(userVoyages,currentIndex + 1);
        cityFilteredByMainland(currentIndex + 1);
    }
    setCityFilteredByVoyage([]);
    setCoordonnees([]);
}

const handleChangeNumber = (e) => {
  setNbVoyages(e.target.value);
}

const startVoyageCreation = () => {
  setStartCreate(true);
}


function filterUserVoyagesByContinent(voyages,index){
  const continentList = voyages.filter(voyage => voyage.continent == mainlandList[index].name);
  setVoyagesFilteredByContinent(continentList);
}
const cityFilteredByMainland = (index) => {
  const citiesOptions = citiesList.filter(city => city.continent == mainlandList[index].name);
  const options = citiesOptions.map(city => city.name);
  setCitiesOptionList(options);
}

const createVoyage = async (e) => {
  e.preventDefault();
 
    const dataBasicInfo = new FormData();

    dataBasicInfo.append('titre',basicInfos.titre);
    dataBasicInfo.append('date_debut',basicInfos.date_debut);
    dataBasicInfo.append('date_fin',basicInfos.date_fin);
    dataBasicInfo.append('continent',mainlandList[currentIndex].name);
    dataBasicInfo.append('idUser', '1');

    console.log(basicInfos.date_debut);
    let rep = await fetch('/voyage/basicInfos',
    {
        method: 'post',
        body: dataBasicInfo,
    }
    );
    let res = await rep.json();
    const id = res;
  

  const array = []
  cityStep.map(step => {
    array.push({numeroEtape:step.numeroEtape, villeName:step.villeName, souv : step.souv,fileS :step.fileS[0]});
  });

  array.map(async obj => {
    
    const data = new FormData();
  
    Object.keys(obj).forEach(key => {
      data.append(key, obj[key]);
    });
    data.append('id_voyage',id);
    let response = await fetch('/voyage',
      {
          method: 'post',
          body: data,
      }
    );
    let res = await response.json();
    console.log("RES:"+JSON.stringify(res));
  });
  
  filterUserVoyagesByContinent(userVoyages,currentIndex);

}

const getOneStep = (nomVille) =>{
  
  const oneStep = etapesVoyage.filter(step => step.nom_ville == nomVille);
  setMarkers(oneStep[0]);

  const urlImg="/souvenirs_files/"+oneStep[0].file_souvenir;
  setUrlImg(urlImg)
}


  return (
<div className="wrapper">

  <article>
    <div>
        <div className="left-btn">
            <button className="btn" onClick={goBack}><FaChevronCircleLeft size={30}/></button>
        </div>
        <div className="right-btn">
            <button className="btn" onClick={goNext}><FaChevronCircleRight size={30}/></button>
        </div>
        
    </div>        
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={mainlandList[currentIndex].center} zoom={mainlandList[currentIndex].zoom}>
          <Geographies geography={geoUrl+mainlandList[currentIndex].mainland+".json"}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Line
            coordinates={coordonnees}
            stroke="#FF5533"
            strokeWidth={1}
            strokeLinecap="round"
          />
          {
          cityFilteredByVoyage.map((city) => (
            
            <Popup
            onOpen={() => getOneStep(city.name)}
            key={city.name}
            trigger={
              <Marker key={city.name} coordinates={city.coordinates}>
              <circle r={2} fill="#fff" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={city.markerOffset}
                style={{ fontFamily: "system-ui", fill: "red", fontSize: "10" }}
              >
                {city.name}
              </text>
            </Marker>
          }
            modal
            nested
          >
            <div>
              {markers != null && modifyCity == false ?
              <div>
                {markers.description_souvenir}  
                            
                <img src={urlImg} alt="souvenir"/>
                <Button onClick={()=>{setModifyCity(true);}}>Modifier</Button>
              </div>
              : 
              <>
                <Box p={10} style={{backgroundColor:"white", borderRadius:"10px"}}>
                  <Input mt={25} value={newSouvenirDescription} type="textarea" placeholder="Décrivez vos souvenirs" onChange={handleNewDescriptionChange} />
                  <Input mt={25} onChange={handleNewSouvenirFile} type='file'/>
                  <Button onClick={()=>{sendStepVoyageModification(markers.id_etape_voyage)}}>Valider</Button>
                </Box>
              </>
              }
              

            </div>
            
            </Popup>
        
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </article> 
    <aside>
        <h1>{mainlandList[currentIndex].name}</h1>
        <div className="list_voyages">

        <Popup
    trigger={<button className="button_create_voyage"> Créer un voyage </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Créer un voyage</div>
        <div className="content_container">
          <div className="content">
            {startCreate && nbVoyages > 0? 
              <>
                <ChakraProvider>
                  <PersonForm 
                    key={mainlandList[currentIndex].name} 
                    handleBasicInfosChange={getBasicInfos} 
                    handleCityStepChange={getCityStep}
                    nbStep={nbVoyages} 
                    continent={mainlandList[currentIndex].name}
                    basicInfos={basicInfos} 
                    cityStep={cityStep}
                    createVoyage={createVoyage}
                    citiesOptionsList={citiesOptionsList}
                  />
                </ChakraProvider>
               </>
              :
                
              <div className="start">
                <label>Lors de ce voyage, combien de ville avez-vous visité?</label><br/>
                <input type="number" className="nb_city" name="tentacles" onChange={handleChangeNumber} min="1" max="1000"/>
                <button className="start_create" onClick={() => {setStartCreate(true)}}>Suivant</button>
              </div>
          
          }
            
          </div>          
        </div>
      </div>
    )}
  </Popup>  
    </div>
        <div  className="btnVoyageWrapper">
          <ul className="columnVoyages">
            {voyagesFilteredByContinent.map((city) =>(
              <li key={city.id_voyage}>
                <div className="">
                  <button onClick={() => getEtapeVoyage(city.id_voyage)} className="btnVoyage">{city.titre}</button>
                  <button className="btn" onClick={()=> {deleteVoyage(city.id_voyage)}}><FaTrashAlt size={15} color="#CE5959"/></button>
                </div>
              </li>
              
            ))}
            
          </ul>
        </div>
    </aside>

</div>
  );
};

export default MapChart;
