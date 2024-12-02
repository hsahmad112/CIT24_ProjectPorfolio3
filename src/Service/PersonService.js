const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

export async function GetPersonBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    try {
        const url = baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + api_key;
        const response = await fetch(url);
        //console.log("url: "+url);
        // Could remove this, was only for 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("&&Person data:");
        console.log(data.person_results);
        return data.person_results;
    
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function GetPerson(id){
    return fetch(baseApiUrl + "persons/"+ id).then(res => res.json());
}