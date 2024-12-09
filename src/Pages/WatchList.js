import { useEffect, useState } from 'react';
import { GetPersonBookmarks, GetTitleBookmarks } from '../Service/BookmarkService';
import { Container, Row, Tab, Tabs, ButtonGroup } from 'react-bootstrap';
import TitleCard from '../Component/TitleCard';
import PersonCard from '../Component/PersonCard';
import { useNavigate } from "react-router";

export default function WactList(){
    const [personBookmarks, setPersonBookmarks] = useState(null);
    const [titleBookmarks, setTitleBookmarks] = useState(null);
    //const navigate = useNavigate();

    useEffect(() =>{
        const getBookmarks = async () => {
            try {
                setPersonBookmarks(await GetPersonBookmarks()); 
                setTitleBookmarks(await GetTitleBookmarks());

            } catch (error) {
                console.error('Error fetching data:', error);
            }            
        }   
       getBookmarks();
       
    }, []);
    
    
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
                            {titleBookmarks?.map((title, index) => <TitleCard data={title} key={index}></TitleCard>)}     
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="Persons" title="Persons">
                    List of Person Bookmarks:
                    <Container>
                        <Row xs={1} md={4}> 
                            {personBookmarks?.map((person, index) => <PersonCard data={person} key={index}> </PersonCard>)}                
                        </Row>
                    </Container>
                </Tab>
            </Tabs>               

        </div>
    );
    
}