import {GetAllRatings} from '../Service/RatingService';
import { useEffect, useState } from 'react';
import { GetTitle } from "../Service/TitleService";
import Rating from '../Component/Rating';



export default function UserRating(){
    const [userRatings, setUserRatings] = useState([]);
    
    
    useEffect(() =>{

        const fetchRatings = async () => {

            try{

            const ratings = await GetAllRatings();
         
            setUserRatings(ratings);

           
        }
        catch{
                console.log("error");
        }
        }

         
        fetchRatings();
    }, []);

 
    return (
     
        <>
     {
    userRatings.map((u, i) => <Rating key={i} {...u} />)
     
     }
     </>
     
    );
}