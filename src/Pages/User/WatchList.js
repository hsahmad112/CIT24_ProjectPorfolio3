import { useEffect, useState } from 'react';
import { GetPersonBookmarks, GetTitleBookmarks } from '../../Service/BookmarkService';
import { Container, Row, Tab, Tabs} from 'react-bootstrap';
import TitleCard from '../../Component/TitleComponents/TitleCard';
import PersonCard from '../../Component/PersonComponents/PersonCard';
import Pagination from 'react-bootstrap/Pagination';

export default function WatchList(){
  const [personBookmarks, setPersonBookmarks] = useState(null);
  const [titleBookmarks, setTitleBookmarks] = useState(null);

  const[titleBookmarkPage, setTitleBookmarkPage] = useState(0); //The page we are on
  const [titleBookmarkTotalPages, setTitleBookmarkTotalPages] = useState(1); //number of pages in total, we will set state to value recieved from backend
  const [titleBookmarkPagenationItems, setTitleBookmarkPagenationItems] = useState([]); //State is containing the Pagenation components, that is filled below 
  
  const[personBookmarkPage, setPersonBookmarkPage] = useState(0); 
  const [personBookmarkTotalPages, setPersonBookmarkTotalPages] = useState(1);
  const [personBookmarkPagenationItems, setPersonBookmarkPagenationItems] = useState([]);
  
  const pageSize = 5; //For now, hard-backed

  const titleBookmarkQueryParams = { //Used for pagenation, we send these queryParams when fetching bookmarks in BookmarkService
    page: titleBookmarkPage,  //Both params are set to state
    pageSize: pageSize  
  };

  const personBookmarkQueryParams = {
    page: personBookmarkPage, 
    pageSize: pageSize  
  };

  const handleTitleBookmarkPageChange = (page) => {
      setTitleBookmarkPage(page);
  };

  const handlePersonBookmarkPageChange = (page) => {
      setPersonBookmarkPage(page);
  };
      
  useEffect(() =>{
    const getBookmarks = async () => {
      const personBookmarks = await GetPersonBookmarks(personBookmarkQueryParams);
      const titleBookmarks = await GetTitleBookmarks(titleBookmarkQueryParams);

      try {
        setPersonBookmarks(personBookmarks.entities); 
        setTitleBookmarks(titleBookmarks.entities);

        setTitleBookmarkTotalPages(titleBookmarks.numberOfPages);
        setPersonBookmarkTotalPages(personBookmarks.numberOfPages); 
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }            
    }   
    getBookmarks();

  }, [titleBookmarkPage, personBookmarkPage]);

  useEffect(() =>{ //Effect for Title Bookmark pagenation
      const titleBookmarks = [];
            
      for (let number = 0; number <= titleBookmarkTotalPages-1; number++) {
        titleBookmarks.push(
          <Pagination.Item
            key={number}
            active={number === titleBookmarkPage}
            onClick={() => handleTitleBookmarkPageChange(number)}
          >
            {number+1} {/* Plus 1, as page starts at 0, we want to display 1 to user*/}
          </Pagination.Item>
        );
      }
    setTitleBookmarkPagenationItems(titleBookmarks);
    
  }, [titleBookmarkTotalPages, titleBookmarkPage]);
  
  useEffect(() =>{ //Effect for Person Bookmark pagenation
      const personBookmarks = [];
            
      for (let number = 0; number <= personBookmarkTotalPages-1; number++) {
          personBookmarks.push(
            <Pagination.Item
              key={number}
              active={number === personBookmarkPage}
              onClick={() => handlePersonBookmarkPageChange(number)}
            >
              {number+1} {/* Plus 1, as page starts at 0, we want to display 1 to user*/}
            </Pagination.Item>
          );
        }
        setPersonBookmarkPagenationItems(personBookmarks);
      
      }, [personBookmarkTotalPages, personBookmarkPage]);
  
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
                      <Row>
                          <div>
                              <Pagination>{titleBookmarkPagenationItems}</Pagination>
                              <br />
                          </div>
                      </Row>
                  </Container>
              </Tab>
              <Tab eventKey="Persons" title="Persons">
                  List of Person Bookmarks:
                  <Container>
                      <Row xs={1} md={4}> 
                          {personBookmarks?.map((person, index) => <PersonCard data={person} key={index}> </PersonCard>)}  
                      </Row>
                      <Row>
                          <div>
                              <Pagination>{personBookmarkPagenationItems}</Pagination>
                              <br/>
                          </div>    
                      </Row>
                  </Container>
              </Tab>
          </Tabs>               

      </div>
  );
  
}