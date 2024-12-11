import TitleSearchCard from './TitleComponents/TitleSearchCard';
import PersonSearchCard from './PersonComponents/PersonSearchCard';
import {Button, Row} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { GetHeader } from "../Store/store";

export default function SearchPreview({ componentType, body, searchResult }) {
  const baseUrl = process.env.REACT_APP_BASE_API_LINK;

  const [result, setResult] = useState(searchResult.entities);
  const [page, setPage] = useState(body.page);
  const [errorMessage, setErrorMessage] = useState("");

  function FetchUrl(page){
    return "/search?searchTerm=" + body.searchTerm + "&page=" + page + "&pageSize=" + body.pageSize;
  }

  useEffect(()=>{
    setResult(searchResult.entities);
  }, [body, searchResult.entities])
 
  async function LoadMore() {
    if(componentType === "personType"){
      const type = "persons";
      const nextPage = page + 1;

      const personResponse = await fetch(baseUrl + type + FetchUrl(nextPage));
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
      let headers = GetHeader();
      const titleResponse = await fetch(baseUrl + type + FetchUrl(nextPage), {headers});
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

  // console.log("rendering search preview");
  // console.log(searchResult);

  // if(!Array.isArray(searchResult.entities)){  // isn't this what is inside the code below?
  //   return(

  //     <div style={{textAlign: 'left'}}>
  //       <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
  //       <Row md={2}>
  //         <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>
  //       </Row>     
  //     </div>

  //   );
  // }else{
    return (
      <div style={{textAlign: 'left'}}>
        <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
        <Row md={3}>

          {
            searchResult.entities?.length > 0 ?
            result.map((e) => (
              componentType === "personType" ? 
              <PersonSearchCard person={e} key={e.personId}/> :
              <TitleSearchCard title={e} key={e.titleId}/>

            )) : <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>    
          }

        </Row>
        {(errorMessage || !Array.isArray(searchResult.entities)) ? <p>{errorMessage}</p> : <Button style={{float: 'right', marginRight: "10px"}} onClick={()=> LoadMore()}>See More</Button>}
      </div>
    );
  //}
}
