import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetTitleBackdrop } from '../Service/TitleService';

export default function TitleCard(title){
    const [titleBookmark, setTitleBookmark] = useState(null);        
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;    
    const navigate = useNavigate();

    useEffect(() =>{
        const getTitleBookmark = async () => {
            if(title){
                try {
                    setTitleBookmark(await GetTitleBackdrop(title.data.titleId, true));
                } catch (error) {
                    console.log(error);
                }
            }
    
        }
        getTitleBookmark();
    }, [title]);

    if(titleBookmark){   
        return(
            <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/title/" + title.data.titleId)}>
                <Card.Img variant="top" src={imageUrl + titleBookmark}/>
                <Card.Body>
                    <Card.Title> {title.primaryTitle} </Card.Title>
                    <Card.Text> {title.data.annotation} </Card.Text>
                    <Button variant="primary">Go to title</Button>
                </Card.Body>
            </Card>
            );
    }  
}