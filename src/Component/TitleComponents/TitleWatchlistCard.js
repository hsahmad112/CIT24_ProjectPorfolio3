import { useEffect, useState } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { GetTitleBackdrop } from '../../Service/TitleService';
import { DeleteTitleBookmarksById} from '../../Service/BookmarkService';
import { GetHeader } from '../../Store/Store';
import { Trash } from 'react-bootstrap-icons';

export default function TitleWatchlistCard(title){ 
    const [titleBookmark, setTitleBookmark] = useState(null); //Title photo state       
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;    
    const navigate = useNavigate();
    let headers = GetHeader();

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

    async function DeleteTitleBookmark(){
        await DeleteTitleBookmarksById(title.data.titleId, setTitleBookmark, headers)
    }
 
    return( //Returns TitleCard containing annotation, name and photo. Used for watchlist
        <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}>
            <Card.Img 
                variant="top" 
                src={titleBookmark !== null ? imageUrl + titleBookmark : "/no-image.jpg" }
                onClick={()=> navigate("/title/" + title.data.titleId)}/>
            <Card.Body>
                <Card.Title>{title.data.titlePrimaryTitle} </Card.Title>
                <Card.Text>
                    {title.data.annotation !== "" ? title.data.annotation : <p style={{color: "lightgrey"}}>No annotation!</p>}
                </Card.Text>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={()=> navigate("/title/" + title.data.titleId)} variant="primary">Go to title</Button>
                    <Button onClick={DeleteTitleBookmark} variant="danger">
                        <Trash />
                    </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    ); 
}