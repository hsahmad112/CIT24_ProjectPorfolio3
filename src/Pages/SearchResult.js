import { Form } from "react-bootstrap";
import SearchPreview from "../Component/SearchPreview";
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState} from 'react';
import { useUser } from "../Store/store";
import PersonSearchCard from "../Component/PersonSearchCard";
import TitleSearchCard from "../Component/TitleSearchCard";


export async function Search(e, searchQuery){
    const {userName, token, searchType, searchResult, setSearchType, setSearchResult, login, logout } = useUser();
    const [result, setResult] = useState([]);
   

        const [body, setBody] = useState({
            id : null,
            searchTerm : searchQuery,
            page : '1',
            pageSize : '10'
      })
    
    e.preventDefault();
    console.log("searching for", searchType);
    console.log("sending body", body); 
    

    switch (searchType) {
    case "everything":
        const personResponse = await fetch(process.env.REACT_APP_BASE_API_LINK  + "persons/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
        const titleResponse = await fetch(process.env.REACT_APP_BASE_API_LINK + "titles/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
        const personData = await personResponse.json();
        const titleData = await titleResponse.json();
        setSearchResult(prevData => ({... prevData, persons: personData, titles: titleData}));
          
        break;

    default:
        const response = await fetch(process.env.REACT_APP_BASE_API_LINK + searchType + "/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
        const data = await response.json();
        setResult(data);
        break;

    }
    console.log("printer", result); //implement this into a SearchResultPage
    console.log("printing Everything result", searchResult);

    }
    


    


export default function SearchResult(){

    const {userName, token, searchType, searchResult, setSearchType, setSearchResult, login, logout } = useUser();



    return(
    <div>
        <Form>
            <SearchPreview 
            children={ <PersonSearchCard/>}
            EverythingResult={searchResult}
            />
               <SearchPreview 
            children={ <TitleSearchCard/>}
            EverythingResult={searchResult}
            />

        </Form>
    </div>);
}