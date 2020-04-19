import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NavBar = (props) => {
  //@TODO add useeffect to load username to navbar
  const authRecLinks = (
    <ul className = 'navbar-nav'>
      <li className = 'nav-item active mx-4 text-center'>
        <Link to="/recipientProfiles" className = 'nav-link'>Sponsors</Link>
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
    <ul className = 'navbar-nav justify-content-center float-right'>
      <li className = 'nav-item active'>
        <Link to="/recipientProfiles" className = 'nav-link'>Hackathons</Link>
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
    <ul className = 'navbar-nav justify-content-center float-right'>
      
      <li className = 'nav-item active'>
        <Link to="/login" className = 'nav-link'>Login</Link>
      </li>
      <li className = 'nav-item active'>
        <Link to="/register" className = 'nav-link'>Register</Link>
      </li>
    </ul>

  )
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <nav
        className="navbar navbar-light navbar-expand-lg"
        style={{ backgroundColor: "#87ffa7", opacity: "75%" }}
      >
        <a href="#" className="navbar-brand">
        <img className = 'mx-2 align-middle'src="https://i.imgur.com/LVIZD64.jpg?1" alt="Logo Image" style = {{"width" : "46px", "height" : "43px", "opacity" : "100%"}}/>
          <h3 className = 'display-5 display-inline align-middle' style = {{"display" : "inline"}}>Axotl</h3>
        </a>
        <button className="navbar-toggler" type='button' data-toggle='collapse' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'></button>

        <div className="collapse navbar-collapse justify-content-center" id = 'navbarContent'>

            
            {authRecLinks}
        </div>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {};

export default connect(null, {})(NavBar);
