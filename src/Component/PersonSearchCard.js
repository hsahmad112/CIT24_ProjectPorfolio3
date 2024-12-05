import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
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
        <Card style={{width: '100%', padding: '10px', height: '200px'}}>
            <div className="col-md-4">
                <Card.Img height={"80px"}  src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></Card.Img>
                {person.primaryName}
            </div>
        </Card>
  
    );
}