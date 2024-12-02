import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetTitleById } from "../Service/TitleService";
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
import { PostRating, GetRatingById, PutRating } from "../Service/RatingService";
import Modal from 'react-bootstrap/Modal';
import { useUser } from "../Store/store";
import { useNavigate } from 'react-router';

export default function DetailedTitle({id}) {

  const list = [1,2,3,4,5,6,7,8,9,10];

  const [title, setTitle] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [rating, setRating] = useState(-1);
  const titleId = useParams(id);

  const [errorMessage, setErrorMessage] = useState(null);

  const {userName, login, logout} = useUser();
  let navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setTitle(await GetTitleById(titleId.id))
        setRating(await GetRatingById(titleId.id));
      } catch (error) {
        setErrorMessage("could not find title with with id: " + titleId.id);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id])

  function RateMovie(){

    // rating is -1 if we have not never rated

    setShowModal(false);
    PostRating(titleId.id, rating);
    console.log(title.id);
  }

  function UpdateRatedMovie(){
    PutRating(titleId.id, 3);
    setShowModal(true);
    console.log(title.id);
  }



  if(errorMessage){
    return (
      <div className="center-div">
        <p>{errorMessage}</p>
      </div>
    );  
  }

  if(title){
    // console.log(title)
    // title only have the person name, not the id, so can't use them to find the person, the name might overlap

    let ratings = <>{list.map((id) => rating === id ? <i className="bi bi-star-full"></i> : <i className="bi bi-star"></i>)}</>


    let genres = <> {title.genresList.map((genre, index) => <Button onClick={() => navigate("/genres/" + genre.id)} variant={"secondary"} className="pills" key={index}>{genre}</Button>)}</>
    let actors = <> {title.principalCastList.map((actor, index) => <Button onClick={() => navigate("/persons/" + actor.id)} variant={"secondary"} className="pills" key={index}>{actor}, </Button>)}</>
    let writers = <> {title.writersList.map((writer, index) => <Button onClick={() => navigate("/persons/" + writer.id)} variant={"secondary"} className="pills" key={index}>{writer}, </Button>)}</>
    return (
      <div>
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
          { userName !== "" && rating === -1 &&      
          <Card className="rate-movie-box" onClick={() => UpdateRatedMovie()}>
            <Card.Body>
              <Card.Text className="">
                update your rating
              </Card.Text>
            </Card.Body>
          </Card>
          }

          {userName !== "" && rating !== -1 &&
            <Card className="rate-movie-box" onClick={() => RateMovie()}>
            <Card.Body>
              <Card.Text className="">
                Rate movie
              </Card.Text>
            </Card.Body>
          </Card>
          }
        </Col>
      </Row>
        </Container>

        {showModal &&      
       <div className="modal show" style={{ display: 'block', position: 'fixed', marginTop: "300px" }}>
       <Modal.Dialog >
         <Modal.Header closeButton onClick={()=> setShowModal(x => x = false)}>
           <Modal.Title>Rate {title.primaryTitle}</Modal.Title>
         </Modal.Header>
 
         <Modal.Body>

           {ratings}

         </Modal.Body>
 
         <Modal.Footer>
           <Button variant="secondary"  onClick={()=> setShowModal(x => x = false)}>Cancel</Button>
           <Button variant="primary" onClick={() => RateMovie()}>Save rating</Button>
         </Modal.Footer>
       </Modal.Dialog>
     </div>
      }

      </div>
    );
  }
}
