import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux'

const Landing = ({isAuthenticated}) => {
  // if(isAuthenticated) {
  //   return <Redirect to = '/dashboard' />
  // }

  return (
    <Fragment>
      <div
        className="landingTop m-0 p-0 container-fluid"
        style={{
          background:
            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
          height: "1000px",
          "background-size": "cover",
          "background-position": "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.5)",
            position: "absolute",
            height: "112.5%",
            width: "100%",

            margin: "0",
            padding: "0",
          }}
        >
          <div
            className="innerLanding"
            style={{
              color: "#fff",
              height: "100%",
              width: "80%",
              margin: "auto",
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "text-align": "center",
              "z-index" : "2"
            }}
          >
            <h1 className="x-large" style = {{opacity : "1"}}>Axotl</h1>
            <p className="lead">
              Meet with hackathon organizations, corporate sponsors, and others
              interested in making or sponsoring coding-related events.
            </p>
            <div className="logreg justify-content-center my-5 d-relative">
              <Link to="/login" className="btn btn-light btn-lg mx-5 my-5">
                Login
              </Link>
              <Link to="/register" className="btn btn-light btn-lg mx-5 my-5">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="LandingBlock position-relative w-100 row"
        style={{ height: "600px","justifyContent" : "center", "alignItems" : "center"}}
      >
        <div className="cards d-block h-100" style = {{"justifyContent" : "center", "alignItems" : "center"}} >
          <div
            className="card d-inline-block mx-5 my-5 align-bottom p-0 col-lg"
            style = {{width: "30rem"}}
          >
            <img
              src="https://2a9h4ym6yis3rbxe73gyzw48-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/iStock_Handshake_030620.jpg"
              alt=""
              className="card-img-top"
              style={{ height: "20vw", "object-fit": "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Making Connections</h5>
              <p className="card-text">
                Bringing local companies and individuals together with hackathon
                organizers to foster young talent and support tech initiatives.
              </p>
            </div>
          </div>

          <div
            className="card d-inline-block mx-5 my-5 align-middle col-lg p-0"
            style={{ width: "30rem" }}
          >
            <img
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=2767&q=80"
              alt=""
              className="card-img-top"
              style={{ height: "20vw", "object-fit": "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Supporting Young Developers</h5>
              <p className="card-text">
                Bringing local companies and individuals together with hackathon
                organizers to foster young talent and support tech initiatives.
              </p>
            </div>
          </div>
          <div
            className="card d-inline-block mx-5 my-5 align-middle p-0 col-lg"
            style={{ width: "30rem" }}
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
              alt=""
              className="card-img-top"
              style={{ height: "20vw", "object-fit": "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                Fostering Creativity and Excellence
              </h5>
              <p className="card-text">
                Bringing local companies and individuals together with hackathon
                organizers to foster young talent and support tech initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="landingMid m-0 p-0 container-fluid"
        style={{
          background:
            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
          height: "1000px",
          "background-size": "cover",
          "background-position": "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.5)",
            position: "absolute",
            height: "112.5%",
            width: "100%",

            margin: "0",
            padding: "0",
          }}
        >
          <div
            className="innerLanding"
            style={{
              color: "#fff",
              height: "100%",
              width: "80%",
              margin: "auto",
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "text-align": "center",
              "z-index" : "2"
            }}
          >
            <h1 className="x-large" style = {{opacity : "1"}}>Axotl</h1>
            <p className="lead">
            Replace this with a website function and put in a picture
            </p>
            
          </div>
        </div>
      </div>
      <div
        className="landingMid m-0 p-0 container-fluid"
        style={{
          background:
            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
          height: "1000px",
          "background-size": "cover",
          "background-position": "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.5)",
            position: "absolute",
            height: "112.5%",
            width: "100%",

            margin: "0",
            padding: "0",
          }}
        >
          <div
            className="innerLanding"
            style={{
              color: "#fff",
              height: "100%",
              width: "80%",
              margin: "auto",
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "text-align": "center",
              "z-index" : "2"
            }}
          >
            <h1 className="x-large" style = {{opacity : "1"}}>Axotl</h1>
            <p className="lead">
            Replace this with a website function and put in a picture
            </p>
            
          </div>
        </div>
      </div>
      <div
        className="landingMid m-0 p-0 container-fluid"
        style={{
          background:
            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
          height: "1000px",
          "background-size": "cover",
          "background-position": "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.5)",
            position: "absolute",
            height: "112.5%",
            width: "100%",

            margin: "0",
            padding: "0",
          }}
        >
          <div
            className="innerLanding"
            style={{
              color: "#fff",
              height: "100%",
              width: "80%",
              margin: "auto",
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "text-align": "center",
              "z-index" : "2"
            }}
          >
            <h1 className="x-large" style = {{opacity : "1"}}>Axotl</h1>
            <p className="lead">
              Replace this with a website function and put in a picture
            </p>
            
          </div>
        </div>
      </div>
      <div className="footer text-align-center justify-content-center align-middle" style = {{backgroundColor : "#e6e6e6", "height" : "200px", "borderTop" : "1", "justifyContent" : "center"}}>
        <p className="contact btn d-block">Contact Us</p>
        <p className="about btn d-block">About</p>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated : PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Landing);
