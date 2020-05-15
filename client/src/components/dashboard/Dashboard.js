import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Discover from "../discover/Discover";
import './styling/main.css'

const Dashboard = ({ isRegistered }) => {
  return (
    <Fragment>
      {isRegistered ? (
        <Redirect to="/profile" />
      ) : (
        <div className="dashboard">
            Dashboard
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRegistered: state.auth.isRegistered,
});

export default connect(mapStateToProps, {})(Dashboard);
