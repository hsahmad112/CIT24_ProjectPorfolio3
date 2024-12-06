import { Form } from "react-bootstrap";
import SearchPreview from "../Component/SearchPreview";
import PersonSearchCard from "../Component/PersonSearchCard";
import TitleSearchCard from "../Component/TitleSearchCard";
import { useLocation } from "react-router";
import { useUser } from "../Store/store";


//method only handles fetching data
 export async function fetchData(searchType, body){
    const baseUrl = process.env.REACT_APP_BASE_API_LINK;

    switch (searchType) {
        case "everything":
            
            //returns both titles and persons, fethces concurrently using Promise.All, 
            const [personResponse, titleResponse] = await Promise.all([
                fetch(baseUrl  + "persons/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize),
                fetch(baseUrl + "titles/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize),
            ]);
           
            //If response of either person or title is not HTTP OK status code, then we use the below 2 empty arrays to pass on 
            let personData = [];
            let titleData = [];
            
            if(personResponse.ok){
                //server response to fetch gets parsed to js object
                personData = await personResponse.json();  
            }
            else{
                console.warn("No persons found from search. Status code: ", personResponse.status); //Including HTTP status code in warning 
            }

            if(titleResponse.ok){
                //server response to fetch gets parsed to js object
                titleData = await titleResponse.json();
            }
            else {
                console.warn("No titles found from search. Status code: ", titleResponse.status)
            }
            //returns object containing results containing persons and titels (possibly empty)
            return{persons: personData, titles: titleData};
            
        default:
            const response = await fetch(baseUrl + searchType +"/search?searchTerm=" + body.searchTerm.replace(/\s/g, '&') + "&page=" + body.page + "&pageSize=" + body.pageSize);
            if(response.ok){
                const data = await response.json();
                return {persons: data, titles: data}; //Should prop find a better way, than duplicating data in persons/titles....
            }
            else {
                console.error(`Could not fetch ${searchType}`, response.status)
                
            }
            
            
            
    }

}

export default  function SearchResult(){
    //gives us access to states passed through navigation.js 
    const location = useLocation();



    //const { searchType } = useUser();
    
    //make a try catch here -- Currently made a if statement, should be sufficient? 

    let result, searchType;
    if (location.state.result){  
        result = location.state.result;
        searchType = location.state.searchType; 
    }   else {
        console.error("NOTE TO DEV: Location state is not defined"); //Using .error to indicate, that issue is critical
    }   

    //  const personEntities = [];
    // const titleEntities = [];

    const selectedEntities = {}; //One object for searhResult, used to store both title/persons indivually depending on the case:

     switch (searchType) {
        case "everything":
            selectedEntities.persons = result?.persons || [];
            selectedEntities.titles = result?.titles|| [];
           
            console.log("this is our everything entity");
            console.log(selectedEntities);
            break;
        case "titles":
            selectedEntities.titles = result?.titles|| [];
            console.log("this is our title entity");
            console.log(selectedEntities);
            break;
        case "persons":
            selectedEntities.persons = result?.persons|| [];
            console.log("this is our person entity");
            console.log(selectedEntities);
            break;
        default:
            console.warn("Selected advanced search feature is invalid or not correct") //.warn is used here to indicate, it's not critical error
            result = undefined; //This will trigger warning shown in UI, as below in return:
            break;
     }

    const personType = "personType";
    const titleType = "titleType";

    return(
        <div className="container" >
{console.log("entities:", result)}
{result === undefined && <p>Der skete en fejl</p>} 
            { searchType === 'everything'  && (selectedEntities?.persons?.entities?.length > 0 || selectedEntities?.titles?.entities?.length > 0) &&(
                <>
                <p>vi har her everything</p>
                    <SearchPreview componentType={personType} searchResult={selectedEntities.persons.entities} />
                    <SearchPreview componentType={titleType} searchResult={selectedEntities.titles.entities}  />
                </>       
                )
            }
            { searchType === 'persons' && selectedEntities?.persons?.entities?.length > 0 && (
            <>
            <p>vi her her persons</p>
                <SearchPreview componentType={personType} searchResult={selectedEntities.persons.entities} />
                </>
                )
            }
            { searchType === 'titles' && selectedEntities?.titles?.entities?.length > 0 && (
            <>
            <p>Vi har her titles</p>
                <SearchPreview componentType={titleType} searchResult={selectedEntities.titles.entities} />  
                </>
                )
            }
           

        </div>
    );

}

