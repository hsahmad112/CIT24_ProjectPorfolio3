import axios from "axios";

import { getCookieValue } from "../Store/store";

const baseRatingApiUrl = process.env.REACT_APP_BASE_API_LINK + "users/rating/";
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

// trying to get it from store, doesn't allow it, it's like it make the async call before it has the header
const headers = { 
    "Content-Type": "application/json",
    "Authorization" : getCookieValue("Authorization") 
}

export async function GetAllRatings(){     
    try{
        const response = await fetch(baseRatingApiUrl, { headers });
        if(!response.ok){
            throw new Error (response.status);
        }
        const data = await response.json();
        if(data == null){ //is falsy if null or undefined
            throw new Error("Something went badly wrong");
        }
        return {success: true, data};
    }
    catch(error){   
        return {success: false, message: error.message};
    }      
}

export async function GetRatingById(id){
    const response = await fetch(baseRatingApiUrl + id, {headers});
    
    if(!response.ok) {
        console.log("returning false");
        return -2;
    }
    console.log("returning true");
    return response.json();
}

export async function PostRating(titleId, rating){
    return await axios.post(baseRatingApiUrl, {titleId, rating}, {headers});
}

export async function PutRating(titleId, rating) {
    console.log("updating");
    console.log(baseRatingApiUrl + titleId);
    console.log(rating);
    return await axios.put(baseRatingApiUrl + titleId, {rating}, {headers});   
}
