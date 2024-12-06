import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieUrl = process.env.REACT_APP_TMDB_API_MOVIE_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

export function GetAllTitles(){
    //return (await axios.get(baseApiUrl+ "titles/")).data.entities;
    
    let page = Math.floor(Math.random() * 100);
    let pageSize = Math.floor(Math.random() * 10 + 7);
    return fetch(baseApiUrl + "titles?page=" + page + "&pageSize=" + pageSize).then(res => res.json());
    // return (await axios.get(baseApiUrl + "titles?page=" + page + "&pageSize=" + pageSize)).data.entities;
}

export function GetTitleBackdrop(id){
    return fetch(baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + process.env.REACT_APP_TMDB_API_KEY).then(res => res.json());
}
export function GetTitlePoster(id){
    return fetch(baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + process.env.REACT_APP_TMDB_API_KEY).then(res => res.json());
}

export async function GetTitleById(id){
    let data;
    const response = await fetch(baseApiUrl + "titles/"+ id);

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
    const response = await fetch(baseApiUrl + "titles/similar-titles?titleId="+ id);

    if(!response.ok) throw new Error("We got a HTTP error. Status is: " + response.status);

    data = await response.json();
    if(data == null){ //is falsy if null or undefined
        console.log("no data");
        throw new Error("Something went badly wrong");
    }

    return data;
}