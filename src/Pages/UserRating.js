import {GetAllRatings} from '../Service/RatingService';
import { useEffect, useState } from 'react';
import { GetTitle } from "../Service/TitleService";
import Rating from '../Component/Rating';
import { useUser } from '../Store/store';
import { useNavigate } from 'react-router';


export default function UserRating(){
    const [userRatings, setUserRatings] = useState([]);
    const[errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let navigate = useNavigate();

    const {token} = useUser();
    
    useEffect(() =>{
        const fetchRatings = async () => {

          

            const ratings = await GetAllRatings(token);
         
            if(ratings.success){
            setUserRatings(ratings.data);
            setIsLoading(false); //should not render "loading" in UI when rating fetch is successful
            }
            else {
                
                setIsLoading(false);

                switch (ratings.message) {
                    case "401":
                        setErrorMessage("401");
                        //navigate("/login");
                        break;
                
                    default:
                        break;
                }

                
            }
            
        }
         
        fetchRatings();
    }, []);

    useEffect(() => {
        const errorCodeHandler = () => {
            if (errorMessage === "401") {
                console.log("Unauthorized. We redirect in 5 sec my frined");
                setTimeout(() => {navigate("/login")}, 5000);  //Needs to be in lambda function, otherwise navigate fires imediately
                
            }
        };

        errorCodeHandler();
    }, [errorMessage]);

    return (
     
        <>
     {
    errorMessage !== "401" && userRatings.map((u, i) => <Rating key={i} {...u} />) //need of key?, not currently used in Rating component 
     
     }
      {
    errorMessage === "401" && <p>You must sign in. Redirecting in 5 sec:</p> //need of key?, not currently used in Rating component 
     
     }
     </>
     
    );
}