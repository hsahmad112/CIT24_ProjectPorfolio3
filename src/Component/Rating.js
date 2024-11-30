import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GetTitle, GetTitleById } from '../Service/TitleService';
import { useEffect, useState } from 'react';
import { data } from 'react-router';

export default function Rating({...props}){
    let userId = props.userId;
    let titleId = props.titleId;
    let rating = props.rating;    
    //Later point, could get the createdAt and UpdateAt from prop?..

    const [title, setTitle] = useState([]);
    const[errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        const titleFetcher = async () => {
            try {
                const titleData = await GetTitleById(titleId);
                setTitle(titleData);
                setErrorMessage(null);
                
            } catch (error) {
                console.log("Error in titleFetcher");
                setErrorMessage(error.message);
            }
        };
        titleFetcher();
    },[titleId]);

    return(
    <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
                <Card.Body>
                <Card.Title style = {{color: 'red'}}>{errorMessage}</Card.Title>
                <Card.Title>{title?.primaryTitle || "Loading..."}</Card.Title>
                <Card.Text> {rating || "Rating not loaded"} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        );
}