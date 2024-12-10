import { GetHeader, useUser } from "../Store/store";
import { useEffect, useState } from "react";
import Toaster from "../Component/Toaster";
import TitleSearchCard from "../Component/TitleSearchCard";
import { displayYears } from "../Component/HelperFunctions";
import { useParams, useNavigate, Form } from "react-router";
import { GetTitleById, GetSimilarMovies } from "../Service/TitleService";
import { PostRating, GetRatingById, PutRating, DeleteRating} from "../Service/RatingService";
import { Card, Col, Row, Container, Stack, Button, Modal, Toast } from 'react-bootstrap';
import { SaveTitleBookmarksById, DeleteTitleBookmarksById, GetTitleBookmarksById, isTitleBookmarked, isAuthorized, UpdateTitleBookmark} from '../Service/BookmarkService';
import * as Icon from 'react-bootstrap-icons';
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

export default function DetailedTitle({id}) {

  const {userName, token} = useUser();
  const params = useParams(id);
  const list = [1,2,3,4,5,6,7,8,9,10];
  
  const [title, setTitle] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showRatingPop, setShowRatingPop] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);
  
  const [showBookmarkPop, setShowBookmarkPop] = useState(false);
  const [showRemoveBookmarkPop, setShowRemoveBookmarkPop] = useState(false);
  const [rating, setRating] = useState(-1);
  const [hoverRating, setHoverRating] = useState(-1);
  const [displayEditAnnotationButton ,setDisplayEditAnnotationButton] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [similarMovies, setSimliarMovies] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);  
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const [annotation, setAnnotation] = useState({
    annotation: ''
  });

  
  
let headers = GetHeader();



let navigate = useNavigate();

  async function ToggleBookmark(){
      if(isBookmarked === false)
        {
          console.log("Attempting to create a bookmark")
          const success = await SaveTitleBookmarksById(params.id, annotation.annotation, setIsBookmarked, headers)
          if( success){ 
            console.log("Bookmark was set");
            setShowBookmarkPop(true);
            setDisplayEditAnnotationButton(true);
            setAnnotation("");
            setTimeout(() => {setShowBookmarkPop(false)}, 2500);
          }
          else{
            console.log("did not happen.")
          }

      }
      if(isBookmarked === true){
        console.log("Attempting to remove bookmark");
        const success=  await DeleteTitleBookmarksById(params.id, setIsBookmarked, headers);
        if(success){
          console.log("Bookmark removed successfully")
          setShowRemoveBookmarkPop(true);
          setDisplayEditAnnotationButton(false);
          setTimeout(() => {setShowRemoveBookmarkPop(false)}, 2500);
        } else{
          console.log('Unauthorized user is trying to "unset" a bookmark. Should not be possible')
        }
        

      }
      
  }


  useEffect(()=>{

    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setTitle(await GetTitleById(params.id));

        if(await isTitleBookmarked(params.id, setIsBookmarked, headers)){
          console.log("Current status ", isBookmarked);
        }else{
          console.log("Current status", isBookmarked);
        }
        
        let tempRating = (await GetRatingById(params.id)).rating;
        setRating(tempRating);
        if(tempRating > -1) setHasRated(true);
        setSimliarMovies(await GetSimilarMovies(params.id));
        
      } catch (error) {
        setErrorMessage("could not find title with with id: " + params.id);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isBookmarked] )


  async function RemoveRating(){

    try{
    DeleteRating(params.id);
    setToastMessage('Your rating was removed');  
    setShowRatingPop(true);
    setTimeout(() => {
      setShowRatingPop(false);
    }, 2500);
    setShowRatingModal(false);
    setHasRated(false);
    setRating(-1);
  }
  catch(error){
    console.log("something went wrong");
  }
  }

  async function RateMovie(){
    setToastMessage('Your rating was submitted');
    setShowRatingPop(true);

    setTimeout(() => {
      setShowRatingPop(false);
    }, 2500);
    
    setShowRatingModal(false);
    if(hasRated){
      await PutRating(params.id, rating);
    }
    else{
      await PostRating(params.id, rating);
      setHasRated(true);
    }
  }

  function CloseRatingModal(){
    setHoverRating(-1);
    setShowRatingModal(false);
  }

  function CloseBookmarkModal(){
    setShowBookmarkModal(false);
  }

  const handleAnnotationChange = (e) => {
      const { value } = e.target;
      setAnnotation(value);
  };

  const updateAnnotation = (e) => {
    UpdateTitleBookmark(params.id, headers, annotation);
  }

  function displayYears(startYear, endYear){
    if(!startYear && !endYear) return "";

    if(!endYear){
      return "(" + startYear + ")";
    }
    return "(" + startYear + "-" + endYear + ")";
  }

  if(errorMessage){
    return (
      <div className="center-div">
        <p>{errorMessage}</p>
      </div>
    );  
  }

  // if(similarMovies) console.log(similarMovies);
  function ShowingBookmarkModal(){
    if(isBookmarked){
      setShowBookmarkModal(true);
    } else {

      // setShowNotLoggedIn(true);
      // setTimeout(() => {
      //   setShowNotLoggedIn(false);
      // }, 2500);
    }
  }

  if(title){
    // console.log(title)
    // console.log(rating);
    // title only have the person name, not the id, so can't use them to find the person, the name might overlap
    return (
      <div className="container">
          <Container fluid="true">
            <Row style={{marginTop: "10px", marginBottom: "10px"}}>
                <Col width="100%">
                    <span style={{textAlign: "left"}}>
                        <h1>
                          {title.primaryTitle}
                          <p style={{fontSize: "28px", display: "inline"}}>{displayYears(title.startYear, title.endYear)}</p> 
                        </h1>
                        {title.originalTitle !== title.primaryTitle &&
                        <h5 className="less-opacity">{title.originalTitle}</h5>}  
                         <p style={{fontSize: "15px"}}>{title.titleType}</p>
                         {title.isAdult && <p style={{fontSize: "15px"}}>is adult</p>}
                      </span>
                    
                  </Col>
                  <Col md={1}>
                      {/* Toogle function, can be used to save as bookmark! */}                       
                      <div onClick={ToggleBookmark} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                          { isBookmarked  ? <Icon.BookmarkFill size={20} style={{color: 'darkgreen'}}/> : <Icon.Bookmark size={20} style={{color: ''}}/> }
                      </div>    
                          {displayEditAnnotationButton ? <Button onClick={ShowingBookmarkModal}>Edit Annotation</Button> : null}                 
                  </Col>
              </Row>
            <Row>
              <Col>
                {/* column for poster with title, rating and stuff */}
                <Card bg="transparent d-flex align-items-center no-border" style={{height: "500px"}}>
                  <Card.Title>
                    {/* <div style={{display: "flex", justifyContent: "space-between"}}>
                      <span style={{textAlign: "left"}}>
                        <h1>
                          {title.primaryTitle}
                          <p style={{fontSize: "28px", display: "inline"}}>{displayYears(title.startYear, title.endYear)}</p> 
                        </h1>
                        {title.originalTitle !== title.primaryTitle &&
                        <h5 className="less-opacity">{title.originalTitle}</h5>}  
                      </span>
                      <span style={{textAlign: "right"}}>
                        <p style={{fontSize: "15px"}}>{title.titleType}</p>
                        {title.isAdult && <p style={{fontSize: "15px"}}>is adult</p>}
                      </span>
                    </div> */}
                    <div>
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
              <Col xl={6}>
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
                            {title.principalCastList.map((actor, index) => <Button onClick={() => navigate("/person/" + actor.personId)} variant={"secondary"} className="pills" key={index}>{actor.personName}</Button>)}
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
                          {title.writersList.map((writer, index) => <Button onClick={() => navigate("/person/" + writer.personId)} variant={"secondary"} className="pills" key={index}>{writer.personName}</Button>)}
                          <Card.Text className="">
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
                        <h5>genres</h5>
                          {title.genresList.map((genre, index) => <Button onClick={() => navigate("/genres/" + genre.id)} variant={"secondary"} className="pills" key={index}>{genre}</Button>)}
                        <Card.Text>
                        </Card.Text>
                      </Card.Body>
                </Card>
                {userName !== null &&
                  <Card className="rate-movie-box" onClick={() => setShowRatingModal(true)}>
                    <Card.Body>
                      {hasRated ? "Update your rating" : "Rate movie"}
                    </Card.Body>
                  </Card>
                }
              </Col>
            </Row>
          </Container>

        {similarMovies && 
        <Container fluid="true">
          <div style={{textAlign: 'left'}}>
            <h1>Similar movies</h1>
            <Row md={3}>
              {similarMovies?.map((item) =>   
                <div key={item.primaryTitle}>
                    <TitleSearchCard title={item} key={item.titleId}/>
                    {item?.genres?.map((genre) => 
                      <div style={{display: "inline", marginLeft: "3px"}} key={genre}>
                        <Button onClick={() => navigate("/genres/" + genre.id)} variant={"secondary"} className="pills">{genre}</Button>
                      </div>
                    )}
                </div>)
              }     
          </Row>
        </div>
        </Container>
        }

        {showRatingModal &&      
        <div className="modal show" style={{ display: 'block', position: 'fixed', marginTop: "300px" }}>
          <Modal.Dialog >
            <Modal.Header closeButton onClick={() => CloseRatingModal()}>
              <Modal.Title>Rate {title.primaryTitle}</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              {/* <div >
                <p className="inline-p-1">5</p>
                <p className="inline-p-2">10</p>
              </div> */}
              {list.map((id) => (hoverRating >= id || (0 > hoverRating && rating >= id)) ?
              <i className="bi bi-star-fill rate-star" key={id} onClick={() => setRating(id)} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i> : 
              <i className="bi bi-star rate-star" key={id} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i>)}
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={() => CloseRatingModal()}>Cancel</Button>
              <Button variant="primary" onClick={() => RateMovie()}>{hasRated ? "Update Rating" : "Save Rating"}</Button>
              <Button variant="danger" style = {{display: !hasRated? "none" : "inline-block"}} onClick={() => RemoveRating()}> Remove Rating </Button> 
            </Modal.Footer>
            </Modal.Dialog>
          </div>
        }

        {showBookmarkModal &&      
          <div className="modal show" style={{ display: 'block', marginTop: "10%" }}>
            <Form onSubmit={updateAnnotation}>
            <Modal.Dialog>
              <Modal.Header closeButton onClick={() => CloseBookmarkModal()}>
                <Modal.Title>Bookmark: {title.primaryTitle}</Modal.Title>
              </Modal.Header>
              
              <Modal.Body>
                    <textarea 
                        value={annotation}
                        //placeholder="Insert anntation..."
                        onChange={(e) => handleAnnotationChange(e)}                  
                        rows="3"
                    />
                {/* <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form> */}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => CloseBookmarkModal()}>Cancel</Button>
                <Button variant="primary" onClick={() => ToggleBookmark()}>Yes, bookmark it!</Button>
              </Modal.Footer>
            </Modal.Dialog>
            </Form>
          </div>
        }

        <Toaster header={"Not authorized"} body={"Your are not logged in."} show={showNotLoggedIn} color={"warning"}></Toaster>

        <Toaster header={"Removed"} body={"Your have removed this bookmark."} show={showRemoveBookmarkPop} color={"danger"}></Toaster>
        
        <Toaster header={"Success"} body={"Your have bookmarked this title."} show={showBookmarkPop} color={"success"}></Toaster>
          
        <Toaster header={"Success"} body={toastMessage} show={showRatingPop} color={"success"}></Toaster>

      </div>
    );
  }
 

}
