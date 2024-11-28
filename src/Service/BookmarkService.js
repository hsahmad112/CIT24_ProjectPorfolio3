//https://localhost:7154/api/bookmarks/person/2
import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

export function GetPersonBookmarksById(){    
    return fetch(baseApiUrl + "bookmarks/person/", {
        headers: {
            "Content-Type": "application/json",
            //"Credentials": "include",
            "Authorization" : "bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHJ1YzIyLmRrIiwibmJmIjoxNzMyNzk3MTcyLCJleHAiOjE3MzUzODkxNzJ9.9Tf919r-EUMN1vKokyY-0zaozLeHTXATZsoRGiyplDc"
        }
    }).then(res => res.json());
}

export function GetPersonBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    return fetch(baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + process.env.REACT_APP_TMDB_API_KEY)
    .then(res => res.json());
}

export function GetTitleBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    const data = fetch(baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + process.env.REACT_APP_TMDB_API_KEY)
    .then(res => res.json());

    switch (data) {
        case data.movie_results != []:
            return data.movie_results;
        case data.tv_results != []:
            return data.tv_results;
        case data.movie_results != []:        
            return data.tv_results;
        case data.movie_results != []:        
            return data.tv_season_results;
        default:
            return null;
    }

}
