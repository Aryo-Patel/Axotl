import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NavBar = ({isAuthenticated, isSponsor, auth}) => {
  //@TODO add useeffect to load username to navbar
  const authRecLinks = (
    <ul className = 'navbar-nav'>
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
    <ul className = 'navbar-nav justify-content-center float-right'>
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
        <Link to = "/" className="navbar-brand">
        <img className = 'mx-2 align-middle'src="https://i.imgur.com/LVIZD64.jpg?1" alt="Logo" style = {{"width" : "46px", "height" : "43px", "opacity" : "100%"}}/>
          <h3 className = 'display-5 display-inline align-middle' style = {{"display" : "inline"}}>Axotl</h3>
        </Link>
        {!auth.loading && auth.user && <h3 className = "display-5 display-inline align-middle">Welcome, {auth.user.user.name}</h3> }
        <button className="navbar-toggler" style = {{borderColor : "#87ffa7", padding : "0", width : "44" , height : "50"}} type='button' data-toggle='collapse' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'><svg className="bi bi-chevron-compact-down" style = {{width : '44', height : '50'}} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clipRule="evenodd"/>
</svg></button>
        {!auth.loading && auth.user && <Link to="/logout" className = "btn btn-danger">Logout</Link>}
        <div className="collapse navbar-collapse justify-content-center" id = 'navbarContent'>

            {!isAuthenticated ? (unauthLinks) : (isSponsor ? authSponsLinks : authRecLinks)}
        </div>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  isAuthenticated : PropTypes.bool,
  isSponsor : PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    isSponsor : state.auth.sponsor,
    auth: state.auth
})

export default connect(mapStateToProps, {})(NavBar);
