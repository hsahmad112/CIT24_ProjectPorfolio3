import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {GetPersonBookmarksById, GetPersonBackdrop, GetTitleBackdrop} from '../Service/BookmarkService';

export default function WactList(){
    const [personBookmarks, setPersonBookmarks] = useState([]);
    const [titleBookmarks, setTitleBookmarks] = useState([]);

    useEffect(() =>{
        const getPersonBookmarks = async () => {
            try {
                setPersonBookmarks( await GetPersonBookmarksById()); // should be the right id!
               // setTitleBookmarks( await GetTitleBookmarksById());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        }
       getPersonBookmarks();
    }, [])

    function PersonBookmark(data) {       
        const [personBookmark, setPersonBookmark] = useState({});
        useEffect(() =>{
            const getPersonBookmark = async () => {
                try {
                    console.log(data?.person);
                    setPersonBookmark(await GetPersonBackdrop(data.person?.personId).person_results);
               
                } catch (error) {
                    console.log(error);
                }
               
            }
            getPersonBookmark();
        }, [data])

        return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={personBookmark?.profile_path} />
                <Card.Body>
                    <Card.Title> {personBookmark?.name} </Card.Title>
                    <Card.Text> {data.annotation} </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
        </Card>
        );

    }

    function TitleBookmark(title) {

        const [titleBookmark, setTitleBookmark] = useState({});
        useEffect(() =>{

            const getTitleBookmark = async () => {
                try {
                    setTitleBookmark(await GetTitleBackdrop(title.title_id));
                    console.log(titleBookmark.profile_path);
                } catch (error) {
                    console.log(error);
                }
            }
            getTitleBookmark();
        }, [title])

        return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={titleBookmark.profile_path} />
                <Card.Body>
                    <Card.Title> {titleBookmark.name} </Card.Title>
                    <Card.Text> {title.annotation} </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
        </Card>
        );

    }
    if(personBookmarks){
        return(
            <div className="container">
                <h1>Hello watchlist</h1>
    
                <Tabs
                    defaultActiveKey="Persons"
                    id="uncontrolled-tab-example"
                    className="mb-3">
                    <Tab eventKey="Titles" title="Titles">
                        List of Title Bookmarks:
                        {titleBookmarks?.map((title, index) => <TitleBookmark title={title} key={index}/>)}
                    </Tab>
                    <Tab eventKey="Persons" title="Persons">
                        List of Person Bookmarks:
                        {personBookmarks?.map((person, index) => <PersonBookmark data={person} key={index}/>)}
                    </Tab>
                </Tabs>
            </div>
        );
    } 

}