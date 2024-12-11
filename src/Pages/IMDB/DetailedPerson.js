import { useUser, GetHeader } from "../../Store/store";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Toaster from "../../Component/Toaster";
import { GetPersonById, GetPerson, GetPersonBackdrop } from "../../Service/PersonService";
import { Card, Col, Row, Container, Stack, Button, Modal, Spinner } from 'react-bootstrap';
import { GetPersonBookmarks, GetPersonBookmarksById, CreatePersonBookmarksById, DeletePersonBookmarksById, isPersonBookmarked, UpdatePersonBookmark} from '../../Service/BookmarkService';
import * as Icon from 'react-bootstrap-icons';
import Bookmark from "../../Component/Bookmark";

export default function DetailedPerson({id}){
    //const {userName, token} = useUser();
    const params = useParams(id);    
    const headers = GetHeader();
    const [person, setPerson] = useState(null);  
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);
    const [personBackdrop, setPersonBackdrop] = useState(null);
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;
  
    const [showBookmarkPop, setShowBookmarkPop] = useState(false);
    const [showRemoveBookmarkPop, setShowRemoveBookmarkPop] = useState(false);
    const [showUpdateBookmarkPop, setShowUpdateBookmarkPop] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
  
    const [errorMessage, setErrorMessage] = useState(null);  
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [personBookmark, setPersonBookmark] = useState(null);  
    
    const [annotation, setAnnotation] = useState('');
  
    let navigate = useNavigate();

    useEffect(()=>{
        isPersonBookmarked(params.id, setIsBookmarked, headers);
        const res = 

        //setAnnotation();
        window.scrollTo(0, 0);
        const fetchData = async () => {
          try {
            setPerson(await GetPerson(params.id)); 
            setPersonBackdrop( await GetPersonBackdrop(params.id));
            setPersonBookmark( await GetPersonBookmarksById(params.id));        
            
          } catch (error) {
            setErrorMessage("could not find person with with id: " + params.id);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        console.log(isBookmarked);
    }, [isBookmarked, params.id] );

    async function ToggleBookmark(){
        if(isBookmarked === false){      
            console.log("Attempting to create a bookmark");
            //console.log(headers);
            const success = await CreatePersonBookmarksById(params.id, annotation, setIsBookmarked, headers);
        
            if( success){ 
                console.log("Bookmark was set");
                setShowBookmarkPop(true);
                setTimeout(() => {setShowBookmarkPop(false)}, 2500);
            }
            else{
                console.log("did not happen.")
            }
    
        }
        if(isBookmarked === true){
          console.log("Attempting to remove bookmark");
          //console.log(headers);
          const success =  await DeletePersonBookmarksById(params.id, setIsBookmarked, headers);
        
          if(success){
            console.log("Bookmark removed successfully")
            setShowRemoveBookmarkPop(true);
            setTimeout(() => {setShowRemoveBookmarkPop(false)}, 2500);
          }else{
            console.log('Unauthorized user is trying to "unset" a bookmark. Should not be possible')
          }       
        }    
          
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
        UpdatePersonBookmark(params.id, headers, annotation);    
        setShowBookmarkModal(false);
        setShowUpdateBookmarkPop(true);        
        setTimeout(() => {setShowUpdateBookmarkPop(false)}, 2500);
    }
    function ShowingBookmarkModal(){
        if(isBookmarked){
            setShowBookmarkModal(true);
        }
    }
      

    if(!person){
        return(
          <div style={{textAlign: "center !important", transform: "translate(0%, 500%)"}}>
            <h1 style={{display: "inline"}}><b>loading... </b></h1>
            <Spinner animation="border" role="status"/>
          </div>
        );
      }
      else{    
           
        let mostRelevantTitles = <>{person.mostRelevantTitles.map((title, index) => <Button variant={"secondary"} className="pills" key={index}>{title}</Button>)}</>
        let primaryProfessions = <>{person.primaryProfessions.map((profession, index) => <Button variant={"secondary"} className="pills" key={index}>{profession}</Button>)}</>
    

        return (      
            <div className="container">
              <Container fluid="true">

                <Row style={{marginTop: "10px", marginBottom: "10px"}}>
                    <Col width="100%">
                        <h1 className="less-opacity" style={{textAlign: 'left'}}>
                            {person.name}                     
                        </h1>
                    </Col>
                    <Col md={1}>
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
                    <Col md={4 }>
                           

                        {/* column for poster img with person */}
                        <Card bg="transparent d-flex align-items-center" style={{ width: '14rem', padding: '0px' }}>
                        
                            <Card.Img 
                                fluid="true"
                                variant="bottom"
                                className=""
                                src={                      
                                        personBackdrop?.profile_path !== undefined ? 
                                        imageUrl + personBackdrop?.profile_path :
                                        "/no-image.jpg"
                                    }            
                                />
                           
                        </Card>
                       
                    </Col>

                    <Col md={4}>
                        {/* row for plot */}
                        <div className="p-2" style={{height: '100%'}}>    
                                <Card className="card-no-margin" style={{height: '100%'}}>
                                    <Card.Header style={{textAlign: 'left'}}>
                                            Description:
                                    </Card.Header>
                                    <Card.Body>
                                      Put in description...
                                       
                                    </Card.Body>
                                    <Card.Footer>
                                            Footer
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
                                            <h6>{person.birthYear && "Birth year: " +person.birthYear}</h6>
                                            <h6>{person.deathYear && "Death year: " +person.deathYear}</h6>
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

                {showBookmarkModal &&      
                    <div className="modal show" style={{ display: 'block', marginTop: "10%" }}>
                        <Modal.Dialog>
                        <Modal.Header closeButton onClick={() => CloseBookmarkModal()}>
                            <Modal.Title>Bookmark: {person.name}</Modal.Title>
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
                
                <Toaster header={"Authorization"} body={"Your are not logged in."} show={showNotLoggedIn} color={"warning"}></Toaster>
                <Toaster header={"Removed"} body={"Your have removed this bookmark."} show={showRemoveBookmarkPop} color={"danger"}></Toaster>                
                <Toaster header={"Success"} body={"Your have bookmarked this title."} show={showBookmarkPop} color={"success"}></Toaster>
                <Toaster header={"Success"} body={"Your have updated the bookmarked for this title."} show={showUpdateBookmarkPop} color={"success"}></Toaster>
        
                
            </div>
        );

    }
}