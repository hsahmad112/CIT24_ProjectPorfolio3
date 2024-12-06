import { cloneElement } from "react";
import TitleSearchCard from './TitleSearchCard';
import PersonSearchCard from './PersonSearchCard';
import {Row} from 'react-bootstrap'

export default function SearchPreview({ componentType, searchResult }) {
  console.error(searchResult);
  if(!Array.isArray(searchResult.entities)){
    return(

      <div style={{textAlign: 'left'}}>
        <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
        <Row md={2}>
          <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>
        </Row>     
      </div>

    );
  }else{
    return (
      <div style={{textAlign: 'left'}}>
        <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
        <Row md={2}>

          {
            (searchResult.entities.length > 0)  && (searchResult.entities !== undefined) ?
            searchResult.entities.map((e) => (
              componentType === "personType" ? 
              <PersonSearchCard person={e} key={e}/> :
              <TitleSearchCard title={e} key={e}/>

            )) : <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>
            
          }

        </Row>
      
      </div>
    );
  }
}