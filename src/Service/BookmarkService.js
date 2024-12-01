//https://localhost:7154/api/bookmarks/person/2
import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;


export async function GetTitleBookmarksById(){    

    try {
        const response = await fetch(baseApiUrl + "bookmarks/title/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Credentials": "include", // cannot get this to work!
                "Authorization" : "bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHJ1YzIyLmRrIiwibmJmIjoxNzMyNzk3MTcyLCJleHAiOjE3MzUzODkxNzJ9.9Tf919r-EUMN1vKokyY-0zaozLeHTXATZsoRGiyplDc"
            }
        });
        // Could remove this, was only for 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Logging data from service:")
        console.log(data[0].titleId);
        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function GetPersonBookmarksById(){    

    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //"Credentials": "include", // cannot get this to work!
                "Authorization" : "bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHJ1YzIyLmRrIiwibmJmIjoxNzMyNzk3MTcyLCJleHAiOjE3MzUzODkxNzJ9.9Tf919r-EUMN1vKokyY-0zaozLeHTXATZsoRGiyplDc"
            }
        });
        // Could remove this, was only for 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);
        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function GetPersonBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    try {
        const url = baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + api_key;
        const response = await fetch(url);
        console.log("url: "+url);
        // Could remove this, was only for 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Person data:");
        console.log(data);
        return data
    
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function GetTitleBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    try {
        const url = baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + api_key;
        const response = await fetch(url);
        console.log("title url: "+ url);
    
        // Could remove this, was only for 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        // console.log("Title data:");
        // console.log(data);

        // Determine which array contains data
        let result = null;

        // could not use the switch, had to do the if else statements instead!
        if (data.movie_results && data.movie_results.length > 0) {
            result = data.movie_results;
        } else if (data.tv_results && data.tv_results.length > 0) {
            result = data.tv_results;
        } else if (data.tv_episode_results && data.tv_episode_results.length > 0) {
            result = data.tv_episode_results;
        } else if (data.tv_season_results && data.tv_season_results.length > 0) {
            result = data.tv_season_results;
        }

        // console.log("SwitchData is : ");
        // console.log(result);
        return result;


    } catch (error) {
        console.error("Error fetching data:", error);
    }  

}
