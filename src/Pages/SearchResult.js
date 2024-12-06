import { useEffect } from "react";
import SearchPreview from "../Component/SearchPreview";
import { useLocation } from "react-router";
import { useUser, getCookieValue } from "../Store/store";

//method only handles fetching data
 export async function FetchData(searchType, body){
    const baseUrl = process.env.REACT_APP_BASE_API_LINK;
    const fetchUrl = "/search?searchTerm=" + body.searchTerm + "&page=" + body.page + "&pageSize=" + body.pageSize;
    //const {token} = useUser();
    const headers =  {    
        "Content-Type": "application/json",
        "Authorization" : getCookieValue('Authorization')
    }

    switch (searchType) {
        case "everything":
            
            //returns both titles and persons, fethces concurrently using Promise.All, 
            const [personResponse, titleResponse] = await Promise.all([
                fetch(baseUrl  + "persons" + fetchUrl, {headers}),
                fetch(baseUrl + "titles" + fetchUrl),
            ]);
           
            //If response of either person or title is not HTTP OK status code, then we use the below 2 empty arrays to pass on 
            let personData = [];
            let titleData = [];

            if(personResponse.ok){
                //server response to fetch gets parsed to js object
                personData = await personResponse.json();  
            }
            else {
                console.warn("No persons found from search. Status code: ", personResponse.status); //Including HTTP status code in warning 
                personData = null;
            }

            if(titleResponse.ok){
                //server response to fetch gets parsed to js object
                titleData = await titleResponse.json();
            }
            else {
                console.warn("No titles found from search. Status code: ", titleResponse.status)
                titleData = null;
            }
            //returns object containing results containing persons and titels (possibly empty)
            return{persons: personData, titles: titleData};
            
        default:
            const response = await fetch(baseUrl + searchType + fetchUrl, { headers });
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
    const body = location.state.body;
     switch (searchType) {
        case "everything":
            selectedEntities.persons = result?.persons || {};
            selectedEntities.titles = result?.titles ||  {};
           
            console.log("this is our everything entity");
            console.log(selectedEntities);
            break;
        case "titles":
            selectedEntities.titles = result?.titles || [];
            console.log("this is our title entity");
            console.log(selectedEntities);
            break;
        case "persons":
            selectedEntities.persons = result?.persons || [];
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
            {result === undefined && <p>Der skete en fejl</p>} {/* Change this error message! */}
            { searchType === 'everything' &&(
                <>

                    <SearchPreview componentType={personType} body={body} searchResult={selectedEntities.persons} />
                    <SearchPreview componentType={titleType} body={body} searchResult={selectedEntities.titles}  />   
        
                </>       
                )
            }
            { searchType === 'persons' && selectedEntities?.persons.entities?.length > 0 && (
                <>
                    <SearchPreview componentType={personType} body={body} searchResult={selectedEntities.persons} />
                </>
                )
            }
            { searchType === 'titles' && selectedEntities?.titles?.entities?.length > 0 && (
                <>
                    <SearchPreview componentType={titleType} body={body} searchResult={selectedEntities.titles} />  
                </>
                )
            }
           

        </div>
    );

}

