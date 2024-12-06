import TitleSearchCard from './TitleSearchCard';
import PersonSearchCard from './PersonSearchCard';
import {Button, Row} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { getCookieValue } from "../Store/store";

export default function SearchPreview({ componentType, body, searchResult }) {
  const baseUrl = process.env.REACT_APP_BASE_API_LINK;

  const [result, setResult] = useState(searchResult.entities);
  const [page, setPage] = useState(body.page);
  const [errorMessage, setErrorMessage] = useState("");

function FetchUrl(page){
  return "/search?searchTerm=" + body.searchTerm + "&page=" + page + "&pageSize=" + body.pageSize;
}
 //const {token} = useUser();
  const headers =  {    
      "Content-Type": "application/json",
      "Authorization" : getCookieValue('Authorization')
  }

  useEffect(()=>{
    setResult(searchResult.entities);
  }, [body, searchResult.entities])
 
  async function LoadMore() {
    if(componentType === "personType"){
      const type = "persons";
      const nextPage = page + 1;
      // console.log(baseUrl  + "persons/search?searchTerm=" + body?.searchTerm.replace(/\s/g, '&') + "&page=" + page + "&pageSize=" + body?.pageSize)
      const personResponse = await fetch(baseUrl + type + FetchUrl(nextPage), {headers} );
      const data = (await personResponse.json()).entities;
      
      if(data) {
        setResult([...result, ...data]);
        setPage(x => parseInt(x) + 1); // is it not supposed to set the state and be used before the next render if written like so?
      }
      else {
        setErrorMessage("problably no more results");
        // probably no more results
      }
    }
    else{
      const type = "titles";
      const nextPage = page + 1;
      // console.log(baseUrl  + "titles/search?searchTerm=" + body?.searchTerm.replace(/\s/g, '&') + "&page=" + body?.page + "&pageSize=" + body?.pageSize)
      const titleResponse = await fetch(baseUrl + type + FetchUrl(nextPage), {headers} );
      const data = (await titleResponse.json()).entities;

      if(data) {
        setResult([...result, ...data]);
        setPage(x => parseInt(x) + 1); // is it not supposed to set the state and be used before the next render if written like so?
      }
      else {
        setErrorMessage("problably no more results");
        // probably no more results
      }
    }
  }

  console.log("rendering search preview");
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
        <Row md={3}>

          {
            (searchResult.entities.length > 0)  && (searchResult.entities !== undefined) ?
            result.map((e) => (
              componentType === "personType" ? 
              <PersonSearchCard person={e} key={e.personId}/> :
              <TitleSearchCard title={e} key={e.titleId}/>

            )) : <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>
            
          }

        </Row>
        {errorMessage ? <p>{errorMessage}</p> : <Button style={{textAlign: 'right'}} onClick={()=> LoadMore()}>Load More</Button>}
      </div>
    );
  }
}
