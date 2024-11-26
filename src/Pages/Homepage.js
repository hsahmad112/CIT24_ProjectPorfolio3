import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './../Service/TitleService';
import {Carousel, Container, Navbar, Row} from 'react-bootstrap';
import SimpleTitle from '../Component/SimpleTitle';

export default function Homepage(){
    const [titles, setTitles] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setTitles((await GetAllTitles()));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
      },[]);

      if(titles){
        // console.log(titles);
        // some images are 300 & 420, while others are 300 & 375
        // gives issues when they are displayed in the carousel
        // one fix it to set hard code the image ratio, but some images
        // will be streched, not ideal

        // ERROR
        // Warning: Function components cannot be given refs. Attempts to access 
        // this ref will fail. Did you mean to use React.forwardRef()?
        //
        // get this error message when inserting a non-bootstrap component in between
        // an carousel component
        // makes it dificult to split up components into smal pieces to be reused 
      }

      function DisplayGenre(genres){
        let genresString = "";
        let total = genres.length;
          for (let index = 0; index < genres.length; index++) {
      
            if(total === 1){
              genresString += genres[index];
              break;
            }
            if(index === total - 1){
              genresString += " and " + genres[index];
              break;
            }
            genresString += genres[index] + ", ";
          }

          return genresString;
      }

      let d = titles?.map((title) => 
          <Carousel.Item interval={5000} key={title.url} >
            <img src={title.posterUrl} text="First slide" width="300" height="420"/>
            <Carousel.Caption style={{color: "white"}}>
            <h5>{title.primaryTitle}</h5>
            {title.startYear && <p>Release year: {title.startYear}</p> }
            <p>Genres: {DisplayGenre(title.genresList)}</p>
            </Carousel.Caption>
          </Carousel.Item>
      ) ;

      if(titles.length > 0 ){
          return(
            <div>
               {/* <Carousel data-bs-theme="dark">
                {d}
              </Carousel> 
              <br></br> */}
              <Container>
                <Row>
                 {titles?.map((title) => <SimpleTitle title={title} key={title.url}></SimpleTitle> )}   
                </Row>
              </Container>
            </div>
          );
      }
}
