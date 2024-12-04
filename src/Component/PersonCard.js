import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import {GetPersonBookmarks, GetPersonBackdrop} from '../Service/BookmarkService';

export default function PersonCard(person){
    const [personBookmark, setPersonBookmark] = useState(null);
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;    
    const navigate = useNavigate();
   
    useEffect(() =>{
        const getPersonBookmark = async () => {
            if(person){
                try {
                    setPersonBookmark((await GetPersonBackdrop(person.data.personId)).person_results);
                } catch (error) {
                    console.log(error);
                }
            }     
        }
        getPersonBookmark();
    }, [person])
    
    if(personBookmark){
        return(
            <Card 
                style={{ width: '16rem', margin: '10px' }} 
                onClick={()=> navigate("/person/" + person.data.personId)}>
                <Card.Body>
                    <Card.Title>
                        {personBookmark[0]?.name !== undefined ? personBookmark[0]?.name : "No Name"}
                    </Card.Title>
                    <Card.Img style={{padding: '0px'}} variant="top" src={                      
                        personBookmark[0]?.profile_path !== undefined ? 
                        imageUrl + personBookmark[0]?.profile_path :
                        "/no-image.jpg"
                        } 
                    />
                    <Card.Text>
                        {person.data.annotation}
                    </Card.Text>
                    <Button variant="primary">Go to person</Button>
                </Card.Body>             
            </Card>
            );
    
    }
}