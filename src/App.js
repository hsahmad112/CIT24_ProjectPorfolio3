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
import { User } from "./Store/store";
import WactList from './Pages/WatchList';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
    return (
    <div className="App">
      <User.Provider value="none">
        <Routes>
          <Route path="/" element={<Navigation/>}>
            <Route index element={<Homepage/>} />
            <Route path="/title/:id" element={<DetailedTitle/>} />
            <Route path="/person/:id" element={<DetailedPerson/>} />
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/watchlist" element={<WactList/>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Route>
        </Routes>
      </User.Provider>
    </div>
  );
}

export default App;
