import { useUser, GetHeader } from "../../Store/store";
import { useEffect, useState } from "react";
import Toaster from "../../Component/Toaster";
import TitleSearchCard from "../../Component/TitleComponents/TitleSearchCard";
import { useParams, useNavigate } from "react-router";
import { GetTitleById, GetSimilarMovies } from "../../Service/TitleService";
import { PostRating, GetRatingById, PutRating, DeleteRating} from "../../Service/RatingService";
import { CreateTitleBookmarksById, DeleteTitleBookmarksById, GetTitleBookmarksById, isTitleBookmarked, isAuthorized, UpdateTitleBookmark } from "../../Service/BookmarkService";
import { displayYears, displayRatingCount } from "../../Helpers/DisplayHelpers";
import { Card, Col, Row, Container, Stack, Button, Modal, Spinner, Badge } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function DetailedTitle({id}) {
  const {userName, token, checkToken} = useUser();
  const params = useParams(id);
  const list = [1,2,3,4,5,6,7,8,9,10];

  const [title, setTitle] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showRatingPop, setShowRatingPop] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);
  
  const [showBookmarkPop, setShowBookmarkPop] = useState(false);
  const [showRemoveBookmarkPop, setShowRemoveBookmarkPop] = useState(false);
  const [showUpdateBookmarkPop, setShowUpdateBookmarkPop] = useState(false);
  const [rating, setRating] = useState(-1);
  const [prevRating, setPrevRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(-1);
  const [hasRated, setHasRated] = useState(false);
  const [similarMovies, setSimliarMovies] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [titleBookmark, setTitleBookmark] = useState(null);  
  
  const [annotation, setAnnotation] = useState('');

  let navigate = useNavigate();

  useEffect(()=>{ 
    let headers = GetHeader();

    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setTitle(await GetTitleById(params.id));
        
        if(checkToken() !== null){
          isTitleBookmarked(params.id, setIsBookmarked, setTitleBookmark, headers);
        }
        setSimliarMovies(await GetSimilarMovies(params.id));
        let tempRating = await GetRatingById(params.id);
        setRating(tempRating);
          
        if(tempRating > -1) setHasRated(true);
        else setHasRated(false);

      } catch (error) {
        setErrorMessage("could not find title with with id: " + params.id);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isBookmarked, params.id, token]);

  // useEffect(async () => {
    
  // },[rating]) 
 async function ToggleBookmark(){
    let headers = GetHeader();

      if(isBookmarked === false){      
        console.log("Attempting to create a bookmark"); // Remove later!
        const success =  await CreateTitleBookmarksById( params.id, annotation, setIsBookmarked, headers);
        console.log(success);
        if( success){ 
          console.log("Bookmark was set");
          setShowBookmarkPop(true);
          setTimeout(() => {setShowBookmarkPop(false)}, 2500);
        }
        else{
          console.log("did not happen.")
        }
      }
      else if(isBookmarked === true){
        console.log("Attempting to remove bookmark");
        const success=  await DeleteTitleBookmarksById(params.id, setIsBookmarked, headers);
        if(success){
          console.log("Bookmark removed successfully") // Remove later!
          setShowRemoveBookmarkPop(true);
          setTimeout(() => {setShowRemoveBookmarkPop(false)}, 2500);
        } else{
          console.log('Unauthorized user is trying to "unset" a bookmark. Should not be possible')
        }       
      }  
  }

  async function RemoveRating(){
    try{
      DeleteRating(params.id);
      setToastMessage('Your rating was removed');  
      setShowRatingPop(true);
      setTimeout(() => {setShowRatingPop(false)}, 2500);
      setShowRatingModal(false);
      setHasRated(false);
      setRating(-1);
    }
    catch(error){
      console.log("something went wrong");
    }
  }

  async function RateMovie(){
    if(token !== null){
      setToastMessage('Your rating was submitted');
      setShowRatingPop(true);
      setTimeout(() => {setShowRatingPop(false)}, 2500);
      
      setShowRatingModal(false);
      if(hasRated){
        await PutRating(params.id, rating);
      }
      else{
        await PostRating(params.id, rating);
        setHasRated(true);
      }
    }
    else{
      setShowNotLoggedIn(true);
      setTimeout(() => {setShowNotLoggedIn(false)}, 2500);
    }
  }

  function handleShowRatingModal(){
    if(token !== null){
      setShowRatingModal(true);
      setPrevRating(() => rating);
    }
    else{
      setShowNotLoggedIn(true);
      setTimeout(() => {setShowNotLoggedIn(false)}, 2500);
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
    const {value } = e.target;
    setAnnotation(value);
    console.log(annotation);
  };

  const updateAnnotation = (e) => {
    let headers = GetHeader();
    UpdateTitleBookmark(params.id, headers, annotation);    
    setShowBookmarkModal(false);
    setShowUpdateBookmarkPop(true);
    setTimeout(() => {setShowUpdateBookmarkPop(false)}, 2500);
  }
  // async function handleSubmit(e){
  //   e.preventDefault();
  //   const body = 
  //   { id: null, 
  //     page: '0', 
  //     pageSize: searchType === 'everything' ? '5' : '10',
  //     genreId: chosenGenre,
  //   };
 
  //   try {

  //       let result = await AdvancedSearch(body);
  //       // console.log("reuslt?");
  //       // console.log(result);

  //     //setChosenGenre(undefined);


  //      navigate('/search', {
  //       state: {result, searchType, body },
  //     });

  //   } catch (error) {
  //     console.error("Error in fetching of data, in Navigation.js", error);
  //     //throw new Error (error); --Do we want to throw error here on in SearchResult?
  //   }
 
  // }

  
  // if(similarMovies) console.log(similarMovies);
  function ShowingBookmarkModal(){
    if(isBookmarked){
      setShowBookmarkModal(true);
    } 
    else{
      setShowNotLoggedIn(true);
      setTimeout(() => {setShowNotLoggedIn(false)}, 2500);
  }

  }
  if(errorMessage){
    return (
      <div className="center-div">
        <p>{errorMessage}</p>
      </div>
    );  
  }
  
  if(!title){
    return(
      <div style={{textAlign: "center !important", transform: "translate(0%, 500%)"}}>
        <h1 style={{display: "inline"}}><b>loading... </b></h1>
        <Spinner animation="border" role="status"/>
      </div>
    );
  }
  else{
    // title only have the person name, not the id, so can't use them to find the person, the name might overlap
    return (
      <div className="container">
          <Container fluid="true">
            <Row style={{marginTop: "10px", marginBottom: "10px"}}>
                <Col width="100%">
                  <span style={{textAlign: "left"}}>
                    <span style={{position: "absolute"}}>
                          <b style={{display: "inline"}}>IMDB rating: {title.voteCount ? title.averageRating + "/10" : "no ratings"}</b>
                          <p style={{textAlign: "center"}}>{displayRatingCount(title.voteCount)}</p>
                      </span>
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
                    <Row>
                        <Col onClick={ShowingBookmarkModal} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                            <Icon.PencilFill  style={{color: 'purple', visibility:isBookmarked ? "visible" : "hidden"}} />
                        </Col>
                        <Col onClick={ToggleBookmark} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                            { isBookmarked  ? <Icon.BookmarkFill size={20} style={{color: 'darkgreen'}}/> : <Icon.Bookmark size={20} style={{color: ''}}/> }
                        </Col> 
                    </Row>  
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
                          {title.genresList.map((genre, index) => <Badge bg="secondary" className="pills" key={index}>{genre}</Badge>)}
                        <Card.Text>
                        </Card.Text>
                      </Card.Body>
                </Card>
                  <Card className="rate-movie-box" onClick={() => handleShowRatingModal()}>
                    <Card.Body>
                      {hasRated ? "Update your rating" : "Rate movie"}
                    </Card.Body>
                  </Card>
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
              {list.map((id) => (hoverRating >= id || (0 > hoverRating && rating >= id)) ?
              <i className="bi bi-star-fill rate-star" key={id} onClick={() => setRating(id)} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i> : 
              <i className="bi bi-star rate-star" key={id} onMouseEnter={() => setHoverRating(id)} onMouseLeave={() => setHoverRating(-1)}></i>)}
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={() => CloseRatingModal()}>Cancel</Button>
              <Button disabled={rating >= 0 && rating !== prevRating ? false : true } variant="primary" onClick={() => RateMovie()}>{hasRated ? "Update Rating" : "Save Rating"}</Button>
              <Button variant="danger" style = {{display: !hasRated? "none" : "inline-block"}} onClick={() => RemoveRating()}> Remove Rating </Button> 
            </Modal.Footer>
            </Modal.Dialog>
          </div>
        }

        {showBookmarkModal &&      
          <div className="modal show" style={{ display: 'block', marginTop: "10%" }}>
              <Modal.Dialog>
                <Modal.Header closeButton onClick={() => CloseBookmarkModal()}>
                  <Modal.Title>Bookmark: {title.primaryTitle}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                      <textarea 
                          value={annotation}
                          onChange={(e) => handleAnnotationChange(e)}                  
                          rows="3"
                          style={{width: "100%"}}
                      />
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => CloseBookmarkModal()}>Cancel</Button>
                  <Button variant="primary" onClick={() => updateAnnotation()}>Update</Button>
                </Modal.Footer>
              </Modal.Dialog>
           
          </div>
        }

        <Toaster header={"Not authorized"} body={"Your are not logged in."} show={showNotLoggedIn} color={"warning"}></Toaster>
        <Toaster header={"Removed"} body={"Your have removed this bookmark."} show={showRemoveBookmarkPop} color={"danger"}></Toaster>        
        <Toaster header={"Success"} body={"Your have bookmarked this title."} show={showBookmarkPop} color={"success"}></Toaster>
        <Toaster header={"Success"} body={"Your have updated the bookmarked for this title."} show={showUpdateBookmarkPop} color={"success"}></Toaster>
          
        <Toaster header={"Success"} body={toastMessage} show={showRatingPop} color={"success"}></Toaster>

      </div>
    );
  }

}
