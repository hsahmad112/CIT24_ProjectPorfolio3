import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './../Service/TitleService';
import {Carousel, Container, Row} from 'react-bootstrap';
import SimpleTitle from '../Component/SimpleTitle';
import { useNavigate } from "react-router";
import CustomCarousel from '../Component/CustomCarouse';

export default function Homepage(){
    const navigate = useNavigate();

    const [titles, setTitles] = useState([]);
    const [arrayList, setArrayList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setTitles((await GetAllTitles()).entities);
          
          setArrayList([titles.length]);
          titles?.map((title, index) => arrayList[index] = <SimpleTitle title={title} navigate={navigate}></SimpleTitle>)

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
 
       // titles.map()(t) =>arrayList;
      }

      if(titles.length > 0){
          return(
            <div>
                {/* <Carousel data-bs-theme="dark">
                  {titles?.map((title) => SimpleTitle(title, navigate))}  
                </Carousel>  */}
                <CustomCarousel items={[<p>1</p>,<p>2</p>,<p>3</p>,<p>4</p>,<p>5</p>,<p>6</p>,<p>7</p>,<p>8</p>]}></CustomCarousel>
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
