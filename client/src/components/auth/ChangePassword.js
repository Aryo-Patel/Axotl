import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePass } from "../../actions/auth";
import {Link, withRouter} from 'react-router-dom';

const ChangePassword = ({ changePass, history }) => {
  const [passwords, setPasswords] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: ""
  });

  const onChange = (e) => {
    setPasswords({...passwords, [e.target.name]: e.target.value})
  }
  return (
    <Fragment>
      <div className="changePassword">
        <h3 className="heading">Change Password</h3>
        <form
          action=""
          className="changePassword__form"
          onSubmit={(e) => {
              if(passwords.confirmPass == passwords.newPass) {
                  //Alert handling
              }
            e.preventDefault();
            
            const currPass = passwords.currentPass
            const newPass = passwords.newPass
            const confirmPass = passwords.confirmPass
            setPasswords({...passwords, currentPass: "",
            newPass: "",
            confirmPass: ""});
            changePass({currPass, newPass, confirmPass}, history);
          }}
        >
            <div className="changePassword__form-group">
          <input
            type="password"
            name='currentPass' 
            id='currentPass' 
            className="changePassword__input"
            onChange={(e) => onChange(e)}
            value={passwords.currentPass}
         required />
          <label htmlFor="#currentPass" className = 'changePassword__label'>Current Password</label>
          </div>
          <div className="changePassword__form-group">
          <input
            type="password"
            name='newPass'
            id='newPass' 
            className="changePassword__input"
            onChange={(e) => onChange(e)}
            value = {passwords.newPass}
          required />
          <label htmlFor="#newPass" className = 'changePassword__label'>New Password</label>
          </div>
          <div className="changePassword__form-group">
          <input
            type="password"
            name='confirmPass'
            id='confirmPass' 
            className="changePassword__input"
            onChange={(e) => onChange(e)}
            value={passwords.confirmPass}
            required/>
          <label htmlFor="#confirmPass" className = 'changePassword__label'>Confirm New Password</label>
          </div>

          <button type="submit" className="changePassword__submit button">
            Submit
          </button>
        </form>
        <Link to = '/forgotpassword' className = "forgot-password">Forgot Password?</Link>
      </div>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  changePass: PropTypes.func.isRequired,
};

export default connect(null, { changePass })(withRouter(ChangePassword));
