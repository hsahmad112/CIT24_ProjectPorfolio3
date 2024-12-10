import {GetAllRatings} from '../Service/RatingService';
import { GetPersonBookmarks, GetTitleBookmarks } from '../Service/BookmarkService';

import { useEffect, useState } from 'react';
import { useUser } from '../Store/store';
import { useNavigate } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import {Card, Container, Row, Col, Carousel, Stack} from 'react-bootstrap';

import TitleProfile from '../Component/TitleProfile';
import PersonProfile from '../Component/PersonProfile';

import TitlePlaceholder from '../Component/TitlePlaceholder';
import Rating from '../Component/Rating';
import RatingProfile from '../Component/RatingProfile';
import Pagination from 'react-bootstrap/Pagination';

export default function Profile(){

    const [userRatings, setUserRatings] = useState([]);
    const [personBookmarks, setPersonBookmarks] = useState([]);
    const [titleBookmarks, setTitleBookmarks] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const[ratingPage, setRatingPage] = useState(0); //The page we are on
    const [ratingTotalPages, setRatingTotalPages] = useState(1) //number of pages in total, we will set state to value recieved from backend
    const [RatingPagenationItems, setRatingPagenationItems] = useState([]); //State is containing the Pagenation components, that is filled below 

    const[titleBookmarkPage, setTitleBookmarkPage] = useState(0); //The page we are on
    const [titleBookmarkTotalPages, setTitleBookmarkTotalPages] = useState(1) //number of pages in total, we will set state to value recieved from backend
    const [titleBookmarkPagenationItems, setTitleBookmarkPagenationItems] = useState([]); //State is containing the Pagenation components, that is filled below 
    
    const[personBookmarkPage, setPersonBookmarkPage] = useState(0); //The page we are on
    const [personBookmarkTotalPages, setPersonBookmarkTotalPages] = useState(1) //number of pages in total, we will set state to value recieved from backend
    const [personBookmarkPagenationItems, setPersonBookmarkPagenationItems] = useState([]); //State is containing the Pagenation components, that is filled below 
    

    const pageSize = 5; //For now, hard-backed

    const [timer, setTimer] = useState(5);

 

    let navigate = useNavigate();

    const {userName} = useUser();

    const ratingQueryParams = //Used for pagenation, we send these queryParams when fetching bookmarks in BookmarkService
    { page: ratingPage,  //Both params are set to state
      pageSize: pageSize  
    };

    const titleBookmarkQueryParams = //Used for pagenation, we send these queryParams when fetching bookmarks in BookmarkService
    { page: titleBookmarkPage,  //Both params are set to state
      pageSize: pageSize  
    };

    const personBookmarkQueryParams = //Used for pagenation, we send these queryParams when fetching bookmarks in BookmarkService
    { page: personBookmarkPage,  //Both params are set to state
      pageSize: pageSize  
    };

    

    



useEffect(() =>{ //Effect for Rating pagenation

const ratings = [];
      
for (let number = 0; number <= ratingTotalPages-1; number++) {
    ratings.push(
      <Pagination.Item
        key={number}
        active={number === ratingPage}
        onClick={() => handleRatingPageChange(number)}
      >
        {number+1} {/* Plus 1, as page starts at 0, we want to display 1 to user*/}
      </Pagination.Item>
    );
  }
  setRatingPagenationItems(ratings);

}, [ratingTotalPages, ratingPage]);

const handleRatingPageChange = (page) => {
    setRatingPage(page);
    console.log("Changing page to: " + page );
  };

  useEffect(() =>{
    const fetchRatings = async () => {
        

        const ratings = await GetAllRatings(ratingQueryParams);
     
        if(ratings.success){
            console.log("Have ratings");
            setUserRatings(ratings.data.entities);
            setRatingTotalPages(ratings.data.numberOfPages) //Value from backend
        
            setIsLoading(false);
        }
        else {
            console.log("Have NO ratings");
            setIsLoading(false);
            switch (ratings.message) {
                case "401":
                    setErrorMessage("401");
                    //navigate("/login");
                    break;
            
                default:
                    break;
            }
        }
    }
    fetchRatings();
}, [ratingPage]);

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




    const handleTitleBookmarkPageChange = (page) => {
        setTitleBookmarkPage(page);
        console.log("Changing page to: " + page );
      };

      const handlePersonBookmarkPageChange = (page) => {
        setPersonBookmarkPage(page);
        console.log("Changing page to: " + page );
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
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }            
        }   
       getBookmarks();

    }, [titleBookmarkPage, personBookmarkPage]);

    useEffect(() => {
        let countDown;
        const errorCodeHandler = () => {
            if (errorMessage === "401") {
                console.log("Unauthorized. We redirect in 5 sec my friend");
               // setTimeout(() => {navigate("/login")}, 5000);  //Needs to be in lambda function, otherwise navigate fires imediately
                 countDown = setInterval(() => {
                    setTimer((t) => {
                        if(t <=0){
                            clearInterval(countDown); //Stops countDown timer from continously running
                            navigate("/login");
                            return 0; //timer state is set to 0
                        }
                        return t - 1; //aka subtract 1 sec from timer
                    })
                }, 1000);  
            }    
        };
        errorCodeHandler(); //Calls the above method, to be used within Effect
        return () => clearInterval(countDown); //Cleanup function, which gets called upon component unmount or change of state    

    }, [errorMessage]);

    return(
        <>


        {isLoading &&
            <Container>
            <h1>Ratings are being loaded...</h1>
            <Row xs={1} md={4}>
            <TitlePlaceholder/>
            <TitlePlaceholder/>
            <TitlePlaceholder/>
            <TitlePlaceholder/> 
            </Row>
            </Container>
        } {/* Needs better styling ^^*/}

        {!isLoading && errorMessage === "401" && 
            <Alert key={"danger"} variant={"danger"}>
            Warning!! You are not logged in! <Alert.Link onClick={() => navigate("/login")}>{"Click here"}</Alert.Link>. if not redirected within {timer== 1 ? `${timer} second` : `${timer} seconds` }
            </Alert> //When at 1 sec, write "second" as singular form
        }

            <h1>Profile page for user: {userName}</h1>
        <Container fluid = "true">

        <Row>
                <Col xs ={4}>
                        <h3 style={{textAlign: 'left'}}> Ratings:</h3>
                            <div>
                                <Pagination>{RatingPagenationItems}</Pagination>
                                <br />
                            </div>
                        {userRatings?.map((u) => <RatingProfile title={u} key={u.titleId} navigate={navigate}/>  )/*need of key?, not currently used in Rating component*/} 
                        </Col>
        
                        
        
        
                        <Col xs = {7} >
                        <Stack className="align-items-end">
        <h3 style={{textAlign: 'right'}}> Title Bookmarks: </h3>
                            <div>
                                <Pagination>{titleBookmarkPagenationItems}</Pagination>
                                <br />
                            </div>
        <div className="p-2"> 
       
        {titleBookmarks?.map((title, index) => <TitleProfile data={title} key={index}></TitleProfile>)}  
        </div>

        <h3 style={{textAlign: 'right'}}> Person Bookmarks: </h3>
                        
                            <div>
                                <Pagination>{personBookmarkPagenationItems}</Pagination>
                                <br />
                            </div>
        <div className="p-2">
        {personBookmarks?.map((person, index) => <PersonProfile data={person} key={index}></PersonProfile>)} 
        </div>
        </Stack>
        </Col>
        </Row>
                            
        </Container>      





        </>
    )
} 