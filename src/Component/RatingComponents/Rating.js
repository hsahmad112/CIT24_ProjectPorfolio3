import { Card } from 'react-bootstrap';
import {useState } from 'react';
import { useNavigate } from 'react-router';

export default function Rating({...props}){

    const {titleId, primaryTitle, posterUrl, rating} = props;
    //Later point, could get the createdAt and UpdateAt from prop?..

    const[errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/title/"+titleId);
    }
    console.log("FROM Ratings:: Title id is: " + rating);

    return(

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" onClick = {posterUrl ? onClickHandler : undefined} src={posterUrl || "./no-image.jpg"} alt={primaryTitle}/> 
                <Card.Body>
                    <Card.Title style = {{color: 'red'}}>{errorMessage}</Card.Title>
                    <Card.Title  style = {primaryTitle ? {cursor: 'pointer'}: {color: 'red'}} onClick ={primaryTitle ? onClickHandler : undefined}>{primaryTitle || "Loading..."}</Card.Title> {/* Like with the img, Title of movie is only clickable when loaded */}
                    <Card.Text> {`Rating: ${rating}` || "Rating not loaded"} </Card.Text>
                </Card.Body>
        </Card>   
    );
}