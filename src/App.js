import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { Routes, Route } from "react-router";
import { useEffect, useState } from 'react';
import SimpleTitle from './Component/SimpleTitle';
import DetailedTitle from './Component/DetailedTitle';
import SimplePerson from './Component/SimplePerson';
import DetailedPerson from './Component/DetailedPerson';
import Error from './Component/Error';

function App() {
    return (
    <div className="App">

    <Routes>
      {/* <Route element={<Navigation />} >
        <Route path="/title" element={<SimpleTitle/>}/>
        <Route index element={<Homepage/>}/>
      </Route> */}

      <Route element={<Navigation/>}>
        <Route path="/" element={<Homepage/>} />
        <Route path="/title/:id" element={<DetailedTitle/>} />
        <Route path="/person/:id" element={<DetailedPerson/>} />
        <Route path="*" element={<Error></Error>}></Route>
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
