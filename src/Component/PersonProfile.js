
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";

import {useState } from 'react';

export default function PersonProfile(person){

    const navigate = useNavigate();
     
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  
console.log("Vi har her persons:" + person.personId);
return(

            <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/title/" + person.data.personId)}>
                <Card.Body>
                    <Card.Title> {person.data.personId} </Card.Title>
                    <Card.Text> {person.data.annotation} </Card.Text>
                    <Button variant="primary">Go to person</Button>
                </Card.Body>
            </Card>
      

);

}