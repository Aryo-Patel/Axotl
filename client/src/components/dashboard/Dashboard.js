import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Discover from "../discover/Discover";
import './styling/main.css';
import ChatInvitations from './ChatInvitations'

const Dashboard = ({ isRegistered }) => {
  return (
    <Fragment>
      {isRegistered ? (
        <Redirect to="/profile" />
      ) : (
        <div className="dashboard">
            <a href="https://www.youtube.com/watch?v=J9qrO_-NLjc">monke</a>
            <ChatInvitations />
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
