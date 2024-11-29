import axios from "axios";

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK + "/users/";
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

export async function GetRatingById(id){
    return fetch(baseApiUrl + "rating/"+ id).then(res => res.json());
}

export async function GetRatings(id){
    return fetch(baseApiUrl + "rating/"+ id).then(res => res.json());
}

export async function PostRating(id, rating){

    console.log(baseApiUrl + "rating");
    console.log("id: " + id, " rating: " + rating);
    // var tokenStr = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHJ1Yy5kayIsIm5iZiI6MTczMjg4NjUwMywiZXhwIjoxNzM1NDc4NTAzfQ.BntKk2cimegsLDAWCKNhAM03IWPBtm0c3ek3RzTTjoA";
    // return (await axios.post(baseApiUrl + "rating", {id, rating}, { headers: {"Authorization" : `Bearer ${tokenStr}`} }));

}