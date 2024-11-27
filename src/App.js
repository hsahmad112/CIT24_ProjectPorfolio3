import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import Navigation from './Component/Navigation';

import { Routes, Route } from "react-router";
import { useEffect, useState } from 'react';
import SimpleTitle from './Component/SimpleTitle';

function App() {
    return (
    <div className="App">

    <Routes>
      <Route element={<Navigation />} >
        <Route path="/title" element={<SimpleTitle/>}/>
        <Route index element={<Homepage/>}/>
      </Route>
    </Routes>

      {/* <Navigation/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Homepage/> */}
    </div>
  );
}

export default App;
