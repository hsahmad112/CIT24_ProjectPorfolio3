import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { useEffect, useState } from 'react';

function App() {
    return (
    <div className="App">
      <Navigation/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Homepage/>
    </div>
  );
}

export default App;
