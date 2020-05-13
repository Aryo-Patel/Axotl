import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateHackathonModal from "../hackathons/CreateHackathonModal";

//import styling
import "./styling/NavBar.css";

const NavBar = ({ isAuthenticated, auth }) => {
  useEffect(() => {
    isSmallScreen();
  }, [isSmallScreen]);
  const [modalDisplay, setModalDisplay] = useState(false);

  const closeModal = (e) => {
    if (
      e.target.classList.contains("hackModalToggler") ||
      e.target.classList.contains("hack-modal")
    ) {
      setModalDisplay(!modalDisplay);
    }
  };

  const authRecLinks = (
    <ul className="link-list">
      <li className="nav-item active">
        <Link to="/dashboard" className="nav-link nav__btn">
          Dashboard
        </Link>
      </li>
      <li className="nav-item active mx-4 text-center">
        <Link to="/discover" className="nav-link nav__btn">
          Discover
        </Link>
      </li>
      <li className="nav-item active mx-4 text-center">
        <label
          onClick={(e) => closeModal(e)}
          className="nav-link nav__btn hackModalToggler"
          for="navToggle"
        >
          Create
        </label>
      </li>
      <li className="nav-item active mx-4 text-center">
        <Link to="/posts" className="nav-link nav__btn">
          Posts
        </Link>
      </li>
      <li className="nav-item active mx-4 text-center">
        <Link to="/chat" className="nav-link nav__btn">
          Chat
        </Link>
      </li>
    </ul>
  );
  const authSponsLinks = (
    <ul className="link-list">
      <li className="nav-item active">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/discover" className="nav-link">
          Discover
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/posts" className="nav-link">
          Posts
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/chat" className="nav-link">
          Chat
        </Link>
      </li>
    </ul>
  );

  const unauthLinks = (
    <ul className="link-list">
      <li className="nav-item active">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item active">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  );

  //changes the screen size when it changes size so we can tell when its small *dab*
  const [smallScreen, updateSmallScreen] = useState(false);
  function isSmallScreen() {
    let x = window.innerWidth;
    if (x < 760) {
      updateSmallScreen(true);
    } else {
      updateSmallScreen(false);
    }
  }

  window.addEventListener("resize", (e) => isSmallScreen());

  const [dropDown, updateDropdown] = useState(false);

  function toggleDropDown() {
    updateDropdown(!dropDown);
  }
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <input type="checkbox" class="navCheckbox" id="navToggle" />
      <CreateHackathonModal
        show={modalDisplay}
        handleClose={(e) => closeModal(e)}
      />
      <div className="navContainer">
        {/*
        <button className="navbar-toggler" style = {{ borderColor : "#87ffa7", padding : "0", width : "44" , height : "50"}} type='button' data-toggle='collapse' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'><svg className="bi bi-chevron-compact-down" style = {{width : '44', height : '50'}} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clipRule="evenodd"/>
        </svg></button>*/}

        {!smallScreen ? (
          <Fragment>
            <Link to="/" className="navbar-brand">
              <img
                className="mx-2 align-middle"
                src="https://i.imgur.com/LVIZD64.jpg?1"
                alt="Logo"
                style={{ width: "46px", height: "43px", opacity: "100%" }}
              />
              <h3
                className="display-5 display-inline align-middle"
                style={{ display: "inline" }}
              >
                Axotl
              </h3>
            </Link>

            <div className="auth-links" id="navbarContent">
              {!isAuthenticated ? (
                <Fragment>
                  <div>{unauthLinks}</div>
                </Fragment>
              ) : auth.user.user.sponsor ? (
                <Fragment>
                  <div>{authSponsLinks}</div>
                </Fragment>
              ) : (
                authRecLinks
              )}
            </div>
            {!auth.loading && auth.user && (
              <Link to="/profile" className="dropdown__toggle">
                <div className="dropdown">
                  <Link to="/profile" className="dropdown__item">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="dropdown__item">
                    Settings
                  </Link>
                  {!auth.loading && auth.user && (
                    <Link to="/logout" className="dropdown__item">
                      Logout
                    </Link>
                  )}
                </div>
                <div className="dropdown__top">
                <img
                  src={auth.user.user.avatar}
                  alt=""
                  className="dropdown__img"
                />
                <h3 className="display-5 display-inline align-middle dropdown__name">
                  {auth.user.user.name.split(" ")[0]}
                </h3>
                <svg className="dropdown__icon" viewBox="0 0 20 20">
                  <path d="M17.418 6.109c0.272-0.268 0.709-0.268 0.979 0s0.271 0.701 0 0.969l-7.908 7.83c-0.27 0.268-0.707 0.268-0.979 0l-7.908-7.83c-0.27-0.268-0.27-0.701 0-0.969s0.709-0.268 0.979 0l7.419 7.141 7.418-7.141z"></path>
                </svg>
                </div>
              </Link>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <button
              onClick={(e) => toggleDropDown()}
              className="navbar-toggler"
              style={{
                borderColor: "#87ffa7",
                padding: "0",
                width: "44",
                height: "50",
              }}
              type="button"
              data-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                className="bi bi-chevron-compact-down"
                style={{ width: "44", height: "50" }}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <Link to="/" className="navbar-brand">
              <img
                className="mx-2 align-middle"
                src="https://i.imgur.com/LVIZD64.jpg?1"
                alt="Logo"
                style={{ width: "46px", height: "43px", opacity: "100%" }}
              />
              <h3
                className="display-5 display-inline align-middle"
                style={{ display: "inline" }}
              >
                Axotl
              </h3>
            </Link>

            {!auth.loading && auth.user && (
              <Link to="/logout" className="btn btn-danger">
                Logout
              </Link>
            )}
          </Fragment>
        )}
      </div>
      {dropDown && (
        <Fragment>
          <div className="dropdown-background">
            <div className="dropdown">
              <div className="auth-links" id="dropdownContent">
                {!isAuthenticated ? (
                  <Fragment>
                    <div>{unauthLinks}</div>
                  </Fragment>
                ) : auth.user.user.sponsor ? (
                  <Fragment>
                    <div>{authSponsLinks}</div>
                  </Fragment>
                ) : (
                  authRecLinks
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NavBar);
