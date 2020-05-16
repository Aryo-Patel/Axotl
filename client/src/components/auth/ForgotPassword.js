import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forPass } from "../../actions/auth";
import {withRouter} from 'react-router-dom';

const ForgotPassword = ({ forPass, history }) => {
  const [email, setEmail] = useState({
    email: "",
  });
  return (
    <Fragment>
      <div className="forgotPassword">
        <h3 className="heading">Forgot Password</h3>
        <form
          action=""
          className="forgotPassword__form"
          onSubmit={(e) => {
            e.preventDefault();
            forPass(email, history);
            setEmail("");
          }}
        >
            <div className="forgotPassword__container">
          <input
            type="email"
            id= 'forgot-password-email'
            className="forgotPassword__email"
            onChange={(e) => setEmail(e.target.value)}
            required/>
<label className = 'forgotPassword__label' htmlFor="#forgot-password-email">Email Address</label>
          <button type="submit" className="forgotPassword__submit button">
            Submit
          </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forPass: PropTypes.func.isRequired,
};

export default connect(null, { forPass })(withRouter(ForgotPassword));
