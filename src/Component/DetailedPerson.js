import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Toaster from "../Component/Toaster";
import { GetPerson, GetPersonBackdrop } from "../Service/PersonService";
import { Card, Col, Row, Container, Stack, Button, Modal, Toast } from 'react-bootstrap';
import { GetPersonBookmarks, GetPersonBookmarksById, SavePersonBookmarksById, DeletePersonBookmarksById} from '../Service/BookmarkService';
import { useUser } from "../Store/store";
import * as Icon from 'react-bootstrap-icons';

export default function DetailedPerson({id}){
    const [person, setPerson] = useState(null);
    const [bookmark, setBookmark] = useState(null);
    
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [showBookmarkPop, setShowBookmarkPop] = useState(false);
    const [showRemoveBookmarkPop, setShowRemoveBookmarkPop] = useState(false);
    const params = useParams(id);
    const [personBackdrop, setPersonBackdrop] = useState(null);
    //const [personBookmark, setPersonBookmark] = useState(null);
    
    const [annotation, setAnnotation] = useState("");
    const { token } = useUser();
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;
  
    function ToggleBookmark(){
        if(bookmark){            
            DeletePersonBookmarksById(token, params.id);
            setBookmark(false);
            setShowRemoveBookmarkPop(true)
            setTimeout(() => {
                setShowRemoveBookmarkPop(false);
            }, 2500);
  
        } else{            
            SavePersonBookmarksById(params.id, annotation); // add annotations!
            setBookmark(true);
            setShowBookmarkPop(true);
            setShowBookmarkModal(false);
            setAnnotation("");

            setTimeout(() => {
            setShowBookmarkPop(false);
            }, 2500);
          
        }
        
    }

    useEffect(()=>{
        const fetchData = async () => {
            try {
                setPerson(await GetPerson(params.id));
                setPersonBackdrop((await GetPersonBackdrop(params.id)))
                if(token){
                    const res = await GetPersonBookmarksById(params.id); // should be the right id!
                    if(res){
                        //setPersonBookmark(res);
                        setBookmark(true);
                    }
                }
          
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [id, params]);

    function CloseBookmarkModal(){
        setShowBookmarkModal(false);
      }
    
      const handleAnnotationChange = (e) => {
          const { value } = e.target;
          setAnnotation(value);
      };

    if(person){      
           
        let mostRelevantTitles = <>{person.mostRelevantTitles.map((title, index) => <Button variant={"secondary"} className="pills" key={index}>{title}</Button>)}</>
        let primaryProfessions = <>{person.primaryProfessions.map((profession, index) => <Button variant={"secondary"} className="pills" key={index}>{profession}</Button>)}</>
    
        // [url, id, name, birthYear, deathYear, mostRelevantTitles, primaryProfessions]
        return (      
            <div className="container">
              <Container fluid="true">
  
                {/* Row 1) */}
                <Row style={{marginTop: "10px", marginBottom: "10px"}}>
                    <Col width="100%">
                        <h1 className="less-opacity" style={{textAlign: 'left'}}>
                            {person.name}                     
                        </h1>
                    </Col>
                    <Col md={1}>
                        {/* Toogle function, can be used to save as bookmark! */}                       
                        {/* <div onClick={ToggleBookmark} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                            { bookmark ? <Icon.BookmarkFill size={20} style={{color: 'darkgreen'}}/> : <Icon.Bookmark size={20} style={{color: 'darkgreen'}}/> }
                        </div> */}
                        <div onClick={bookmark ? ToggleBookmark : () => setShowBookmarkModal(true)} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                          { bookmark ? <Icon.BookmarkFill size={20} style={{color: 'darkgreen'}}/> : <Icon.Bookmark size={20} style={{color: 'darkgreen'}}/> }
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
                                    //placeholder="Insert anntation..."
                                    onChange={(e) => handleAnnotationChange(e)}                  
                                    rows="3"
                                />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => CloseBookmarkModal()}>Cancel</Button>
                            <Button variant="primary" onClick={() => ToggleBookmark()}>Yes, bookmark it!</Button>
                        </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                }

                <Toaster header={"Removed"} body={"Your have removed this bookmark."} show={showRemoveBookmarkPop} color={"danger"}></Toaster>
                
                <Toaster header={"Success"} body={"Your have bookmarked this title."} show={showBookmarkPop} color={"success"}></Toaster>
                
            </div>
        );

    }
}