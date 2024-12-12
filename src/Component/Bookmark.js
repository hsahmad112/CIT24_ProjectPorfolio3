import { useEffect, useState } from "react";
import Toaster from "../Component/Toaster";
import { Card, Col, Row, Container, Stack, Button, Modal, Toast } from 'react-bootstrap';
import { GetPersonBookmarks, GetPersonBookmarksById, CreatePersonBookmarksById, DeletePersonBookmarksById} from '../Service/BookmarkService';
import { useUser } from "../Store/store";
import * as Icon from 'react-bootstrap-icons';

export default function Bookmark ({person}){
    const { token } = useUser();
    const [bookmark, setBookmark] = useState(null);
    
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [showBookmarkPop, setShowBookmarkPop] = useState(false);
    const [showRemoveBookmarkPop, setShowRemoveBookmarkPop] = useState(false); 
    const [showNotLoggedIn, setShowNotLoggedIn] = useState(false);    
    const [annotation, setAnnotation] = useState("");

    useEffect(()=>{
        const fetchData = async () => {
               
            const data = await GetPersonBookmarksById(person.id);
             
            if(data){
                setBookmark(data);
            }else {
                setBookmark(false);
            }
        };
    
        fetchData();
    }, [person.id, bookmark, token]);

    console.log(person.id);
    console.log("is bookmarked: " + bookmark);
    function ToggleBookmark(){
        if(bookmark){            
            DeletePersonBookmarksById(person.id);
            setBookmark(false);
            setShowRemoveBookmarkPop(true)
            setTimeout(() => {
                setShowRemoveBookmarkPop(false);
            }, 2500);
  
        } else if(bookmark === false){            
            CreatePersonBookmarksById(person.id, annotation); // add annotations!
            setBookmark(true);
            setShowBookmarkPop(true);
            setShowBookmarkModal(false);
            setAnnotation("");

            setTimeout(() => {
                setShowBookmarkPop(false);
            }, 2500);
          
        }
        
    }

    function CloseBookmarkModal(){
        setShowBookmarkModal(false);
    }
    
    const handleAnnotationChange = (e) => {
        const { value } = e.target;
        setAnnotation(value);
    };

    function ShowingBookmarkModal(){
        if(token !== null){
            setShowBookmarkModal(true);
        } else {
            setShowNotLoggedIn(true);
            setTimeout(() => {
            setShowNotLoggedIn(false);
            }, 2500);
        }
    }

    return(
        <>
            <div onClick={bookmark ? ToggleBookmark : ShowingBookmarkModal} style={{cursor: 'pointer', marginTop: '10px', textAlign: 'right'}}>
                { bookmark ? <Icon.BookmarkFill size={20} style={{color: 'darkgreen'}}/> : <Icon.Bookmark size={20} style={{color: 'darkgreen'}}/> }
            </div>

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
                
                <Toaster header={"Authorization"} body={"Your are not logged in."} show={showNotLoggedIn} color={"warning"}></Toaster>

                <Toaster header={"Removed"} body={"Your have removed this bookmark."} show={showRemoveBookmarkPop} color={"danger"}></Toaster>
                
                <Toaster header={"Success"} body={"Your have bookmarked this title."} show={showBookmarkPop} color={"success"}></Toaster>
        </>

    )
}