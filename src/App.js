import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { Routes, Route, useLocation} from "react-router";
import { useEffect, useState, useContext } from 'react';
import SimpleTitle from './Component/SimpleTitle';
import DetailedTitle from './Component/DetailedTitle';
import SimplePerson from './Component/SimplePerson';
import DetailedPerson from './Component/DetailedPerson';
import Error from './Component/Error';
import { UserContext } from "./Store/store";
import { UserProvider } from './Store/store';
import WactList from './Pages/WatchList';
import Login from './Pages/Login';
import {useUser} from "./Store/store";
import Signup from './Pages/Signup';


function App() {
  
  //const [userName, setUserName] = useState('none');
  const location = useLocation();

  //const {userName, login, logout} = useUser();
  
    return (
    <div className="App">
      <UserProvider >
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
      </UserProvider>
    </div>
  );
}

export default App;
