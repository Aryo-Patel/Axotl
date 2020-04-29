//React and ReactRouter imports
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//Redux Imports
import {Provider} from 'react-redux'
import store from "./store"
import {loadUser} from './actions/auth'

//Component Imports
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddEducation from './components/profile/AddEducation';
import AddExperience from './components/profile/AddExperience';
import AddPreviousHackathon from './components/profile/AddPreviousHackathon';
import Dashboard from './components/dashboard/Dashboard';
import Logout from './components/auth/Logout';
import NotFound from './components/routing/NotFound';
import Hackathons from './components/hackathons/Hackathons';
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import PrivateRoute from './components/routing/PrivateRoute'

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store} >
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path = '/' component = {Landing} />
          <Switch>
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/register' component = {Register} />
<<<<<<< HEAD
            <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
            <PrivateRoute exact path = '/profile' component = {Profile} />
            <PrivateRoute exact path = '/add-education' component = {AddEducation} />
            <PrivateRoute exact path = '/add-experience' component = {AddExperience} />
            <PrivateRoute exact path = '/add-previous-hackathon' component = {AddPreviousHackathon} />
            <PrivateRoute exact path = '/create-profile' component = {CreateProfile} />
            <PrivateRoute exact path = '/hackathons' component = {Hackathons} />
            <PrivateRoute exact path = '/logout' component = {Logout} />
            <Route exact path = '/forgotpassword' component = {ForgotPassword} />
            <Route path = '/resetpassword' component = {ResetPassword} />
=======
            <Route exact path = '/dashboard' component = {Dashboard} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/add-education' component = {AddEducation} />
            <Route exact path = '/add-experience' component = {AddExperience} />
            <Route exact path = '/add-previous-hackathon' component = {AddPreviousHackathon} />
            <Route exact path = '/create-profile' component = {CreateProfile} />
            <Route exact path = '/edit-profile' component = {EditProfile} />
            <Route exact path = '/hackathons' component = {Hackathons} />
            <Route exact path = '/logout' component = {Logout} />
>>>>>>> b176b883c6f5b6fa3ca6dd74bfcfcdd9d1b047a0
            <Route component = {NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
