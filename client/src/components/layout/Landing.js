import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
//import styling
import './styling/style.css';



const Landing = ({ isAuthenticated }) => {
  // if(isAuthenticated) {
  //   return <Redirect to = '/dashboard' />
  // }

  return (
    <Fragment>
      <body className="text-center">

        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <h1 className="cover-heading home-head">Axotl</h1>
          <div className="row">
            <div className="col col-sm-2 col-md-3"></div>
            <div className="col col-12 col-sm-8 col-md-6">
              <p className="lead">Meet with hackathon organizations, corporate sponsors, and others interested in making
              or
                    sponsoring coding-related events.</p>
            </div>
            <div className="col col-sm-2 col-md-3"></div>
          </div>

          <p className="lead" style={{ justifyContent: 'center' }}>

            <Link to="/login" className="btn btn-lg btn-secondary button-c">
              Login
              </Link>
            <Link to="/register" className="btn btn-lg btn-secondary button-c">
              Register
              </Link>

          </p>
        </div>

        <div className="block2">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-rss blockIcon"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>

            <h1 className="cover-heading home-head">Making Connections</h1>
            <div className="row">
              <div className="col col-sm-2 col-md-3"></div>
              <div className="col col-12 col-sm-8 col-md-6">
                <p className="lead">Bringing local companies and individuals together with hackathon organizers to foster young talent and support tech initiatives.</p>
              </div>
              <div className="col col-sm-2 col-md-3"></div>
            </div>

          </div>
        </div>


        <div className="block1">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-code blockIcon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            <h1 className="cover-heading home-head">Supporting Young Developers</h1>
            <div className="row">
              <div className="col col-sm-2 col-md-3"></div>
              <div className="col col-12 col-sm-8 col-md-6">
                <p className="lead">Bringing local companies and individuals together with hackathon organizers to foster young talent and support tech initiatives.</p>
              </div>
              <div className="col col-sm-2 col-md-3"></div>
            </div>

          </div>
        </div>

        <div className="block3">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trending-up blockIcon"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            <h1 className="cover-heading home-head">Fostering Creativity and Excellence</h1>
            <div className="row">
              <div className="col col-sm-2 col-md-3"></div>
              <div className="col col-12 col-sm-8 col-md-6">
                <p className="lead">Bringing local companies and individuals together with hackathon organizers to foster young talent and support tech initiatives.</p>
              </div>
              <div className="col col-sm-2 col-md-3"></div>
            </div>

          </div>
        </div>

        <div className="block4">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <h1 className="cover-heading home-head">About Us</h1>
            <div className="row">
              <div className="col col-sm-2 col-md-3"></div>
              <div className="col col-12 col-sm-8 col-md-6">
                <p className="lead">coming soon!</p>
              </div>
              <div className="col col-sm-2 col-md-3"></div>
            </div>

          </div>
        </div>


      </body>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Landing);
