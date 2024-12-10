import axios from "axios";

import { GetHeader } from "../Store/store";

const baseRatingApiUrl = process.env.REACT_APP_BASE_API_LINK + "users/rating/";
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

export async function GetAllRatings(){     
    try{
        let headers = GetHeader();
        const response = await fetch(baseRatingApiUrl, {headers});
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
    let headers = GetHeader();
    const response = await fetch(baseRatingApiUrl + id, {headers});
    
    if(!response.ok) {
        console.log("rating is not set for this title");
        return -2;
    }
    console.log("rating is set for this title ");
    return response.json();
}

export async function PostRating(titleId, rating){
    let headers = GetHeader();
    return await axios.post(baseRatingApiUrl, {titleId, rating}, {headers});
}

export async function PutRating(titleId, rating) {
    let headers = GetHeader();
    console.log("updating");
    console.log(baseRatingApiUrl + titleId);
    console.log(rating);
    return await axios.put(baseRatingApiUrl + titleId, {rating}, {headers});   
}


export async function DeleteRating(titleId){
    let headers = GetHeader();
    console.log("deleting");
    console.log(baseRatingApiUrl + titleId);
    return await axios.delete(baseRatingApiUrl + titleId, {headers});   
}