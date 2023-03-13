import React, {useState} from "react";
import { Box, Input } from "@chakra-ui/react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";


export function Recapitulatif(props) {

    return(
        <Box p={10} style={{backgroundColor:"white", borderRadius:"10px"}}>
            <Text fontWeight={"bold"}>Récapitulatif de votre voyage en {props.continent}</Text>
            <Text>{props.basicInfos.titre}</Text>
            <Text>Votre voyage a commencé le {props.basicInfos.date_debut} et s'est terminé le {props.basicInfos.date_fin}</Text>   
            <Text>Vous êtes allé dans {props.nbStep} villes !</Text><br/><br/>

            {
                props.cityStep.map((city) => (
                    <div key={city.numeroEtape}>
                        <Text>Ville : {city.villeName}</Text>
                        <Text>Une description de vos souvenirs : {city.souv}</Text>
                        <Text>Votre souvenir : {city.file} </Text>
                    </div>
                    
                ))
            }
            <Stack direction="row" spacing={4} justify="center" mt={5}>
                <Button onClick={props.createVoyage}>Valider</Button>
            </Stack>
        </Box>
    )
}