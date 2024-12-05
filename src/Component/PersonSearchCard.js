import { useEffect, useState } from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetPersonBackdrop } from '../Service/PersonService';

export default function PersonSearchCard ({person}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  

    const navigate = useNavigate();

    useEffect(()=>{
        async function getBackdrop(){
           // console.log("personid: " + person.personId)
            const res = (await GetPersonBackdrop(person.personId));
            if(res?.profile_path) setBackdropUrl(res.profile_path);
        } 
        getBackdrop();
    }, [person]);

    function displayYears(startYear, endYear){
        if(!startYear && !endYear) return "";
    
        if(!endYear){
          return "(" + startYear + ")";
        }
        return "(" + startYear + "-" + endYear + ")";
    }

    return (
                    // widht was not here before in Card
        <Card className='' style={{ width: '48%', padding: '10px', height: '200px'}}>
            <div className="col-md-4" style={{width: '100%', height: '100%'}}>
                <img className='personSearchCard'  onClick={() => navigate("../person/"  + person.personId)} src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></img>
                <CardTitle>{person.primaryName} {displayYears(person.birthYear, person?.deathYear)}</CardTitle>
            </div>
        </Card>
  
    );
}