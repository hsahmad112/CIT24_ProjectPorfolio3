import TitleSearchCard from './TitleSearchCard';
import PersonSearchCard from './PersonSearchCard';
import {Button, Row} from 'react-bootstrap'
import { useEffect, useState } from 'react';

export default function SearchPreview({ componentType, body, everythingResult }) {
  const baseUrl = process.env.REACT_APP_BASE_API_LINK;

  const [result, setResult] = useState(everythingResult);
  const [page, setPage] = useState(body.page);

  
  useEffect(()=>{
    console.log("we rerender preview... again");
  }, [body, everythingResult])
 
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
      // console.log(baseUrl  + "titles/search?searchTerm=" + body?.searchTerm.replace(/\s/g, '&') + "&page=" + body?.page + "&pageSize=" + body?.pageSize)
      const titleResponse = await fetch(baseUrl + "titles/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
      const data = (await titleResponse.json()).entities;
      setResult([...result, ...data]);
      setPage(x => x + 1);
    }
  }

  console.log("rendering search preview");
  console.log(everythingResult);

  // if(result){
  //   console.log("Search preview results logging");
  //   console.log(result);
  // }

  return (
    <div style={{textAlign: 'left'}}>
      <h1>{componentType === "personType" ? "Persons" : "Titles"}</h1>
      <Row md={2}>
        {result?.map((item) => (

        componentType === "personType" ? 
        <PersonSearchCard person={item} key={item.personId}/> :
        <TitleSearchCard title={item} key={item.titleId}/>

        ))}
      </Row>
      <Button style={{textAlign: 'right'}} onClick={()=> LoadMore()}>Load More</Button>  
    </div>
  );
}