import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux'

const Landing = ({isAuthenticated}) => {
  // if(isAuthenticated) {
  //   return <Redirect to = '/dashboard' />
  // }

  return (
    <Fragment>
      
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
