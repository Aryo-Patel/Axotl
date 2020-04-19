import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NavBar = (props) => {
  //@TODO add useeffect to load username to navbar
  const authRecLinks = (
    <ul>
      <li>
        <Link to="/recipientProfiles">Hackathons</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
    </ul>
  );
  const authSponsLinks = (
    <ul>
    <li>
      <Link to="/sponsorProfiles">Sponsor Organizations</Link>
    </li>
    <li>
      <Link to="/posts">Posts</Link>
    </li>
    <li>
      <Link to="/chat">Chat</Link>
    </li>
  </ul>
  )
  //@TODO set navbar links based on authentication and sponsor status
  return (
    <Fragment>
      <div
        className="container-fluid "
        style={{ backgroundColor: "#87ffa7", opacity: "75%" }}
      >
        <div className="row">
          <div className="col col-8">
            <div className="row">
              <div className="col col-4 float-left align-content-left">
                <h3>Axotl</h3>
              </div>
              <div className="col col-8"></div>
            </div>
          </div>
          <div className="col col-4">{authRecLinks}</div>
        </div>
      </div>
    </Fragment>
  );
};

NavBar.propTypes = {};

export default connect(null, {})(NavBar);
