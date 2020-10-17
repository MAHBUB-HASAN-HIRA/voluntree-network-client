import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header/Header';
import './App.css';
import Home from './Components/Home/Home'
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { createContext } from 'react';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import MyTask from './Components/MyTask/MyTask';
import Admin from './Components/Admin/Admin';
import userEvent from '@testing-library/user-event';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
     setLoggedInUser(userInfo); 
    }
  },[])

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, selectedTask, setSelectedTask]}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <PrivateRoute path='/register'>
            <Register/>
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <Admin/>
          </PrivateRoute>
          <PrivateRoute path='/mytasks'>
            <MyTask/>
          </PrivateRoute>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
   
  );
}

export default App;
