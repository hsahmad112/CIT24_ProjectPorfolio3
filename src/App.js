import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import { Homepage } from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { useEffect, useState } from 'react';
import {GetAllTitles } from './Service/TitleService';


function App() {
  const [titles, setTitles] = useState([]);
  const baseApiUrl = process.env.REACT_APP_BASE_API_LINK + "titles/";


  useEffect(() => {
    setTitles(GetAllTitles());
    
  },[]);
  
  return (
    <div className="App">
      <Navigation/>
      
    </div>
  );
}

export default App;
