import { Form } from "react-bootstrap";
import SearchPreview from "../Component/SearchPreview";
import PersonSearchCard from "../Component/PersonSearchCard";
import TitleSearchCard from "../Component/TitleSearchCard";
import { useLocation } from "react-router";


//method only handles fetching data
 export async function fetchData({searchType, body}){
    const baseUrl = process.env.REACT_APP_BASE_API_LINK;

    switch (searchType) {
        case "everything":
            
            //returns both titles and persons
            const personResponse = await fetch(baseUrl  + "persons/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
            const titleResponse = await fetch(baseUrl + "titles/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
            
            //server response to fetch gets parsed to js object
            const personData = await personResponse.json();
            const titleData = await titleResponse.json();
            //returns object containing results containing persons and titels
            return{persons: personData, titles: titleData};
            
        default:
            const response = await fetch(baseUrl + searchType + "/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
            const data = await response.json();
            
            return data;
    }

}



export default  function SearchResult(){
    //gives us access to states passed through navigation.js 
    const location = useLocation();

    //make a try catch here  
    let result = location.state.result;

    //using empty array in case no results in either/both of persons/titles
    const personEntities = result.persons?.entities || [];
    const titleEntities = result.titles?.entities || [];
    const personType = "personType";
    const titleType = "titleType";

    return(
        <div className="container" >
            <SearchPreview componentType={personType} everythingResult={personEntities} />
            <SearchPreview componentType={titleType} everythingResult={titleEntities}  />

        </div>
    );

}

