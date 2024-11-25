import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Homepage } from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './Service/TitleService';
import Carousel from 'react-bootstrap/Carousel';
import SimpleTitle from './Component/SimpleTitle';

function App() {
  const [titles, setTitles] = useState([]);
  const baseApiUrl = process.env.REACT_APP_BASE_API_LINK + "titles/";


  useEffect(() => {
    setTitles(GetAllTitles());
    
  },[]);
  
  return (
    <div className="App">
      <Navigation/>
      <Carousel data-bs-theme="dark">
        {titles.map((title) => {
        <SimpleTitle titleData={title}/>
        })}    
     </Carousel>
      
    </div>
  );
}

export default App;
