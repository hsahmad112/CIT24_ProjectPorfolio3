import { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetPersonBackdrop } from '../../Service/PersonService';
import { DeletePersonBookmarksById } from '../../Service/BookmarkService';
import { GetHeader } from '../../Store/store';
import { Trash } from 'react-bootstrap-icons'; 

export default function PersonCard(person){
    const [personBookmark, setPersonBookmark] = useState(null);
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;    
    const navigate = useNavigate();
    let headers = GetHeader();

    useEffect(() =>{
        const getPersonBookmark = async () => {
            if(person){
                try {
                    setPersonBookmark((await GetPersonBackdrop(person.data.personId)));
                } catch (error) {
                    console.log(error);
                }
            }     
        }
        getPersonBookmark();
    }, [person])

    async function DeletePersonBookmark(){
        console.log("Trying ti delete bookmark for: "+personBookmark?.name);
        await DeletePersonBookmarksById(person.data.personId, setPersonBookmark, headers)
    }
    
    if(personBookmark){
        return(
            <Card style={{ width: '16rem', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>
                        {personBookmark?.name !== undefined ? personBookmark?.name : "No Name"}
                    </Card.Title>
                    <Card.Img style={{padding: '0px'}} variant="top" src={                      
                        personBookmark?.profile_path !== undefined ? 
                        imageUrl + personBookmark?.profile_path :
                        "/no-image.jpg"
                        } 
                    />
                    <Card.Text>
                        {person.data.annotation !== "" ? person.data.annotation : <p style={{color: "lightgrey"}}>No annotation!</p>}
                    </Card.Text>
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={()=> navigate("/person/" + person.data.personId)} variant="primary">Go to person</Button>
                        <Button onClick={DeletePersonBookmark} variant="danger">
                            <Trash />
                        </Button>
                    </ButtonGroup>
                </Card.Body>             
            </Card>
        );
    }
}