import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {GetAllTitles } from '../../Service/TitleService';
import {Carousel, Container, Row} from 'react-bootstrap';
import SimpleTitle from '../../Component/TitleComponents/SimpleTitle';
import { useNavigate } from "react-router";
import TitleCard from '../../Component/TitleComponents/TitleCard';
import CustomCarousel from '../../Component/CustomCarousel';

export default function Homepage(){
  
  const [titles, setTitles] = useState([]);
  const navigate = useNavigate();

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

      return(
        <div>
          
          {titles?.length > 0 
          
          ?  
            <>
  
            
              {/* <Carousel data-bs-theme="dark">              
                    {titles?.map((title) => SimpleTitle(title, navigate))}  
                  </Carousel> */}
              <CustomCarousel items={titles}/>
            
            </>   
          :
            <b>could not find any titles</b>}   
        </div>
      );
      
}
