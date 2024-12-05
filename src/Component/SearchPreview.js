import { cloneElement } from "react";
import TitleSearchCard from './TitleSearchCard';
import PersonSearchCard from './PersonSearchCard';
import {Row} from 'react-bootstrap'

export default function SearchPreview({ componentType, everythingResult }) {
  return (
    <div style={{textAlign: 'left'}}>
      <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
      <Row md={2}>
        {everythingResult.map((e, index) => (
          componentType === "personType" ? 
          <PersonSearchCard person={e} key={index}/> :
          <TitleSearchCard title={e} key={index}/>

        ))}
      </Row>
     
    </div>
  );
}