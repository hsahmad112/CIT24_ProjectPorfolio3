import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './../Service/TitleService';
import Carousel from 'react-bootstrap/Carousel';
import SimpleTitle from '../Component/SimpleTitle';

export default function Homepage(){
    const [titles, setTitles] = useState([]);
    //const baseApiUrl = process.env.REACT_APP_BASE_API_LINK + "titles/";
  
    useEffect(() => {
        let d = GetAllTitles();
        setTitles(d);
      },[]);

      if(titles) console.log(titles);

      if(titles != null ){

          return(
            <Carousel data-bs-theme="dark">
              {titles?.map((title, index) => ( <SimpleTitle titleData={title} key={index}/>) )}    
           </Carousel>
          );
      }
}