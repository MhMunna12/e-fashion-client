import React, { createContext, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home/Home/Home'
import Admin from './component/Admin/Admin/Admin'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BlogFullDetails from './component/Home/BlogFullDetails/BlogFullDetails';
import Login from './component/Home/Login/Login';
import MenuBar from './component/Home/MenuBar/MenuBar';
import NavBar from './component/Home/NavBAr/NavBar';
import PrivateRoute from './component/Home/PrivateRoute/PrivateRoute';

export const UserContext = createContext(); 
function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
        // newUser: false,
        isAdmin: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
  });
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
      {/* <MenuBar/> */}
      <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/blog/:blogId">
            <BlogFullDetails/>
          </Route>
          <PrivateRoute path="/admin">
            <Admin/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
