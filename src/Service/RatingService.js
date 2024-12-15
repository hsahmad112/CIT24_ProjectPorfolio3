import axios from "axios";
import { GetHeader } from "../Store/store";
import { Pagination } from "../Helpers/URLHelper";

const baseRatingApiUrl = process.env.REACT_APP_BASE_API_LINK + "users/rating/";

export async function GetAllRatings(queryParams){     
    try{
        let headers = GetHeader();
        const response = await fetch(baseRatingApiUrl + Pagination(queryParams.page, queryParams.pageSize), {headers});
        if(!response.ok){
            throw new Error (response.status);
        }
        const data = await response.json();
        if(data == null){ 
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
        return -2;
    }
    return (await response.json()).rating;
}

export async function PostRating(titleId, rating){
    let headers = GetHeader();
    return await axios.post(baseRatingApiUrl, {titleId, rating}, {headers});
}

export async function PutRating(titleId, rating) {
    let headers = GetHeader();
    return await axios.put(baseRatingApiUrl + titleId, {rating}, {headers});   
}

export async function DeleteRating(titleId){
    let headers = GetHeader();
    return await axios.delete(baseRatingApiUrl + titleId, {headers});   
}