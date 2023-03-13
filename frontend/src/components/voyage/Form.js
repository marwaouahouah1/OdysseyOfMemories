import { Wizard } from "react-use-wizard";
import { BasicInfoStep } from "./BasicInfoStep";
import CityStep from "./CityStep";
import { Recapitulatif } from "./Recapitulatif";

export function PersonForm(props) {


  return (
    <form>
      <Wizard>
        <BasicInfoStep handleBasicInfosChange={props.handleBasicInfosChange} />
        {Array.from({ length: props.nbStep }, (_, i) => (
          <CityStep 
            key={i}
            handleCityStepChange={props.handleCityStepChange} 
            numero={i+1} 
            citiesOptionsList={props.citiesOptionsList}
          />
        ))}
        <Recapitulatif 
          continent={props.continent} 
          basicInfos={props.basicInfos} 
          cityStep={props.cityStep} 
          nbStep={props.nbStep}
          createVoyage={props.createVoyage}
          
        />
      </Wizard>
    </form>
  );
}
