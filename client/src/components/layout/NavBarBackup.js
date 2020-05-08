import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import styling
import './styling/style.css';

const NavBar = ({isAuthenticated, isSponsor, auth}) => {
  const authRecLinks = (
    <ul className = 'nav nav-links justify-content-center'>
      <li className = 'nav-link'>
        <Link to="/dashboard" className = 'nav-link'>Dashboard</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/discover" className = 'nav-link'>Discover Sponsors</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/posts" className = 'nav-link'>Posts</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/chat" className = 'nav-link'>Chat</Link>
      </li>
    </ul>
  );
  const authSponsLinks = (
    <ul className = 'nav nav-links justify-content-center'>
      <li className = 'nav-link'>
        <Link to="/dashboard" className = 'nav-link'>Dashboard</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/discover" className = 'nav-link'>Discover Hackathons</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/posts" className = 'nav-link'>Posts</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/chat" className = 'nav-link'>Chat</Link>
      </li>
    </ul>
  );

  const unauthLinks = (
    <ul className = 'nav nav-links justify-content-center'>
      <li className = 'nav-link'>
        <Link to="/login" className = 'nav-link'>Login</Link>
      </li>
      <li className = 'nav-link'>
        <Link to="/register" className = 'nav-link'>Register</Link>
      </li>
    </ul>

  )
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <div className ="navbar-c">

        <Link to = "/" className="navbar-brand">
        <img className = 'mx-2 align-middle'src="https://i.imgur.com/LVIZD64.jpg?1" alt="Logo" style = {{"width" : "46px", "height" : "43px", "opacity" : "100%"}}/>
          <h3 className = 'nav-head-c'>Axotl</h3>
        </Link>

        {!auth.loading && auth.user && <h3 className = "display-5 display-inline align-middle">Welcome, {auth.user.user.name}</h3> }
        {!auth.loading && auth.user && <Link to="/logout" className = "btn btn-danger">Logout</Link>}

        <Link to="/logout" className = "btn btn-danger logout-link" style = {{display: "inline-block"}}>Logout</Link>
        
        <div >
            {!isAuthenticated ? (unauthLinks) : (auth.user.user.sponsor ? authSponsLinks : authRecLinks)}
        </div>

        
      </div> 
    </Fragment>
  );
};

NavBar.propTypes = {
  isAuthenticated : PropTypes.bool,
  isSponsor : PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    isSponsor : state.auth,
    auth: state.auth
})

export default connect(mapStateToProps, {})(NavBar);