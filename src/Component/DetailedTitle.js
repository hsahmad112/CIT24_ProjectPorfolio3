import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetTitle } from "../Service/TitleService";
import { Card, Col, Row, Container, Stack } from 'react-bootstrap';

export default function DetailedTitle({id}) {

  const [title, setTitle] = useState(null);
  const titleId = useParams(id); //?!
  console.log(titleId.id);
  useEffect(()=>{

    const fetchData = async () => {
      try {
        setTitle(await GetTitle(titleId.id))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // fetch title by title id
  }, [id])

  function DisplayGenre(genres){
    let genresString = "";
    let total = genres.length;
      for (let index = 0; index < genres.length; index++) {
  
        if(total === 1){
          genresString += genres[index];
          break;
        }
        if(index === total - 1){
          genresString += " and " + genres[index];
          break;
        }
        genresString += genres[index] + ", ";
      }

      return genresString;
  }
  if(title){
    console.log(title)
    // actors and writers should display images
    let actors = <p> {title.principalCastList.map((actor) => <>{actor},</>)}</p>
    let writers = <p> {title.writersList.map((writer) => <>{writer},</>)}</p>
    return (
      <div>
        <Container fluid>
      <Row>
        <Col>
        {/* column for poster with title, rating and stuff */}
        <Card bg="transparent" style={{height: "500px"}}>
              <Card.Title>
                <div>
                  <h1>
                    {title.primaryTitle} ({title.startYear && <>{title.startYear}</>})
                  </h1>
                  <h5>{title.originalTitle}</h5>
                </div>
              </Card.Title>
              <Card.Img
                variant="bottom"
                className="card-img"
                src={title.posterUrl}
                alt={title.primaryTitle}
                style={{height: "1000px"}}
            />
            </Card>
        </Col>

        {/* column for plot, actors, writers */}
        <Col xl={6}>
          <Stack>

            {/* row for plot */}
            <div className="p-2">    
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>plot</h5>
                    <Card.Text className="">
                      <p>{title.plot}</p>
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
            
          {/* row for actors */}
            <div className="p-2">
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>actors</h5>
                    <Card.Text className="">
                      <p>{actors}</p>
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
            
          {/* row for writers */}
            <div className="p-2">
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>writers</h5>
                    <Card.Text className="">
                      <p>{writers}</p>
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
          </Stack>
        </Col>
        
        {/* column genre, and rate movie button */}
        <Col xs={2}>
          <Card className="genre-box">
                <Card.Body>
                  <Card.Text className="">
                    {DisplayGenre(title.genresList)}
                  </Card.Text>
                </Card.Body>
          </Card>
        </Col>
      </Row>
        </Container>
      </div>
    );
  }
}
