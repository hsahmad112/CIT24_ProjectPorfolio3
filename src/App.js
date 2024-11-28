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

function App() {
    return (
    <div className="App">
      <User.Provider value="bob">
        <Routes>
          <Route path="/" element={<Navigation/>}>
            <Route index element={<Homepage/>} />
            <Route path="/title/:id" element={<DetailedTitle/>} />
            <Route path="/person/:id" element={<DetailedPerson/>} />
            <Route path="/login" element={<></>}></Route>
            <Route path="/signin" element={<></>}></Route>
            <Route path="/watchlist" element={<WactList/>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Route>
        </Routes>
      </User.Provider>
    </div>
  );
}

export default App;
