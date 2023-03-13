import { Box, Input, Text } from "@chakra-ui/react";
import { Button, Stack } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import React, {useState} from "react";
import Popup from 'reactjs-popup';

export function BasicInfoStep(props) {
  const { nextStep } = useWizard();
  const [title, setTitle] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const returnBasicInfos=()=>{
    let array = {titre:title, date_debut :dateDebut, date_fin: dateFin};
    props.handleBasicInfosChange(array)
  }

  return (
    <Box p={10} style={{backgroundColor:"white", borderRadius:"10px"}}>
      <Text fontWeight={"bold"}>Informations générales</Text>
      <Input mt={25} placeholder="Titre" value={title} onChange={(e)=>{setTitle(e.target.value);}} />
      <div> 
        <label>Date début : </label>
        <input type="date" value={dateDebut} onChange={(e)=>{setDateDebut(e.target.value);} }  />
      </div>
      <div> 
        <label>Date de fin : </label>
        <input type="date" value={dateFin} onChange={(e)=>{setDateFin(e.target.value);} }  />
      </div>
      

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button onClick={()=>{returnBasicInfos(); nextStep();}}>Next</Button>
      </Stack>
    </Box>
  );
}
