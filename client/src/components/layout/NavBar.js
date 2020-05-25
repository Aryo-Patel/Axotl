import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CreateHackathonModal from "../hackathons/CreateHackathonModal";
import $ from "jquery";

//import styling
import "./styling/NavBar.css";

const NavBar = ({ isAuthenticated, auth }) => {
  useEffect(() => {
    isSmallScreen();
  }, [isSmallScreen]);
  const [modalDisplay, setModalDisplay] = useState(false);
  //checking to make sure the correct thing was clicked on, and if so closing the modal
  const closeModal = () => {
    setModalDisplay(!modalDisplay);
  };

  //adding the scrolled class to the navcontainer if the document scroll is larger than the navbar
  $(() => {
    $(document).scroll(() => {
      let $nav = $(".navContainer");
      if ($(document).scrollTop() > $nav.innerHeight()) {
        $nav.addClass("scrolled");
        $('#dropdownContent').addClass("scrolledAuthLinks");
      } else {
        try {
          $nav.removeClass("scrolled");
          $('#dropdownContent').removeClass("scrolledAuthLinks");
        } catch (err) {
          console.log(err);
        }
      }
    });
  });

  const authRecLinks = (
    <ul className="link-list">
      <li className="nav-item active">
        <Link to="/dashboard" className="nav-link nav__btn">
          Dashboard
        </Link>
      </li>
      <li className="nav-item active mx-4 text-center">
        <Link to="/my-hackathons" className="nav-link nav__btn">
          My Hackathons
        </Link>
      </li>
      <li className="nav-item active mx-4 text-center">
        <label
          onClick={(e) => closeModal()}
          className="nav-link nav__btn hackModalToggler"
          htmlFor="navToggle"
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

  //changes the screen size when it changes size so we can tell when its small
  const [smallScreen, updateSmallScreen] = useState(false);
  function isSmallScreen() {
    let x = window.innerWidth;
    if (x < 900) {
      updateSmallScreen(true);
    } else {
      updateSmallScreen(false);
    }
  }

  window.addEventListener("resize", (e) => isSmallScreen());

  //
  const [dropDown, updateDropdown] = useState(false);

  function toggleDropDown() {
    updateDropdown(!dropDown);
  }
  function onClick(e) {
    return <Redirect to="/profile"></Redirect>;
  }
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <input type="checkbox" className="navCheckbox" id="navToggle" />
      <CreateHackathonModal
        show={modalDisplay}
        handleClose={() => closeModal()}
      />
      <div className="navContainer">
        {/*
        <button className="navbar-toggler" style = {{ borderColor : "#87ffa7", padding : "0", width : "44" , height : "50"}} type='button' data-toggle='collapse' data-target = "#navbarContent" aria-controls="navbarContent" aria-expanded='false' aria-label='Toggle navigation'><svg className="bi bi-chevron-compact-down" style = {{width : '44', height : '50'}} width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clipRule="evenodd"/>
        </svg></button>*/}

        {!smallScreen ? (
          <Fragment>
            <Link to="/" className="navbar-brand">
              <div className="logoContainer">
                <svg className='navbar__icon'
                  //  xmlns:dc="http://purl.org/dc/elements/1.1/"
                  //  xmlns:cc="http://creativecommons.org/ns#"
                  //  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns="http://www.w3.org/2000/svg"
                  //  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                  //  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                  width="170mm"
                  height="170mm"
                  viewBox="0 0 170 170"
                  version="1.1"
                  id="svg8"
                //  inkscape:version="1.0rc1 (09960d6, 2020-04-09)"
                //  sodipodi:docname="logo.svg"
                >
                  <defs id="defs2">
                    <mask id="mask961" maskUnits="userSpaceOnUse">
                      <g id="g967" transform="translate(-53.902856,-33.412798)">
                        <path
                          id="path963"
                          style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583, display: 'inline' }}
                          d="m 234.02948,163.63163 c 0,25.89075 -58.66088,17.54367 -60,0 -0.76773,-10.05784 -4.61906,-18.40301 -5.95193,-20.81155 -6.91042,-12.48724 -22.08614,-18.65957 -34.04807,-19.18844 -13.31441,-0.58868 -23.37477,5.91531 -29.95097,12.99603 -10.644946,11.46163 -10.04903,27.00396 -10.04903,27.00396 0,0 -1.027732,-31.54273 24.02764,-52.28542 18.89102,-15.639381 33.62472,-17.714576 45.97236,-17.714575 38.65993,2e-6 70,31.340055 70,69.999995"
                        //  inkscape:connector-curvature="0"
                        //  sodipodi:nodetypes="csssscssc"
                        />
                        <circle
                          style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583, display: 'inline' }}
                          id="circle965"
                          cx="204.02948"
                          cy="163.63164"
                          r="30.000002"
                        />
                      </g>
                    </mask>
                  </defs>
                  <namedview
                    fit-margin-bottom="0"
                    fit-margin-right="0"
                    fit-margin-left="2"
                    fit-margin-top="0"
                    snap-nodes="false"
                    object-nodes="false"
                    id="base"
                    pagecolor="#ffffff"
                    bordercolor="#666666"
                    borderopacity="1.0"
                    pageopacity="0.0"
                    pageshadow="2"
                    zoom="0.41402975"
                    cx="332.06887"
                    cy="339.31681"
                    document-units="mm"
                    current-layer="g999"
                    document-rotation="0"
                    showgrid="false"
                    snap-midpoints="false"
                    snap-smooth-nodes="false"
                    window-width="1070"
                    window-height="552"
                    window-x="202"
                    window-y="23"
                    window-maximized="0"
                  />
                  {/* <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata> */}
                  <g
                    transform="translate(-40,-60)"
                    //  inkscape:label="Layer 1"
                    //  inkscape:groupmode="layer"
                    id="layer1"
                    //  sodipodi:insensitive="true"
                    style={{ display: 'none' }}
                  >
                    <circle
                      style={{ fill: '#00ffff', strokeWidth: 0.264583, fillRule: 'evenodd' }}
                      id="path10"
                      cx="110.00604"
                      cy="130"
                      r="70"
                    />
                    <circle
                      cy="130"
                      cx="80.006042"
                      id="path28-1"
                      style={{ fill: '#00ffff', strokeWidth: 0.264583, opacity: 0.5 }}
                      r="40"
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    //  inkscape:groupmode="layer"
                    id="layer2"
                    //  inkscape:label="Layer 2"
                    style={{ display: 'none' }}
                  >
                    <path
                      //  sodipodi:nodetypes="csssscssc"
                      //  inkscape:connector-curvature="0"
                      d="m 180.00604,130 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 C 107.14369,96.7012 91.967974,90.52888 80.006043,90 66.691628,89.41132 56.631274,95.91531 50.055075,102.99604 39.410126,114.45766 40.006042,130 40.006042,130 c 0,0 -1.027732,-31.54273 24.027638,-52.28542 C 82.924702,62.075194 97.658404,59.999999 110.00604,60 c 38.65993,2e-6 70,31.34006 70,70"
                      style={{ fill: '#00ffff', strokeWidth: 0.264583, fillRule: 'evenodd' }}
                      id="path10-1"
                    />
                    <circle
                      r="30.000002"
                      cy="130"
                      cx="150.00604"
                      id="path28"
                      style={{ fill: '#00ffff', strokeWidth: 0.264583 }}
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    style={{ display: 'inline' }}
                    //  inkscape:groupmode="layer"
                    id="layer4"
                  //  inkscape:label="body"
                  >
                    <path
                      //  sodipodi:nodetypes="csssscssc"
                      //  inkscape:connector-curvature="0"
                      d="m 181.92317,158.11795 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 -6.91042,-12.48725 -22.086133,-18.65957 -34.048064,-19.18845 -13.314415,-0.58868 -23.374769,5.91531 -29.950968,12.99604 -10.644949,11.46162 -10.049033,27.00396 -10.049033,27.00396 0,0 -1.027732,-31.54273 24.027638,-52.28542 18.891022,-15.639389 33.624724,-17.714584 45.972357,-17.714583 38.65993,2e-6 70,31.340063 70,70.000003"
                      style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                      id="path10-1-1"
                    />
                    <circle
                      r="30.000002"
                      cy="158.11795"
                      cx="151.92317"
                      id="path28-0"
                      style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    //  inkscape:label="fins"
                    id="layer5"
                  //  inkscape:groupmode="layer"
                  >
                    <path
                      //  sodipodi:nodetypes="sscss"
                      //  inkscape:connector-curvature="0"
                      d="m 120.14901,166.27421 c 0,4.29369 -4.09686,7.77441 -9.15059,7.77441 -5.05374,0 -11.543026,-3.34522 -15.84941,-7.77441 5.42285,-4.29368 10.79567,-7.77441 15.84941,-7.77441 5.05373,0 9.15059,3.48073 9.15059,7.77441 z"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.241556 }}
                      id="path865"
                    />
                    <path
                      id="path865-1"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                      d="m 118.27251,153.57778 c -1.14609,2.95177 -4.46807,4.41557 -7.41984,3.26948 -2.95177,-1.14609 -5.8491,-4.91747 -7.18211,-8.939 4.31346,-1.72198 8.3807,-2.89641 11.33247,-1.75032 2.95177,1.14609 4.41557,4.46806 3.26948,7.41984 z"
                    //  inkscape:connector-curvature="0"
                    //  sodipodi:nodetypes="sscss"
                    />
                    <path
                      //  sodipodi:nodetypes="sscss"
                      //  inkscape:connector-curvature="0"
                      d="m 124.93054,176.71889 c 1.78679,2.61416 1.11608,6.18184 -1.49808,7.96864 -2.61416,1.78679 -7.36301,2.04444 -11.43377,0.87034 1.0183,-4.53147 2.34905,-8.55028 4.96321,-10.33707 2.61416,-1.78679 6.18184,-1.11608 7.96864,1.49809 z"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                      id="path865-1-7"
                    />
                    <path
                      id="path904"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.241556 }}
                      d="m 184.50802,159.75478 c 0.0117,-4.07483 4.11724,-7.37075 9.17096,-7.36167 5.05374,0.009 11.53424,3.19543 15.82902,7.40658 -5.43412,4.06507 -10.81605,7.35871 -15.86978,7.34964 -5.05372,-0.009 -9.14146,-3.31974 -9.1302,-7.39455 z"
                    //  inkscape:connector-curvature="0"
                    //  sodipodi:nodetypes="sscss"
                    />
                    <path
                      //  sodipodi:nodetypes="sscss"
                      //  inkscape:connector-curvature="0"
                      d="m 181.67695,171.20535 c 1.51031,-2.78306 4.99078,-3.81485 7.77384,-2.30453 2.78307,1.51031 5.18,5.61793 5.99354,9.77578 -4.49665,1.16245 -8.6798,1.8129 -11.46285,0.3026 -2.78306,-1.51031 -3.81484,-4.99078 -2.30453,-7.77385 z"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                      id="path906"
                    />
                    <path
                      id="path908"
                      style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                      d="m 183.7557,148.43083 c -1.6707,-2.68984 -0.84453,-6.22476 1.8453,-7.89547 2.68985,-1.6707 7.44542,-1.72031 11.4609,-0.36923 -1.21559,4.48258 -2.7209,8.43931 -5.41074,10.11001 -2.68984,1.6707 -6.22476,0.84453 -7.89546,-1.84531 z"
                    //  inkscape:connector-curvature="0"
                    //  sodipodi:nodetypes="sscss"
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    style={{ display: 'none' }}
                    //  inkscape:label="color"
                    id="layer6"
                  //  inkscape:groupmode="layer"
                  >
                    <g
                      style={{ display: 'inline' }}
                      //  inkscape:label="color copy copy"
                      id="g979"
                    //  inkscape:groupmode="layer"
                    >
                      <ellipse
                        transform="translate(1.9171328,28.117947)"
                        mask="url(#mask961)"
                        ry="53.976032"
                        rx="57.300121"
                        cy="131.17813"
                        cx="97.536789"
                        id="ellipse977"
                        style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.561727 }}
                      />
                    </g>
                    <g
                      style={{ display: 'inline' }}
                      //  inkscape:groupmode="layer"
                      id="g983"
                    //  inkscape:label="color copy copy copy"
                    >
                      <ellipse
                        transform="translate(1.9171328,28.117947)"
                        style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                        id="ellipse981"
                        cx="97.536789"
                        cy="131.17813"
                        rx="57.300121"
                        ry="53.976032"
                        mask="url(#mask961)"
                      />
                    </g>
                    <g
                      style={{ display: 'inline' }}
                      //  inkscape:groupmode="layer"
                      id="g975"
                    //  inkscape:label="color copy"
                    >
                      <ellipse
                        transform="translate(1.9171328,28.117947)"
                        style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                        id="ellipse973"
                        cx="97.536789"
                        cy="131.17813"
                        rx="57.300121"
                        ry="53.976032"
                        mask="url(#mask961)"
                      />
                    </g>
                    <ellipse
                      transform="translate(1.9171328,28.117947)"
                      mask="url(#mask961)"
                      ry="53.976032"
                      rx="57.300121"
                      cy="131.17813"
                      cx="97.536789"
                      id="path933"
                      style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    //  inkscape:groupmode="layer"
                    id="g999"
                    //  inkscape:label="yello"
                    style={{ display: 'inline' }}
                  >
                    <ellipse
                      transform="translate(1.9171328,28.117947)"
                      style={{ opacity: 1, fill: '#ffff00', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                      id="ellipse997"
                      cx="97.536789"
                      cy="131.17813"
                      rx="57.300121"
                      ry="53.976032"
                      mask="url(#mask961)"
                    />
                  </g>
                  <g
                    transform="translate(-40,-60)"
                    style={{ display: 'inline' }}
                    //  inkscape:label="eyes"
                    id="layer3"
                  //  inkscape:groupmode="layer"
                  >
                    <circle
                      r="5"
                      cy="160.11795"
                      cx="136.91713"
                      id="path847"
                      style={{ opacity: 1, fill: "#000000", fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                    />
                    <circle
                      style={{ opacity: 1, fill: "#000000", fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                      id="path847-3"
                      cx="168.91713"
                      cy="160.11795"
                      r="5"
                    />
                  </g>
                </svg>
              </div>
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
              <div onClick={(e) => onClick(e)} className="dropdown__toggle">
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
              </div>
            )}
          </Fragment>
        ) : (
            <Fragment>
              <button
                onClick={(e) => toggleDropDown()}
                className="navbar-toggler"
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
                <div className="logoContainer">
                  <svg className='navbar__icon'
                    //  xmlns:dc="http://purl.org/dc/elements/1.1/"
                    //  xmlns:cc="http://creativecommons.org/ns#"
                    //  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    //  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    //  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    width="170mm"
                    height="170mm"
                    viewBox="0 0 170 170"
                    version="1.1"
                    id="svg8"
                  //  inkscape:version="1.0rc1 (09960d6, 2020-04-09)"
                  //  sodipodi:docname="logo.svg"
                  >
                    <defs id="defs2">
                      <mask id="mask961" maskUnits="userSpaceOnUse">
                        <g id="g967" transform="translate(-53.902856,-33.412798)">
                          <path
                            id="path963"
                            style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583, display: 'inline' }}
                            d="m 234.02948,163.63163 c 0,25.89075 -58.66088,17.54367 -60,0 -0.76773,-10.05784 -4.61906,-18.40301 -5.95193,-20.81155 -6.91042,-12.48724 -22.08614,-18.65957 -34.04807,-19.18844 -13.31441,-0.58868 -23.37477,5.91531 -29.95097,12.99603 -10.644946,11.46163 -10.04903,27.00396 -10.04903,27.00396 0,0 -1.027732,-31.54273 24.02764,-52.28542 18.89102,-15.639381 33.62472,-17.714576 45.97236,-17.714575 38.65993,2e-6 70,31.340055 70,69.999995"
                          //  inkscape:connector-curvature="0"
                          //  sodipodi:nodetypes="csssscssc"
                          />
                          <circle
                            style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583, display: 'inline' }}
                            id="circle965"
                            cx="204.02948"
                            cy="163.63164"
                            r="30.000002"
                          />
                        </g>
                      </mask>
                    </defs>
                    <namedview
                      fit-margin-bottom="0"
                      fit-margin-right="0"
                      fit-margin-left="2"
                      fit-margin-top="0"
                      snap-nodes="false"
                      object-nodes="false"
                      id="base"
                      pagecolor="#ffffff"
                      bordercolor="#666666"
                      borderopacity="1.0"
                      pageopacity="0.0"
                      pageshadow="2"
                      zoom="0.41402975"
                      cx="332.06887"
                      cy="339.31681"
                      document-units="mm"
                      current-layer="g999"
                      document-rotation="0"
                      showgrid="false"
                      snap-midpoints="false"
                      snap-smooth-nodes="false"
                      window-width="1070"
                      window-height="552"
                      window-x="202"
                      window-y="23"
                      window-maximized="0"
                    />
                    {/* <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata> */}
                    <g
                      transform="translate(-40,-60)"
                      //  inkscape:label="Layer 1"
                      //  inkscape:groupmode="layer"
                      id="layer1"
                      //  sodipodi:insensitive="true"
                      style={{ display: 'none' }}
                    >
                      <circle
                        style={{ fill: '#00ffff', strokeWidth: 0.264583, fillRule: 'evenodd' }}
                        id="path10"
                        cx="110.00604"
                        cy="130"
                        r="70"
                      />
                      <circle
                        cy="130"
                        cx="80.006042"
                        id="path28-1"
                        style={{ fill: '#00ffff', strokeWidth: 0.264583, opacity: 0.5 }}
                        r="40"
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      //  inkscape:groupmode="layer"
                      id="layer2"
                      //  inkscape:label="Layer 2"
                      style={{ display: 'none' }}
                    >
                      <path
                        //  sodipodi:nodetypes="csssscssc"
                        //  inkscape:connector-curvature="0"
                        d="m 180.00604,130 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 C 107.14369,96.7012 91.967974,90.52888 80.006043,90 66.691628,89.41132 56.631274,95.91531 50.055075,102.99604 39.410126,114.45766 40.006042,130 40.006042,130 c 0,0 -1.027732,-31.54273 24.027638,-52.28542 C 82.924702,62.075194 97.658404,59.999999 110.00604,60 c 38.65993,2e-6 70,31.34006 70,70"
                        style={{ fill: '#00ffff', strokeWidth: 0.264583, fillRule: 'evenodd' }}
                        id="path10-1"
                      />
                      <circle
                        r="30.000002"
                        cy="130"
                        cx="150.00604"
                        id="path28"
                        style={{ fill: '#00ffff', strokeWidth: 0.264583 }}
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      style={{ display: 'inline' }}
                      //  inkscape:groupmode="layer"
                      id="layer4"
                    //  inkscape:label="body"
                    >
                      <path
                        //  sodipodi:nodetypes="csssscssc"
                        //  inkscape:connector-curvature="0"
                        d="m 181.92317,158.11795 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 -6.91042,-12.48725 -22.086133,-18.65957 -34.048064,-19.18845 -13.314415,-0.58868 -23.374769,5.91531 -29.950968,12.99604 -10.644949,11.46162 -10.049033,27.00396 -10.049033,27.00396 0,0 -1.027732,-31.54273 24.027638,-52.28542 18.891022,-15.639389 33.624724,-17.714584 45.972357,-17.714583 38.65993,2e-6 70,31.340063 70,70.000003"
                        style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                        id="path10-1-1"
                      />
                      <circle
                        r="30.000002"
                        cy="158.11795"
                        cx="151.92317"
                        id="path28-0"
                        style={{ fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      //  inkscape:label="fins"
                      id="layer5"
                    //  inkscape:groupmode="layer"
                    >
                      <path
                        //  sodipodi:nodetypes="sscss"
                        //  inkscape:connector-curvature="0"
                        d="m 120.14901,166.27421 c 0,4.29369 -4.09686,7.77441 -9.15059,7.77441 -5.05374,0 -11.543026,-3.34522 -15.84941,-7.77441 5.42285,-4.29368 10.79567,-7.77441 15.84941,-7.77441 5.05373,0 9.15059,3.48073 9.15059,7.77441 z"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.241556 }}
                        id="path865"
                      />
                      <path
                        id="path865-1"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                        d="m 118.27251,153.57778 c -1.14609,2.95177 -4.46807,4.41557 -7.41984,3.26948 -2.95177,-1.14609 -5.8491,-4.91747 -7.18211,-8.939 4.31346,-1.72198 8.3807,-2.89641 11.33247,-1.75032 2.95177,1.14609 4.41557,4.46806 3.26948,7.41984 z"
                      //  inkscape:connector-curvature="0"
                      //  sodipodi:nodetypes="sscss"
                      />
                      <path
                        //  sodipodi:nodetypes="sscss"
                        //  inkscape:connector-curvature="0"
                        d="m 124.93054,176.71889 c 1.78679,2.61416 1.11608,6.18184 -1.49808,7.96864 -2.61416,1.78679 -7.36301,2.04444 -11.43377,0.87034 1.0183,-4.53147 2.34905,-8.55028 4.96321,-10.33707 2.61416,-1.78679 6.18184,-1.11608 7.96864,1.49809 z"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                        id="path865-1-7"
                      />
                      <path
                        id="path904"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.241556 }}
                        d="m 184.50802,159.75478 c 0.0117,-4.07483 4.11724,-7.37075 9.17096,-7.36167 5.05374,0.009 11.53424,3.19543 15.82902,7.40658 -5.43412,4.06507 -10.81605,7.35871 -15.86978,7.34964 -5.05372,-0.009 -9.14146,-3.31974 -9.1302,-7.39455 z"
                      //  inkscape:connector-curvature="0"
                      //  sodipodi:nodetypes="sscss"
                      />
                      <path
                        //  sodipodi:nodetypes="sscss"
                        //  inkscape:connector-curvature="0"
                        d="m 181.67695,171.20535 c 1.51031,-2.78306 4.99078,-3.81485 7.77384,-2.30453 2.78307,1.51031 5.18,5.61793 5.99354,9.77578 -4.49665,1.16245 -8.6798,1.8129 -11.46285,0.3026 -2.78306,-1.51031 -3.81484,-4.99078 -2.30453,-7.77385 z"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                        id="path906"
                      />
                      <path
                        id="path908"
                        style={{ opacity: 1, fill: '#ff6647', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.168551 }}
                        d="m 183.7557,148.43083 c -1.6707,-2.68984 -0.84453,-6.22476 1.8453,-7.89547 2.68985,-1.6707 7.44542,-1.72031 11.4609,-0.36923 -1.21559,4.48258 -2.7209,8.43931 -5.41074,10.11001 -2.68984,1.6707 -6.22476,0.84453 -7.89546,-1.84531 z"
                      //  inkscape:connector-curvature="0"
                      //  sodipodi:nodetypes="sscss"
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      style={{ display: 'none' }}
                      //  inkscape:label="color"
                      id="layer6"
                    //  inkscape:groupmode="layer"
                    >
                      <g
                        style={{ display: 'inline' }}
                        //  inkscape:label="color copy copy"
                        id="g979"
                      //  inkscape:groupmode="layer"
                      >
                        <ellipse
                          transform="translate(1.9171328,28.117947)"
                          mask="url(#mask961)"
                          ry="53.976032"
                          rx="57.300121"
                          cy="131.17813"
                          cx="97.536789"
                          id="ellipse977"
                          style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.561727 }}
                        />
                      </g>
                      <g
                        style={{ display: 'inline' }}
                        //  inkscape:groupmode="layer"
                        id="g983"
                      //  inkscape:label="color copy copy copy"
                      >
                        <ellipse
                          transform="translate(1.9171328,28.117947)"
                          style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                          id="ellipse981"
                          cx="97.536789"
                          cy="131.17813"
                          rx="57.300121"
                          ry="53.976032"
                          mask="url(#mask961)"
                        />
                      </g>
                      <g
                        style={{ display: 'inline' }}
                        //  inkscape:groupmode="layer"
                        id="g975"
                      //  inkscape:label="color copy"
                      >
                        <ellipse
                          transform="translate(1.9171328,28.117947)"
                          style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                          id="ellipse973"
                          cx="97.536789"
                          cy="131.17813"
                          rx="57.300121"
                          ry="53.976032"
                          mask="url(#mask961)"
                        />
                      </g>
                      <ellipse
                        transform="translate(1.9171328,28.117947)"
                        mask="url(#mask961)"
                        ry="53.976032"
                        rx="57.300121"
                        cy="131.17813"
                        cx="97.536789"
                        id="path933"
                        style={{ opacity: 1, fill: '#9add11', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      //  inkscape:groupmode="layer"
                      id="g999"
                      //  inkscape:label="yello"
                      style={{ display: 'inline' }}
                    >
                      <ellipse
                        transform="translate(1.9171328,28.117947)"
                        style={{ opacity: 1, fill: '#ffff00', fillOpacity: 1, fillRule: 'evenodd', strokeWidth: 0.561727 }}
                        id="ellipse997"
                        cx="97.536789"
                        cy="131.17813"
                        rx="57.300121"
                        ry="53.976032"
                        mask="url(#mask961)"
                      />
                    </g>
                    <g
                      transform="translate(-40,-60)"
                      style={{ display: 'inline' }}
                      //  inkscape:label="eyes"
                      id="layer3"
                    //  inkscape:groupmode="layer"
                    >
                      <circle
                        r="5"
                        cy="160.11795"
                        cx="136.91713"
                        id="path847"
                        style={{ opacity: 1, fill: "#000000", fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                      />
                      <circle
                        style={{ opacity: 1, fill: "#000000", fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.264583 }}
                        id="path847-3"
                        cx="168.91713"
                        cy="160.11795"
                        r="5"
                      />
                    </g>
                  </svg>
                </div>
                <h3
                  className="display-5 display-inline align-middle"
                  style={{ display: "inline" }}
                >
                  Axotl
              </h3>
              </Link>

              {!auth.loading && auth.user && (
                <div onClick={(e) => onClick(e)} className="dropdown__toggle">
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
                </div>
              )}
            </Fragment>
          )}
      </div>
      {dropDown && smallScreen && (
        <Fragment>
          <div className="dropdown-background">
            <div className="dropdownReplacement">
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
