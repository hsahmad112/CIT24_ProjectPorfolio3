import {GetAllRatings} from '../Service/RatingService';
import { useEffect, useState } from 'react';
import { GetTitle } from "../Service/TitleService";
import Rating from '../Component/Rating';



export default function UserRating(){
    const [userRatings, setUserRatings] = useState([]);
    const[errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() =>{
        const fetchRatings = async () => {

            try{

            const ratings = await GetAllRatings();
         
            setUserRatings(ratings);
            setIsLoading(false); //should not render "loading" in UI when rating fetch is successful
           
        }
        catch(error){
                console.log("error in UserRating");
                setErrorMessage(error);
                setIsLoading(false);
        }
        }

         
        fetchRatings();
    }, []);

 
    return (
     
        <>
     {
    userRatings.map((u, i) => <Rating key={i} {...u} />) //need of key?, not currently used in Rating component 
     
     }
     </>
     
    );
}