import React, {useState} from "react";
import { Box, Input } from "@chakra-ui/react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import Autocomplete from "../common/Autocomplete";

const CityStep = (props) =>  {
    const { previousStep } = useWizard();
    const { nextStep } = useWizard();   
    const [ville,setVille] = useState("");
    const [souvenir, setSouvenir] = useState("");
    const [fileSouvenir, setFileSouvenir] = useState();

    const returnCityStep= () =>{
        const files = Array.from(fileSouvenir)
        let array = {numeroEtape:props.numero, villeName:ville, souv : souvenir,fileS :files};
        props.handleCityStepChange(array);
        
    }

    const handleFileChange = (e) =>{
        const fileS = e.target.files;
        setFileSouvenir(fileS)
    }

    const handleVilleChange = (ville) => {
        setVille(ville);
    }

    return(
        <>
        <Box p={10} style={{backgroundColor:"white", borderRadius:"10px"}}>
            <Text fontWeight={"bold"}>Ville {props.numero}</Text>
            <Autocomplete
                suggestions={props.citiesOptionsList}
                handleVilleChange={handleVilleChange}
            />
            <Input mt={25} value={souvenir} type="textarea" placeholder="Décrivez vos souvenirs" onChange={(e)=>{setSouvenir(e.target.value);}} />
            <Input mt={25} onChange={handleFileChange} type='file'/>

            <Stack direction="row" spacing={4} justify="center" mt={5}>
                <Button onClick={previousStep}>Previous</Button>
                <Button onClick={()=>{returnCityStep(); nextStep();}}>Next</Button>            
            </Stack>
        </Box>
        </>
    )
}
export default CityStep;