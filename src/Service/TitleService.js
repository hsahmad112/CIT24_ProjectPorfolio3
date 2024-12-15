import { Pagination } from "../Helpers/URLHelper";

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

export function GetAllTitles(){
    let page = Math.floor(Math.random() * 500);

    return fetch(baseApiUrl + "titles" + Pagination(page, 10)).then(res => res.json());
}

// Could slipt it up into different functions fx. also making GetTitlePoster(id) that return the poster_path if we need it?
export async function GetTitleBackdrop(id, useBackdrop){
    try {
        const url = baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + api_key;
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();

        // Determine which array contains data
        let result = null;

        //could not use the switch, had to do the if else statements instead!
        if (data.movie_results && data.movie_results.length > 0) {
            result = data.movie_results;
        } else if (data.tv_results && data.tv_results.length > 0) {
            result = data.tv_results;
        } else if (data.tv_episode_results && data.tv_episode_results.length > 0) {
            result = data.tv_episode_results;
        } else if (data.tv_season_results && data.tv_season_results.length > 0) {
            result = data.tv_season_results;
        } else{
            return result; //Is null if no backdrop found
        }

        if(useBackdrop){
            return result[0].backdrop_path;
        }else{
            return result[0].poster_path;
        }
        

    } catch (error) {
        console.log("id er: " + id);
        console.error("Error fetching data:", error);
    }  
}


export async function GetTitleById(id){
    let data;
    const response = await fetch(baseApiUrl + "titles/" + id);

    if(!response.ok) throw new Error("We got a HTTP error. Status is: " + response.status);

    data = await response.json();
    if(data == null){ //is falsy if null or undefined
        console.log("no data");
        throw new Error("Something went badly wrong");
    }

    return data;
}

export async function GetSimilarMovies(id){
    let data;
    const response = await fetch(baseApiUrl + "titles/similar-titles?titleId=" + id);

    if(!response.ok) throw new Error("We got a HTTP error. Status is: " + response.status);

    data = await response.json();
    if(data == null){ //is falsy if null or undefined
        console.log("no data");
        throw new Error("Something went badly wrong");
    }

    return data;
}