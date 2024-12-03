import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetTitleById } from "../Service/TitleService";
import { Card, Col, Row, Container, Stack, Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { PostRating, GetRatingById, PutRating } from "../Service/RatingService";
import Modal from 'react-bootstrap/Modal';
import { useUser } from "../Store/store";
import { useNavigate } from 'react-router';

export default function DetailedTitle({id}) {

  const {userName} = useUser();
  const titleId = useParams(id);
  const list = [1,2,3,4,5,6,7,8,9,10];
  
  const [title, setTitle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [rating, setRating] = useState(-1);
  const [hoverRating, setHoverRating] = useState(-1);
  const [hasRated, setHasRated] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setTitle(await GetTitleById(titleId.id));
        let tempRating = (await GetRatingById(titleId.id)).rating;
        setRating(tempRating);
        if(tempRating > -1) setHasRated(true);
      } catch (error) {
        setErrorMessage("could not find title with with id: " + titleId.id);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id])

  async function RateMovie(){
    setShowPop(true);
    setShowModal(false);
    if(hasRated){
      console.log("putting");
      await PutRating(titleId.id, rating);
    }
    else{
      console.log("posting");
      await PostRating(titleId.id, rating);
      setHasRated(true);
    }
  }

  function CloseModal(){
    setHoverRating(-1);
    setShowModal(false);
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
    // console.log(rating);
    // title only have the person name, not the id, so can't use them to find the person, the name might overlap

    let hoverRatings = <>{list.map((id) => (hoverRating >= id || 0 > hoverRating && rating >= id) ?
    <i className="bi bi-star-fill rate-size" key={id} onClick={()=> setRating(x => x = id)} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i> : 
    <i className="bi bi-star rate-size" key={id} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i>)} </>

    let genres = <> {title.genresList.map((genre, index) => <Button onClick={() => navigate("/genres/" + genre.id)} variant={"secondary"} className="pills" key={index}>{genre}</Button>)}</>
    let actors = <> {title.principalCastList.map((actor, index) => <Button onClick={() => navigate("/persons/" + actor.id)} variant={"secondary"} className="pills" key={index}>{actor} </Button>)}</>
    let writers = <> {title.writersList.map((writer, index) => <Button onClick={() => navigate("/persons/" + writer.id)} variant={"secondary"} className="pills" key={index}>{writer} </Button>)}</>
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
              className="detailed-movie-card"
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
          { userName !== null && hasRated === true &&      
          <Card className="rate-movie-box" onClick={() => setShowModal(true)}>
            <Card.Body>
              <Card.Text className="">
                update your rating
              </Card.Text>
            </Card.Body>
          </Card>
          }

          {userName !== null && hasRated === false &&
            <Card className="rate-movie-box" onClick={() => setShowModal(true)}>
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
          <Modal.Header closeButton onClick={() => CloseModal()}>
            <Modal.Title>Rate {title.primaryTitle}</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            {/* <div >
              <p className="inline-p-1">5</p>
              <p className="inline-p-2">10</p>
            </div> */}
            {hoverRatings}
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={() => CloseModal()}>Cancel</Button>
            <Button variant="primary" onClick={() => RateMovie()}>{hasRated ? "Update Rating" : "Save Rating"}</Button>
          </Modal.Footer>
          </Modal.Dialog>
        </div>
      }

      {showPop &&
      <Toast className="to-front" bg={"primary"} onClose={() => setShowPop(false)} show={showPop} delay={2500} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          Your rating was submitted
        </Toast.Body>
      </Toast>
      }
      </div>
    );
  }
}