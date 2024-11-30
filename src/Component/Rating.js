import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GetTitle } from '../Service/TitleService';
import { useEffect, useState } from 'react';
import { data } from 'react-router';

export default function Rating({...props}){
    let userId = props.userId;
    let titleId = props.titleId;
    let rating = props.rating;    
    //Later point, could get the createdAt and UpdateAt from prop?..

    const [title, setTitle] = useState([]);

    useEffect(() => { 
        GetTitle(titleId).then(data => {
            setTitle(data);
        });
    }, [titleId]);

    return(
    <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
                <Card.Body>
                <Card.Title>{title?.primaryTitle || "Loading..."}</Card.Title>
                <Card.Text> {} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        );
}