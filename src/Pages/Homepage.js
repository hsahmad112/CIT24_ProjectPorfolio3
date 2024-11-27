import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './../Service/TitleService';
import {Carousel, Container, Row} from 'react-bootstrap';
import SimpleTitle from '../Component/SimpleTitle';
import { useNavigate } from "react-router";

export default function Homepage(){
    const navigate = useNavigate();

    const [titles, setTitles] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setTitles((await GetAllTitles()).entities);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

      },[]);

      if(titles){
         console.log(titles);
        // some images are 300 & 420, while others are 300 & 375
        // gives issues when they are displayed in the carousel
        // one fix it to set hard code the image ratio, but some images
        // will be streched, not ideal

      }

      if(titles.length > 0 ){
          return(
            <div>
                <Carousel data-bs-theme="dark">
                  {titles?.map((title) => SimpleTitle(title, navigate))}  
                </Carousel> 
              <br></br> 
              {/*<Container>
                <Row>
                 {titles?.map((title) => <SimpleTitle title={title} key={title.url}></SimpleTitle> )}   
                </Row>
              </Container> */}
            </div>
          );
      }
}
