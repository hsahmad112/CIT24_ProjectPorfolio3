export async function GetAllRatings(token){   

    const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
    const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

   
    
    try{
        const response = await fetch(baseApiUrl + "users/rating/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `${token}`
            }
        });
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


    
