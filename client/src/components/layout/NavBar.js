import React, { Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import styling
import './styling/NavBar.css';

const NavBar = ({isAuthenticated, isSponsor, auth}) => {

  useEffect(() =>{
    isSmallScreen();
  }, [isSmallScreen])

  const authRecLinks = (
    <ul className = 'link-list'>
      <li className = 'nav-item active'>
        <Link to="/dashboard" className = 'nav-link'>Dashboard</Link>
      </li>
      <li className = 'nav-item active mx-4 text-center'>
        <Link to="/discover" className = 'nav-link'>Discover Sponsors</Link>
      </li>
      <li className = 'nav-item active mx-4 text-center'>
        <Link to="/posts" className = 'nav-link'>Posts</Link>
      </li>
      <li className = 'nav-item active mx-4 text-center'>
        <Link to="/chat" className = 'nav-link'>Chat</Link>
      </li>
    </ul>
  );
  const authSponsLinks = (
    <ul className = 'link-list'>
      <li className = 'nav-item active'>
        <Link to="/dashboard" className = 'nav-link'>Dashboard</Link>
      </li>
      <li className = 'nav-item active'>
        <Link to="/discover" className = 'nav-link'>Discover Hackathons</Link>
      </li>
      <li className = 'nav-item active'>
        <Link to="/posts" className = 'nav-link'>Posts</Link>
      </li>
      <li className = 'nav-item active'>
        <Link to="/chat" className = 'nav-link'>Chat</Link>
      </li>
    </ul>
  );

  const unauthLinks = (
    <ul className = 'link-list'>
      <li className = 'nav-item active'>
        <Link to="/login" className = 'nav-link'>Login</Link>
      </li>
      <li className = 'nav-item active'>
        <Link to="/register" className = 'nav-link'>Register</Link>
      </li>
    </ul>

  )

  //changes the screen size when it changes size so we can tell when its small *dab*
  const [smallScreen, updateSmallScreen] = useState(false);
  function isSmallScreen(){
    let x = window.innerWidth;
    if(x < 760){
      updateSmallScreen(true);
    }
    else{
      updateSmallScreen(false);
    }
  }

  window.addEventListener('resize', e => isSmallScreen());


  const [dropDown, updateDropdown] = useState(false);

  function toggleDropDown(){
    updateDropdown(!dropDown);
  }
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <div className ="navContainer">
        {/*
        <button className="navbar-toggler" style = {{ borderColor : "#87ffa7", padding : "0", width : "44" , height : "50"}} type='button' data-toggle='collapse' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'><svg className="bi bi-chevron-compact-down" style = {{width : '44', height : '50'}} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clipRule="evenodd"/>
        </svg></button>*/}

        {!smallScreen ? 
        <Fragment>
          <Link to = "/" className="navbar-brand">
          <img className = 'mx-2 align-middle'src="https://i.imgur.com/LVIZD64.jpg?1" alt="Logo" style = {{"width" : "46px", "height" : "43px", "opacity" : "100%"}}/>
            <h3 className = 'display-5 display-inline align-middle' style = {{"display" : "inline"}}>Axotl</h3>
          </Link>

          {!auth.loading && auth.user && <h3 className = "display-5 display-inline align-middle">Welcome, {auth.user.user.name.split(' ')[0]}</h3> }

          

          <div className="auth-links" id = 'navbarContent'>
              {!isAuthenticated ? <Fragment><div>{unauthLinks}</div></Fragment> : (auth.user.user.sponsor ?<Fragment><div>{authSponsLinks}</div></Fragment> : authRecLinks)}
          </div>

          {!auth.loading && auth.user && <Link to="/logout" className = "btn btn-danger">Logout</Link>}
        </Fragment> :
        <Fragment>
            <button onClick = {e => toggleDropDown()} className="navbar-toggler" style = {{ borderColor : "#87ffa7", padding : "0", width : "44" , height : "50"}} type='button' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'><svg className="bi bi-chevron-compact-down" style = {{width : '44', height : '50'}} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clipRule="evenodd"/>
            </svg></button>

            <Link to = "/" className="navbar-brand">
            <img className = 'mx-2 align-middle'src="https://i.imgur.com/LVIZD64.jpg?1" alt="Logo" style = {{"width" : "46px", "height" : "43px", "opacity" : "100%"}}/>
            <h3 className = 'display-5 display-inline align-middle' style = {{"display" : "inline"}}>Axotl</h3>
            </Link>
  
            {!auth.loading && auth.user && <Link to="/logout" className = "btn btn-danger">Logout</Link>}
        </Fragment>}
      </div>
      {dropDown && 
      <Fragment>
        <div className = "dropdown-background">
          <div className = "dropdown">
            <div className="auth-links" id = 'dropdownContent'>
                {!isAuthenticated ? <Fragment><div>{unauthLinks}</div></Fragment> : (auth.user.user.sponsor ?<Fragment><div>{authSponsLinks}</div></Fragment> : authRecLinks)}
            </div>
          </div>
        </div>
        </Fragment>} 
       
    </Fragment>
  );
};

NavBar.propTypes = {
  isAuthenticated : PropTypes.bool,
  isSponsor : PropTypes.object,
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    isSponsor : state.auth,
    auth: state.auth
})

export default connect(mapStateToProps, {})(NavBar);
