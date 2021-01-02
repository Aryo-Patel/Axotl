import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendLogin } from "../../actions/auth";
import { Redirect, Link } from "react-router-dom";
import $ from 'jquery';

//importing the css
import "./authStyles/authstyles.css";
import { getCurrentProfile } from "../../actions/ProfileActions";
const Login = ({ sendLogin, isAuthenticated, hasProfile }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //password read status 
  const [readable, setReadable] = useState('password');

  //onchange for form
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit for form submitting the login information to the redux action
  const onSubmit = async (e) => {
    e.preventDefault();
    sendLogin(formData);
  };

  //checking if the user is authenticated, and if they are, checking if they have a profile to 
  //redirect between the dashboard or the profile creation screen
  if (isAuthenticated) {
    console.log(hasProfile)
    if (!hasProfile) {
      console.log('redirecting to profile')
      return <Redirect to='/profile' />
    }
    return <Redirect to="/dashboard" />;
  }


  //function utilizing jquery to create the password visibility effect (bubbling out)
  const setPasswordIcon = e => {
    if (readable == 'password') {
      setReadable('text')
      $('.login__view-1').css('visibility', 'hidden')
      $('.login__view-2').css('visibility', 'visible')
    } else {
      setReadable('password')
      $('.login__view-1').css('visibility', 'visible')
      $('.login__view-2').css('visibility', 'hidden')
    }
  }

  return (
    <Fragment>
      <div className="login__background">
        {/* actual block containing the login functionality */}
        <div className="login__block">
          <svg
            className="login__logo"
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
                    style={{
                      fill: "#ff6647",
                      fillOpacity: 1,
                      fillRule: "evenodd",
                      strokeWidth: 0.264583,
                      display: "inline",
                    }}
                    d="m 234.02948,163.63163 c 0,25.89075 -58.66088,17.54367 -60,0 -0.76773,-10.05784 -4.61906,-18.40301 -5.95193,-20.81155 -6.91042,-12.48724 -22.08614,-18.65957 -34.04807,-19.18844 -13.31441,-0.58868 -23.37477,5.91531 -29.95097,12.99603 -10.644946,11.46163 -10.04903,27.00396 -10.04903,27.00396 0,0 -1.027732,-31.54273 24.02764,-52.28542 18.89102,-15.639381 33.62472,-17.714576 45.97236,-17.714575 38.65993,2e-6 70,31.340055 70,69.999995"
                  //  inkscape:connector-curvature="0"
                  //  sodipodi:nodetypes="csssscssc"
                  />
                  <circle
                    style={{
                      fill: "#ff6647",
                      fillOpacity: 1,
                      fillRule: "evenodd",
                      strokeWidth: 0.264583,
                      display: "inline",
                    }}
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
              style={{ display: "none" }}
            >
              <circle
                style={{
                  fill: "#00ffff",
                  strokeWidth: 0.264583,
                  fillRule: "evenodd",
                }}
                id="path10"
                cx="110.00604"
                cy="130"
                r="70"
              />
              <circle
                cy="130"
                cx="80.006042"
                id="path28-1"
                style={{
                  fill: "#00ffff",
                  strokeWidth: 0.264583,
                  opacity: 0.5,
                }}
                r="40"
              />
            </g>
            <g
              transform="translate(-40,-60)"
              //  inkscape:groupmode="layer"
              id="layer2"
              //  inkscape:label="Layer 2"
              style={{ display: "none" }}
            >
              <path
                //  sodipodi:nodetypes="csssscssc"
                //  inkscape:connector-curvature="0"
                d="m 180.00604,130 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 C 107.14369,96.7012 91.967974,90.52888 80.006043,90 66.691628,89.41132 56.631274,95.91531 50.055075,102.99604 39.410126,114.45766 40.006042,130 40.006042,130 c 0,0 -1.027732,-31.54273 24.027638,-52.28542 C 82.924702,62.075194 97.658404,59.999999 110.00604,60 c 38.65993,2e-6 70,31.34006 70,70"
                style={{
                  fill: "#00ffff",
                  strokeWidth: 0.264583,
                  fillRule: "evenodd",
                }}
                id="path10-1"
              />
              <circle
                r="30.000002"
                cy="130"
                cx="150.00604"
                id="path28"
                style={{ fill: "#00ffff", strokeWidth: 0.264583 }}
              />
            </g>
            <g
              transform="translate(-40,-60)"
              style={{ display: "inline" }}
              //  inkscape:groupmode="layer"
              id="layer4"
            //  inkscape:label="body"
            >
              <path
                //  sodipodi:nodetypes="csssscssc"
                //  inkscape:connector-curvature="0"
                d="m 181.92317,158.11795 c 0,25.89074 -58.66088,17.54366 -60,0 -0.76773,-10.05785 -4.61906,-18.40302 -5.95193,-20.81155 -6.91042,-12.48725 -22.086133,-18.65957 -34.048064,-19.18845 -13.314415,-0.58868 -23.374769,5.91531 -29.950968,12.99604 -10.644949,11.46162 -10.049033,27.00396 -10.049033,27.00396 0,0 -1.027732,-31.54273 24.027638,-52.28542 18.891022,-15.639389 33.624724,-17.714584 45.972357,-17.714583 38.65993,2e-6 70,31.340063 70,70.000003"
                style={{
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.264583,
                }}
                id="path10-1-1"
              />
              <circle
                r="30.000002"
                cy="158.11795"
                cx="151.92317"
                id="path28-0"
                style={{
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.264583,
                }}
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
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.241556,
                }}
                id="path865"
              />
              <path
                id="path865-1"
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.168551,
                }}
                d="m 118.27251,153.57778 c -1.14609,2.95177 -4.46807,4.41557 -7.41984,3.26948 -2.95177,-1.14609 -5.8491,-4.91747 -7.18211,-8.939 4.31346,-1.72198 8.3807,-2.89641 11.33247,-1.75032 2.95177,1.14609 4.41557,4.46806 3.26948,7.41984 z"
              //  inkscape:connector-curvature="0"
              //  sodipodi:nodetypes="sscss"
              />
              <path
                //  sodipodi:nodetypes="sscss"
                //  inkscape:connector-curvature="0"
                d="m 124.93054,176.71889 c 1.78679,2.61416 1.11608,6.18184 -1.49808,7.96864 -2.61416,1.78679 -7.36301,2.04444 -11.43377,0.87034 1.0183,-4.53147 2.34905,-8.55028 4.96321,-10.33707 2.61416,-1.78679 6.18184,-1.11608 7.96864,1.49809 z"
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.168551,
                }}
                id="path865-1-7"
              />
              <path
                id="path904"
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.241556,
                }}
                d="m 184.50802,159.75478 c 0.0117,-4.07483 4.11724,-7.37075 9.17096,-7.36167 5.05374,0.009 11.53424,3.19543 15.82902,7.40658 -5.43412,4.06507 -10.81605,7.35871 -15.86978,7.34964 -5.05372,-0.009 -9.14146,-3.31974 -9.1302,-7.39455 z"
              //  inkscape:connector-curvature="0"
              //  sodipodi:nodetypes="sscss"
              />
              <path
                //  sodipodi:nodetypes="sscss"
                //  inkscape:connector-curvature="0"
                d="m 181.67695,171.20535 c 1.51031,-2.78306 4.99078,-3.81485 7.77384,-2.30453 2.78307,1.51031 5.18,5.61793 5.99354,9.77578 -4.49665,1.16245 -8.6798,1.8129 -11.46285,0.3026 -2.78306,-1.51031 -3.81484,-4.99078 -2.30453,-7.77385 z"
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.168551,
                }}
                id="path906"
              />
              <path
                id="path908"
                style={{
                  opacity: 1,
                  fill: "#ff6647",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.168551,
                }}
                d="m 183.7557,148.43083 c -1.6707,-2.68984 -0.84453,-6.22476 1.8453,-7.89547 2.68985,-1.6707 7.44542,-1.72031 11.4609,-0.36923 -1.21559,4.48258 -2.7209,8.43931 -5.41074,10.11001 -2.68984,1.6707 -6.22476,0.84453 -7.89546,-1.84531 z"
              //  inkscape:connector-curvature="0"
              //  sodipodi:nodetypes="sscss"
              />
            </g>
            <g
              transform="translate(-40,-60)"
              style={{ display: "none" }}
              //  inkscape:label="color"
              id="layer6"
            //  inkscape:groupmode="layer"
            >
              <g
                style={{ display: "inline" }}
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
                  style={{
                    opacity: 1,
                    fill: "#9add11",
                    fillOpacity: 1,
                    fillRule: "evenodd",
                    strokeWidth: 0.561727,
                  }}
                />
              </g>
              <g
                style={{ display: "inline" }}
                //  inkscape:groupmode="layer"
                id="g983"
              //  inkscape:label="color copy copy copy"
              >
                <ellipse
                  transform="translate(1.9171328,28.117947)"
                  style={{
                    opacity: 1,
                    fill: "#9add11",
                    fillOpacity: 1,
                    fillRule: "evenodd",
                    strokeWidth: 0.561727,
                  }}
                  id="ellipse981"
                  cx="97.536789"
                  cy="131.17813"
                  rx="57.300121"
                  ry="53.976032"
                  mask="url(#mask961)"
                />
              </g>
              <g
                style={{ display: "inline" }}
                //  inkscape:groupmode="layer"
                id="g975"
              //  inkscape:label="color copy"
              >
                <ellipse
                  transform="translate(1.9171328,28.117947)"
                  style={{
                    opacity: 1,
                    fill: "#9add11",
                    fillOpacity: 1,
                    fillRule: "evenodd",
                    strokeWidth: 0.561727,
                  }}
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
                style={{
                  opacity: 1,
                  fill: "#9add11",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.561727,
                }}
              />
            </g>
            <g
              transform="translate(-40,-60)"
              //  inkscape:groupmode="layer"
              id="g999"
              //  inkscape:label="yello"
              style={{ display: "inline" }}
            >
              <ellipse
                transform="translate(1.9171328,28.117947)"
                style={{
                  opacity: 1,
                  fill: "#ffff00",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.561727,
                }}
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
              style={{ display: "inline" }}
              //  inkscape:label="eyes"
              id="layer3"
            //  inkscape:groupmode="layer"
            >
              <circle
                r="5"
                cy="160.11795"
                cx="136.91713"
                id="path847"
                style={{
                  opacity: 1,
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.264583,
                }}
              />
              <circle
                style={{
                  opacity: 1,
                  fill: "#000000",
                  fillOpacity: 1,
                  fillRule: "evenodd",
                  strokeWidth: 0.264583,
                }}
                id="path847-3"
                cx="168.91713"
                cy="160.11795"
                r="5"
              />
            </g>
          </svg>
                {/* Block containing the form and functionality of the login page */}
          <div className="login__container" data-status={readable}>
            <form action="" className="" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <svg id="icon-user" className='login__icon' viewBox="0 0 32 32">
                  <path d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                </svg>
                <input
                  className="form-input"
                  id="loginEmail"
                  type="text"
                  name="email"
                  onChange={(e) => onChange(e)}
                  required
                  value={formData.email}
                />
                <label>Email Address</label>

              </div>
              <div className="form-group">

                <svg id="icon-lock" className='login__icon' viewBox="0 0 32 32">
                  <path d="M18.5 14h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 8c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z"></path>
                </svg>
                <input
                  className="form-input pass"
                  id="loginPassword"
                  type={readable}
                  name="password"
                  onChange={(e) => onChange(e)}
                  value={formData.password}
                  required
                />
                <label>Password</label>

                <div className="login__eyes">
                  <svg id="icon-eye" className='login__view login__view-2' viewBox="0 0 64 64" onClick={e => setPasswordIcon(e)}>
                    <path d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z"></path>
                    <path d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z"></path>
                    <path d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z"></path>
                  </svg>
                  <svg className='login__view login__view-1' id="icon-eye" viewBox="0 0 64 64" onClick={e => setPasswordIcon(e)}>
                    <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                  </svg>
                </div>

              </div>
              <input
                type="submit"
                id="loginSubmit"
                className=" login-button"
                value="Login"
              ></input>
            </form>
            <Link to="/forgotpassword" className="forgot-password">
              Forgot Password?
          </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  hasProfile : PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  hasProfile : state.auth.hasProfile
});

export default connect(mapStateToProps, { sendLogin })(Login);