import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GetTitle, GetTitleById } from '../Service/TitleService';
import { useEffect, useState } from 'react';
import { data } from 'react-router';
import { useNavigate } from 'react-router';
import Placeholder from 'react-bootstrap/Placeholder';
import TitlePlaceholder from './TitlePlaceholder';


export default function Rating({...props}){

    const {titleId, primaryTitle, posterUrl, rating} = props;
    //Later point, could get the createdAt and UpdateAt from prop?..

    const[errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/title/"+titleId);
    }

    return(
        <>
    
   
   {/* STill in progress, should utilize TitlePlaceHolder */}
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" onClick = {posterUrl ? onClickHandler : undefined} src={posterUrl || "https://upload.wikimedia.org/wikipedia/commons/3/37/YouTube_loading_symbol_2_%28stable%29.gif"} alt={primaryTitle}/> {/*Should be nullable or not?*/}
            <Card.Body>
                <Card.Title style = {{color: 'red'}}>{errorMessage}</Card.Title>
                <Card.Title  style = {primaryTitle ? {cursor: 'pointer'}: {color: 'red'}} onClick ={primaryTitle ? onClickHandler : undefined}>{primaryTitle || "Loading..."}</Card.Title> {/* Like with the img, Title of movie is only clickable when loaded */}
                <Card.Text> {`Rating: ${rating}` || "Rating not loaded"} </Card.Text>
               {/*<Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
        </Card>    

     
</>
        );
}