import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetTitleBackdrop } from '../../Service/TitleService';

export default function TitleCard(title){
    const [titleBookmark, setTitleBookmark] = useState(null);        
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;    
    const navigate = useNavigate();

    useEffect(() =>{
        const getTitleBookmark = async () => {
            try {
                setTitleBookmark(await GetTitleBackdrop(title.data.titleId, true));
            } catch (error) {
                console.error("Error in TitleCard: " + error);
            }

        }
        getTitleBookmark();
    }, [title]);

    if(titleBookmark){   
        return(
            <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/title/" + title.data.titleId)}>
                <Card.Img variant="top" src={imageUrl + titleBookmark}/>
                <Card.Body>
                    <Card.Title>{title.data.titlePrimaryTitle} </Card.Title> {/* Naming convention of .... data.titlePrimaryTitle could be diffenrent. E.g. could be called primaryTitle*/}
                    <Card.Text> {title.data.annotation} </Card.Text>
                    <Button variant="primary">Go to title</Button>
                </Card.Body>
            </Card>
        );
    }  
}