import { useEffect, useState } from 'react';
import { Card, Button, CardTitle } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetPersonBackdrop } from '../Service/PersonService';

export default function PersonSearchCard ({person}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  

    useEffect(()=>{
        async function getBackdrop(){
            console.log("personid: " + person.personId)
            const res = (await GetPersonBackdrop(person.personId));
            if(res?.profile_path) setBackdropUrl(res.profile_path);
        } 
        getBackdrop();
    }, [person]);
    if(backdropUrl)
    {
        console.log("url: " + backdropUrl)
    }

    return (
        <Card style={{width: '50%', padding: '10px', height: '200px'}}>
            <div className="col-md-4 debug" style={{height: '100%'}}>
                <img className='personSearchCard' src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></img>
                <CardTitle>{person.primaryName}</CardTitle>
            </div>
        </Card>
  
    );
}