//React and ReactRouter imports
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

//Redux Imports
import {Provider} from 'react-redux'
import store from "./store"

//Component Imports
import NavBar from './components/layout/NavBar'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Fragment>
          <NavBar />
          <h1>Hello</h1>
          <Switch>
            
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
