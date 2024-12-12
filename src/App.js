import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './Pages/IMDB/Homepage';
import Navigation from './Component/Navigation';
import { Routes, Route } from "react-router";
import DetailedTitle from './Pages/IMDB/DetailedTitle';
import DetailedPerson from './Pages/IMDB/DetailedPerson';
import Error from './Component/Error';
import { UserProvider } from "./Store/store";
import WatchList from './Pages/User/WatchList';
import Login from './Pages/User/Login';
import Signup from './Pages/User/Signup';
import UserRating from './Pages/User/UserRating';
import UserSetting from './Pages/User/UserSetting';
import SearchResult from './Pages/IMDB/SearchResult';
import Profile from './Pages/User/Profile';

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
            <Route path="/watchlist" element={<WatchList/>}></Route>
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
