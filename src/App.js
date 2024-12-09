import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/Homepage';
import Navigation from './Component/Navigation';
import { Routes, Route } from "react-router";
import DetailedTitle from './Pages/DetailedTitle';
import DetailedPerson from './Component/DetailedPerson';
import Error from './Component/Error';
import { UserProvider } from "./Store/store";
import WactList from './Pages/WatchList';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserRating from './Pages/UserRating';
import UserSetting from './Pages/UserSetting';
import SearchResult from './Pages/SearchResult';
import Profile from './Pages/Profile';

function App() {
  
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
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/watchlist" element={<WactList/>}></Route>
            <Route path="/search" element={<SearchResult/>}></Route>
            <Route path="/rating" element={<UserRating/>}></Route>
            <Route path="/settings" element={<UserSetting/>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
