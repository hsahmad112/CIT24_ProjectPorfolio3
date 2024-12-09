//https://localhost:7154/api/bookmarks/person/2
import axios from 'axios';
import { GetHeader } from "../Store/store";

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

// Use find so get title or person from tmdb api: 
// Link: "https://api.themoviedb.org/3/find/" + ID +"?external_source=imdb_id&api_key=" + API_KEY

export async function GetTitleBookmarks(){ 
    try {
        let headers = GetHeader();
        const response = await fetch(baseApiUrl + "bookmarks/title/", {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function GetTitleBookmarksById(id){
    try {
        let headers = GetHeader();
        const response = await fetch(baseApiUrl + "bookmarks/title/" + id, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
        //return null;
    }
    
}

export async function GetPersonBookmarks(){
    try {
        let headers = GetHeader();
        const response = await fetch(baseApiUrl + "bookmarks/person/", {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function GetPersonBookmarksById(id){
    try {
        let headers = GetHeader();
        const response = await fetch(baseApiUrl + "bookmarks/person/" + id, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
        //return null;
    }
    
}

export async function SavePersonBookmarksById(personId, annotation){
    try {
        let headers = GetHeader();
        const response = await axios.post(baseApiUrl + "bookmarks/person/", { personId, annotation }, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

export async function DeletePersonBookmarksById(token, personId){
    try {
        let headers = GetHeader();
        const response = await axios.delete(baseApiUrl + `bookmarks/person/${personId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `${token}`}
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}


export async function SaveTitleBookmarksById(titleId, annotation){
    try {
        let headers = GetHeader();
        const response = await axios.post(baseApiUrl + "bookmarks/title/", { titleId, annotation },  {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function DeleteTitleBookmarksById(token, titleId){
    try {
        const response = await fetch(baseApiUrl + `bookmarks/title/${titleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `${token}`}
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}
