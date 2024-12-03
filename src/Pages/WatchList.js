import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {GetPersonBookmarksById, GetTitleBookmarksById} from '../Service/BookmarkService';
import { ButtonGroup, Container, Row } from 'react-bootstrap';
import {useUser} from '../Store/store';
import { useNavigate } from "react-router";
import TitleCard from '../Component/TitleCard';
import PersonCard from '../Component/PersonCard';

export default function WactList(){
    const [personBookmarks, setPersonBookmarks] = useState(null);
    const [titleBookmarks, setTitleBookmarks] = useState(null);
    const {token} = useUser();
    const navigate = useNavigate();

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
       
    }, []);

    
    if(personBookmarks && titleBookmarks){
    
        return(
            <div className="container">
                <h1>Your Watchlist</h1>
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
                                {titleBookmarks.map((title, index) => <TitleCard data={title} key={index}/> )}
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="Persons" title="Persons">
                        List of Person Bookmarks:
                        <Container>
                            <Row xs={1} md={4}> 
                                {personBookmarks.map((person, index) => <PersonCard data={person} key={index}/>)}                
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>                    
         

            </div>
        );
    }
}