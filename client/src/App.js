//React and ReactRouter imports
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//Redux Imports
import {Provider} from 'react-redux'
import store from "./store"

//Component Imports
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path = '/' component = {Landing} />
            <Route exact path = '/login' component = {Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
