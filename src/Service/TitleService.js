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

export async function GetTitle(id){
    return fetch(baseApiUrl + "titles/"+ id).then(res => res.json());
    //return (await axios.post(baseApiUrl + id)).data;
}