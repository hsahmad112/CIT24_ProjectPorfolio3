import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPerson, GetPersonBackdrop } from "../Service/PersonService";
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
import { PostRating } from "../Service/RatingService";
import { useUser } from "../Store/store";
import * as Icon from 'react-bootstrap-icons';

export default function DetailedPerson({id}){
    const [person, setPerson] = useState(null);
    const personId = useParams(id);
    const [personBackdrop, setPersonBackdrop] = useState(null);
    const [bookmark, setBookmark] = useState(false);

    const { user, login, logout } = useUser();
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;
  
    function ToggleBookmark(){
        if(bookmark){
            setBookmark(false);
        }else{
            setBookmark(true);
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
          try {
            setPerson(await GetPerson(personId.id));
            setPersonBackdrop((await GetPersonBackdrop(personId.id)))
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [id]);

    if(person && personBackdrop){
        let mostRelevantTitles = <>{person.mostRelevantTitles.map((title, index) => <Button variant={"secondary"} className="pills" key={index}>{title}</Button>)}</>
        let primaryProfessions = <>{person.primaryProfessions.map((profession, index) => <Button variant={"secondary"} className="pills" key={index}>{profession}</Button>)}</>
    
        // [url, id, name, birthYear, deathYear, mostRelevantTitles, primaryProfessions]
        return (      
            <div className="container">
              {user}
              <Container fluid="true">

                {/* Row 1) */}
                <Row>
                    <Col md={4}>
                        <h1 className="less-opacity">{person.name}</h1>
                    </Col>
                    <Col md={1}>
                        {/* Toogle function, can be used to save as bookmark! */}
                        <div onClick={ToggleBookmark} style={{cursor: 'pointer', marginTop: '10px'}}>
                            {bookmark ? <Icon.Bookmark size={20} /> : <Icon.BookmarkFill size={20} />}
                        </div>
                    </Col>
                </Row>
                  
                {/* Row 2) */}
                <Row>
                    <Col md={4 }>
                           

                        {/* column for poster img with person */}
                        <Card bg="transparent d-flex align-items-center" style={{ width: '14rem', padding: '0px' }}>
                        
                            <Card.Img 
                                fluid="true"
                                variant="bottom"
                                className=""
                                src={                      
                                    personBackdrop[0]?.profile_path !== undefined ? 
                                    imageUrl + personBackdrop[0]?.profile_path :
                                    "/no-image.jpg"
                                    }            
                                />
                           
                        </Card>
                       
                    </Col>

                    <Col md={4}>
                        {/* row for plot */}
                        <div className="p-2" style={{height: '100%'}}>    
                                <Card className="card-no-margin" style={{height: '100%'}}>
                                    <Card.Header>
                                            fddf
                                    </Card.Header>
                                    <Card.Body>
                                        <h5>name</h5>
                                        <Card.Text className="">
                                        {person.name}
                                        </Card.Text>
                                       
                                    </Card.Body>
                                    <Card.Footer>
                                            fddf
                                    </Card.Footer>
                                </Card>
                            </div>
                    </Col>


                     {/* column for plot, actors, writers */}
                    <Col md={4}>                   
                        <Stack  style={{height: '100%'}}>
                            <div className="p-2"  style={{height: '100%'}}>    
                                <Card className="card-no-margin" >
                                    <Card.Body>
                                        <div>
                                            <h5>Birth year: {person.birthYear && person.birthYear}</h5>
                                            <h5>Death year: {person.deathYear && person.deathYear}</h5>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                            
                            {/* row for plot */}
                            <div className="p-2">    
                                <Card className="card-no-margin">
                                    <Card.Body>
                                        <h5>Relevant Titles</h5>
                                        <Card.Text className="">
                                        {mostRelevantTitles}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            
                            {/* row for actors */}
                            <div className="p-2">
                                <Card className="card-no-margin">
                                    <Card.Body>
                                        <h5>Primary Profession</h5>
                                        {primaryProfessions}
                                        <Card.Text className="">
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            
                        {/* row for writers */}
                            <div className="p-2">
                        
                            </div>
                        </Stack>
                    </Col>
                    
             
                </Row>            

              </Container>
            </div>
        );

    }
}