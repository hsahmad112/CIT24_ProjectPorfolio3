import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetTitle } from "../Service/TitleService";
import { User } from "../Store/store";
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
import { PostRating } from "../Service/RatingService";
import { useUser } from "../Store/store";

export default function DetailedTitle({id}) {

  //const user = useContext(User);

  const [title, setTitle] = useState(null);
  const titleId = useParams(id);
  //console.log(titleId.id);

  const { user, login, logout } = useUser();

  console.log(useUser.user)
  useEffect(()=>{

    const fetchData = async () => {
      try {
        setTitle(await GetTitle(titleId.id))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id])

  function RateMovie(){
   login(x => x + "yo");
   // PostRating(titleId.id, 9);
    console.log(title.id);
  }

  function NotMovie(){
    logout();
  }

  if(title){
    // console.log(title)
    let genres = <>{title.genresList.map((genre, index) => <Button variant={"secondary"} className="pills" key={index}>{genre}</Button>)}</>
    let actors = <> {title.principalCastList.map((actor, index) => <Button variant={"secondary"} className="pills" key={index}>{actor}, </Button>)}</>
    let writers = <> {title.writersList.map((writer, index) => <Button variant={"secondary"} className="pills" key={index}>{writer}, </Button>)}</>
    return (
      
      <div>
        {user}
        <Container fluid="true">
      <Row>
        <Col style={{marginTop: "55px"}}>
        {/* column for poster with title, rating and stuff */}
        <Card bg="transparent d-flex align-items-center" style={{height: "500px"}}>
              <Card.Title>
                <div>
                  <h1>
                    {title.primaryTitle} ({title.startYear && <>{title.startYear}</>})
                  </h1>
                  <h5 className="less-opacity">{title.originalTitle}</h5>
                </div>
              </Card.Title>
              <Card.Img fluid="true"
                variant="bottom"
                className=""
                src={title.posterUrl}
                alt={title.primaryTitle}
               
            />
            </Card>
        </Col>

        {/* column for plot, actors, writers */}
        <Col xl={6} style={{marginTop: "48px"}}>
          <Stack>

            {/* row for plot */}
            <div className="p-2">    
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>plot</h5>
                    <Card.Text className="">
                      {title.plot}
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
            
          {/* row for actors */}
            <div className="p-2">
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>actors</h5>
                      {actors}
                    <Card.Text className="">
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
            
          {/* row for writers */}
            <div className="p-2">
              <Card className="card-no-margin">
                  <Card.Body>
                    <h5>writers</h5>
                      {writers}
                    <Card.Text className="">
                    </Card.Text>
                  </Card.Body>
              </Card>
            </div>
          </Stack>
        </Col>
        
        {/* column genre, and rate movie button */}
        <Col xs={2} style={{marginTop: "-14px"}}>
          <Card className="genre-box">
                <Card.Body>
                  <h5>genres</h5>
                    {genres}
                  <Card.Text className="">
                  </Card.Text>
                </Card.Body>
          </Card>
          {/* rate movie button    HACK   change to user !=== "none"    */}
          {/* {user === "none" && */}
          {
          <Card className="rate-movie-box" onClick={() => RateMovie()}>
            <Card.Body>
              <Card.Text className="">
                Rate movie
              </Card.Text>
            </Card.Body>
          </Card>
          }
          <Button onClick={() => NotMovie()}>non user</Button>
        </Col>
      </Row>
        </Container>
      </div>
    );
  }
}
