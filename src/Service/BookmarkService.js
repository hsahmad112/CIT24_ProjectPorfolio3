//https://localhost:7154/api/bookmarks/person/2
import axios from 'axios';
import { GetHeader } from "../Store/store";

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

// Use find so get title or person from tmdb api: 
// Link: "https://api.themoviedb.org/3/find/" + ID +"?external_source=imdb_id&api_key=" + API_KEY

//let headers = GetHeader();


export async function isTitleBookmarked(id, setIsBookmarked, headers) {
    try{
        const response = await fetch(baseApiUrl + "bookmarks/title/" + id, {headers});
        
        switch (response.status) {
            case 401:
                console.log("Unauthorized/ Not Logged in");
    
                return false;
            case 200:
                console.log("Current user has this title bookmarked");
                setIsBookmarked(true)
                return true;
            case 404:
                console.log("Current user does not have this title bookmarked");
        
                return false;
        }
    
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }
}

export async function GetTitleBookmarks(headers){ 
    try {
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

export async function GetTitleBookmarksById(id, headers){
    try {
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

export async function GetPersonBookmarks(headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/", {headers});
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function GetPersonBookmarksById(id, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/" + id, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);

    }
    
}

export async function SavePersonBookmarksById(personId, annotation, headers){
    try {
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

export async function DeletePersonBookmarksById(personId, headers){
    try {
        const response = await axios.delete(baseApiUrl + `bookmarks/person/${personId}`, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function SaveTitleBookmarksById(titleId, annotation, headers){
    try {
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

export async function DeleteTitleBookmarksById(titleId, headers){
    try {
        const response = await axios.delete(baseApiUrl + `bookmarks/title/${titleId}`, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}
