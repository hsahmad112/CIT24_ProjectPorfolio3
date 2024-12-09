
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";

import {useState } from 'react';

export default function TitleProfile(title){

    const navigate = useNavigate();
     
console.log("PRIMT ",title.data);
return(
    <div className="d-flex align-items-center no-border">
            <Row>
            <Col>
            <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/title/" + title.data.titleId)}>
                <Card.Body>
                    <Card.Title> {title.data.titlePrimaryTitle} </Card.Title>
                    <Card.Text> {title.data.annotation} </Card.Text>
                    <Button variant="primary">Go to title</Button>
                </Card.Body>
            </Card>
          </Col>
          </Row>
          </div> 
      

);

}