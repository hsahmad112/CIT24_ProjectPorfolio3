import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPerson, GetPersonBackdrop } from "../Service/PersonService";
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
import { PostRating } from "../Service/RatingService";
import { useUser } from "../Store/store";

export default function DetailedPerson({id}){
    const [person, setPerson] = useState(null);
    const personId = useParams(id);
    const [personBackdrop, setPersonBackdrop] = useState(null);

    const { user, login, logout } = useUser();
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;
  
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

    if(personBackdrop){
        console.log("HAHAHAHA");
        console.log(personBackdrop[0].profile_path);
    }

    if(person && personBackdrop){
        let mostRelevantTitles = <>{person.mostRelevantTitles.map((title, index) => <Button variant={"secondary"} className="pills" key={index}>{title}</Button>)}</>
        let primaryProfessions = <>{person.primaryProfessions.map((profession, index) => <Button variant={"secondary"} className="pills" key={index}>{profession}</Button>)}</>
    
        // [url, id, name, birthYear, deathYear, mostRelevantTitles, primaryProfessions]
        return (      
            <div>
              {user}
              <Container fluid="true">
              <h1 className="less-opacity">{person.name}</h1>
                <Row>
                    <Col>                

                        {/* column for poster img with person */}
                        <Card bg="transparent d-flex align-items-center"style={{ width: '16rem', marginLeft: '50px', padding: '0px' }}>
                           
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

                    <Col xl={4 } >
                        {/* row for plot */}
                        <div className="p-2">    
                                <Card className="card-no-margin">
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
                    <Col xl={4} >
                   
                        <Stack>
                            <div className="p-2">    
                                <Card className="card-no-margin">
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