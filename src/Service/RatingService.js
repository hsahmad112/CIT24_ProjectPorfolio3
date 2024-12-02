const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

export async function GetAllRatings(){   
    
    let data;
    try{
        const response = await fetch(baseApiUrl + "users/rating/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QHJ1YzIyLmRrIiwibmJmIjoxNzMyNzk3MTcyLCJleHAiOjE3MzUzODkxNzJ9.9Tf919r-EUMN1vKokyY-0zaozLeHTXATZsoRGiyplDc"
            }
        });
        if(!response){
            throw new Error("status code is:" + response.status);
        }
        data = await response.json();
        if(data == null){ //is falsy if null or undefined
            throw new Error("Something went badly wrong");
        }

    }
    catch(error){
        console.error("We got an error" + error.message);
    }

    
    return data;
}