import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {GetPersonBookmarksById, GetTitleBookmarksById, GetPersonBackdrop, GetTitleBackdrop} from '../Service/BookmarkService';
import { ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import {useUser} from '../Store/store';

export default function WactList(){
    const [personBookmarks, setPersonBookmarks] = useState(null);
    const [titleBookmarks, setTitleBookmarks] = useState(null);
    const {token} = useUser();

    useEffect(() =>{
        const getBookmarks = async () => {
            try {
                setPersonBookmarks( await GetPersonBookmarksById(token)); // should be the right id!
                setTitleBookmarks( await GetTitleBookmarksById(token)); // should be the right id!
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        }   
       getBookmarks();
       
    }, [])

    function PersonBookmark(person) {       
        const [personBookmark, setPersonBookmark] = useState(null);
        const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;

        useEffect(() =>{
            const getPersonBookmark = async () => {
                if(person){
                    try {
                        setPersonBookmark((await GetPersonBackdrop(person.data.personId)).person_results);
                    } catch (error) {
                        console.log(error);
                    }
                }     
            }
            getPersonBookmark();
        }, [person])
        
        if(personBookmark){
            return(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={                      
                        personBookmark[0]?.profile_path !== undefined ? 
                        imageUrl + personBookmark[0]?.profile_path :
                        "/no-image.jpg"
                        } />
                        <Card.Body>
                            <Card.Title> {personBookmark[0]?.name} </Card.Title> {/* name can be undefined, do something */}
                            <Card.Text> {person.annotation} </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                </Card>
                );
        
        }
    }

    function TitleBookmark(title) {
        const [titleBookmark, setTitleBookmark] = useState(null);        
        const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;

        useEffect(() =>{
            const getTitleBookmark = async () => {
                if(title){
                    try {
                        setTitleBookmark(await GetTitleBackdrop(title.data.titleId));
                    } catch (error) {
                        console.log(error);
                    }
                }
        
            }
            getTitleBookmark();
        }, [title])
        if(titleBookmark){
   
            console.log("logging titleBookmark for " +title.data.titleId);
            console.log(titleBookmark[0]?.backdrop_path);
            return(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={imageUrl + titleBookmark[0]?.backdrop_path} />
                        <Card.Body>
                            <Card.Title> {titleBookmark[0]?.name} </Card.Title>
                            <Card.Text> {title.annotation} </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                </Card>
                );
        }
       

    }
    
    if(personBookmarks && titleBookmarks){
    
        return(
            <div className="container">
                <h1>Hello watchlist</h1>
                {/* <ButtonGroup>
                    <Button variant="underline">Titles</Button>
                    <Button>Persons</Button>
                </ButtonGroup> */}
                                
                <Tabs
                    defaultActiveKey="Titles"
                    id="uncontrolled-tab-example"
                    className="mb-3">
                    <Tab eventKey="Titles" title="Titles">
                        List of Title Bookmarks:
                        <Container>
                            <Row xs={1} md={4}> 
                                {titleBookmarks.map((title, index) => <TitleBookmark data={title} key={index}/> )}
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="Persons" title="Persons">
                        List of Person Bookmarks:

                        <Container>
                            <Row xs={1} md={4}> 
                                {personBookmarks.map((person, index) => <PersonBookmark data={person} key={index}/>)}                
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>                    
         

            </div>
        );
    }
}