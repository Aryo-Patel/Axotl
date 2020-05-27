//React and ReactRouter imports
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//Redux Imports
import { Provider } from 'react-redux'
import store from "./store"
import { loadUser } from './actions/auth'

//Component Imports
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile/CreateProfile';
import CreateSponsorProfile from './components/profile/CreateSponsorProfile';
import EditProfile from './components/profile/EditProfile';
import EditSponsorProfile from './components/profile/EditSponsorProfile';
import AddEducation from './components/profile/AddEducation';
import AddExperience from './components/profile/AddExperience';
import AddPreviousHackathon from './components/profile/AddPreviousHackathon';
import Dashboard from './components/dashboard/Dashboard';
import Logout from './components/auth/Logout';
import NotFound from './components/routing/NotFound';
import Discover from './components/discover/Discover';
import ForgotPassword from './components/auth/ForgotPassword'
import ChangePassword from './components/auth/ChangePassword'
import ResetPassword from './components/auth/ResetPassword'
import PrivateRoute from './components/routing/PrivateRoute'
import ConfirmEmailSponsor from './components/auth/ConfirmEmailSponsor'
import ConfirmEmailRecipient from './components/auth/ConfirmEmailRecipient'
import Hackathon from './components/singleView/Hackathon'
import Company from './components/singleView/Company'
import Settings from './components/settings/Settings'
import EmailSent from './components/auth/EmailSent';
import Chat from './components/chat/Chat';
import MyHackathons from './components/hackathons/MyHackathons';
import Posts from './components/posts/Posts'

//import logo from './logo.svg';
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

          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-previous-hackathon' component={AddPreviousHackathon} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/create-sponsor-profile' component={CreateSponsorProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/edit-sponsor-profile' component={EditSponsorProfile} />
            <PrivateRoute exact path='/discover' component={Discover} />
            <PrivateRoute exact path='/chat' component={Chat} />
            <PrivateRoute exact path='/logout' component={Logout} />
            <PrivateRoute exact path='/my-hackathons' component={MyHackathons} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword' component={ResetPassword} />
            <Route path='/email-sent' component={EmailSent} />
            <Route path='/users/confirmemail' component={ConfirmEmailRecipient} />
            <Route path='/sponsors/confirmemail' component={ConfirmEmailSponsor} />
            <PrivateRoute exact path='/hackathon/:id' component={Hackathon} />
            <PrivateRoute exact path='/company/:id' component={Company} />
            <PrivateRoute exact path='/settings' component={Settings} />
            <PrivateRoute exact path='/changepassword' component={ChangePassword} />
            <PrivateRoute exact path='/posts' component={Posts} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
