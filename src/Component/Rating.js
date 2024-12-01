import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GetTitle, GetTitleById } from '../Service/TitleService';
import { useEffect, useState } from 'react';
import { data } from 'react-router';
import { useNavigate } from 'react-router';
export default function Rating({...props}){

    const {userId, titleId, rating} = props;
    //Later point, could get the createdAt and UpdateAt from prop?..

    const [title, setTitle] = useState([]);
    const[errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const titleFetcher = async () => {
        try {
            const titleData = await GetTitleById(titleId); //Maybe change backend? This results in lots of calls to DB, if lots of ratings. Each rating gives 1 extra call to DB for GetTitleById
            setTitle(titleData);
            setErrorMessage(null); //resets error message
            
        } catch (error) {
            console.log("Error in titleFetcher"+ error.status);
            
            setErrorMessage(error.message);
        }
    };

   

    useEffect(() => {

        titleFetcher();
        
    },[titleId]); //What should state lookout for? Is update of state necessary?

    const onClickHandler = () => {
        navigate("/title/"+title?.id);
    }

    return(
    <Card style={{ width: '18rem' }}>
     
            <Card.Img variant="top" onClick = {title?.posterUrl ? onClickHandler : undefined} src={title?.posterUrl || "https://upload.wikimedia.org/wikipedia/commons/3/37/YouTube_loading_symbol_2_%28stable%29.gif"} alt={title?.primaryTitle}/> {/*Should be nullable or not?*/}
           
                <Card.Body>
                <Card.Title style = {{color: 'red'}}>{errorMessage}</Card.Title> {/* shows the error message if truthy. Currently shows "Network Error", if refreshing page while pictures are loading..*/}
                <Card.Title  style = {title?.primaryTitle ? {cursor: 'pointer'}: {color: 'red'}} onClick ={title?.primaryTitle ? onClickHandler : undefined}>{title?.primaryTitle || "Loading..."}</Card.Title> {/* Like with the img, Title of movie is only clickable when loaded */}
                <Card.Text> {`Rating: ${rating}` || "Rating not loaded"} </Card.Text>
               {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>
        );
}