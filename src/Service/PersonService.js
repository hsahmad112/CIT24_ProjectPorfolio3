const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

export async function GetPersonBackdrop(id){
    try {
        const url = baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + api_key;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        return data.person_results[0];
    
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function GetPerson(id){
    return fetch(baseApiUrl + "persons/"+ id).then(res => res.json());
}

export async function GetPersonById(id){
    let data;
    const response = await fetch(baseApiUrl + "person/"+ id);

    if(!response.ok) throw new Error("We got a HTTP error. Status is: " + response.status);

    data = await response.json();
    if(data == null){ //is falsy if null or undefined
        console.log("no data");
        throw new Error("Something went badly wrong");
    }

    return data;
}