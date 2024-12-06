import TitleSearchCard from './TitleSearchCard';
import PersonSearchCard from './PersonSearchCard';
import {Button, Row} from 'react-bootstrap'
import { useEffect, useState } from 'react';

export default function SearchPreview({ componentType, body, searchResult }) {
  const baseUrl = process.env.REACT_APP_BASE_API_LINK;

  const [result, setResult] = useState(searchResult);
  const [page, setPage] = useState(body.page);

  useEffect(()=>{
    //console.log("we rerender preview... again");
  }, [body, result, searchResult])
 
  async function LoadMore() {
    if(componentType === "personType"){
      const nextPage = page + 1;
      // console.log(baseUrl  + "persons/search?searchTerm=" + body?.searchTerm.replace(/\s/g, '&') + "&page=" + page + "&pageSize=" + body?.pageSize)
      const personResponse = await fetch(baseUrl  + "persons/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + nextPage + "&pageSize=" + body.pageSize);
      const data = (await personResponse.json()).entities;
      
      console.log("person response");
      console.log(data);
      setResult([...result, ...data]);
      setPage(x => x + 1); // is it not supposed to set the state and be used before the next render if written like so?
    }
    else{
      const nextPage = page + 1;
      // console.log(baseUrl  + "titles/search?searchTerm=" + body?.searchTerm.replace(/\s/g, '&') + "&page=" + body?.page + "&pageSize=" + body?.pageSize)
      const titleResponse = await fetch(baseUrl + "titles/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + nextPage + "&pageSize=" + body.pageSize);
      const data = (await titleResponse.json()).entities;
      setResult([...result, ...data]);
      setPage(x => x + 1);
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
        <Row md={2}>

          {
            (searchResult.entities.length > 0)  && (searchResult.entities !== undefined) ?
            searchResult.entities.map((e) => (
              componentType === "personType" ? 
              <PersonSearchCard person={e} key={e.personId}/> :
              <TitleSearchCard title={e} key={e.titleId}/>

            )) : <p>No results for {componentType === "personType" ? "persons" : "titles"}</p>
            
          }

        </Row>
        <Button style={{textAlign: 'right'}} onClick={()=> LoadMore()}>Load More</Button>
      </div>
    );
  }
}
