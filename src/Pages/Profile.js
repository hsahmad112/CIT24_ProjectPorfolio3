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

export default function Profile(){

    const [userRatings, setUserRatings] = useState([]);
    const [personBookmarks, setPersonBookmarks] = useState([]);
    const [titleBookmarks, setTitleBookmarks] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [timer, setTimer] = useState(5);

 

    let navigate = useNavigate();

    const {userName} = useUser();

    useEffect(() =>{
        const fetchRatings = async () => {

            const ratings = await GetAllRatings();
         
            if(ratings.success){
                console.log("Have ratings");
                setUserRatings(ratings.data);
                
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
    }, []);

    useEffect(() =>{
        const getBookmarks = async () => {
        
            const personBookmarks = await GetPersonBookmarks();
            const titleBookmarks = await GetTitleBookmarks();
            try {
                setPersonBookmarks(personBookmarks); 
                setTitleBookmarks(titleBookmarks);

            } catch (error) {
                console.error('Error fetching data:', error);
            }            
        }   
       getBookmarks();
       
    }, []);

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
                        {userRatings.map((u) => <RatingProfile title={u} key={u.titleId} navigate={navigate}/>  )/*need of key?, not currently used in Rating component*/} 
                        </Col>
        
                        
        
        
                        <Col xs = {7} >
                        <Stack className="align-items-end">
        <h3 style={{textAlign: 'right'}}> Title Bookmarks: </h3>
        <div className="p-2"> 
       
        {titleBookmarks.map((title, index) => <TitleProfile data={title} key={index}></TitleProfile>)}  
        </div>

        <h3 style={{textAlign: 'right'}}> Person Bookmarks: </h3>
        <div className="p-2">
        {personBookmarks.map((person, index) => <PersonProfile data={person} key={index}></PersonProfile>)} 
        </div>
        </Stack>
        </Col>
        </Row>
                            
        </Container>      





        </>
    )
} 