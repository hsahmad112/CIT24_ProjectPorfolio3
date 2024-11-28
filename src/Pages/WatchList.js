import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {GetPersonBookmarksById, GetPersonBackdrop, GetTitleBackdrop} from '../Service/BookmarkService';

export default function WactList(){
    const {personBookmarks, setPersonBookmarks} = useState([]);

    useEffect(() =>{
        const getPersonBookmarks = async () => {
            try {
                setPersonBookmarks( await GetPersonBookmarksById()); // should be the right id!
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        }
       getPersonBookmarks();
    }, [])

    function PersonBookmark(person) {
        const data = GetPersonBackdrop(person.person_id).person_results;
        return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.profile_path} />
                <Card.Body>
                <Card.Title> {data.name} </Card.Title>
                <Card.Text> {person.annotation} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        );

    }

    function TitleBookmark(title) {
        const data = GetTitleBackdrop(title.title_id);
        return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.profile_path} />
                <Card.Body>
                <Card.Title> {data.name} </Card.Title>
                <Card.Text> {title.annotation} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        );

    }

    return(
        <div className="container">
            <h1>Hello watchlist</h1>

            <Tabs
                defaultActiveKey="Titles"
                id="uncontrolled-tab-example"
                className="mb-3">
                <Tab eventKey="Titles" title="Titles">
                    List of Title Bookmarks:
                    {personBookmarks?.map((title) => <TitleBookmark title={title}/>)}
                </Tab>
                <Tab eventKey="Persons" title="Persons">
                    List of Person Bookmarks:
                    {personBookmarks?.map((person) => <PersonBookmark person={person}/>)}
                </Tab>
            </Tabs>
        </div>
    );

}