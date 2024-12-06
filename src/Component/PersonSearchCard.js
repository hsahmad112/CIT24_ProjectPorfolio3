import { useEffect, useState } from 'react';
import { Card, Button, CardTitle } from 'react-bootstrap';
import { GetPersonBackdrop } from '../Service/PersonService';
import { useNavigate } from "react-router"; 

export default function PersonSearchCard ({person}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  
    const navigate = useNavigate();

    useEffect(()=>{
        async function getBackdrop(){
            //console.log("personid: " + person.personId)
            const res = (await GetPersonBackdrop(person.personId));
            if(res?.profile_path) setBackdropUrl(res.profile_path);
        } 
        getBackdrop();
    }, [person]);

    return (
        <Card 
            style={{width: '48%', margin: '10px', height: '200px'}} 
            onClick={()=> navigate("/person/" + person.personId)}>
            <div className="col-md-4 debug" style={{height: '100%', width: '100%'}}>
                <img className='personSearchCard' src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></img>
                <CardTitle>{person.primaryName}</CardTitle>
            </div>
        </Card>
  
    );
}