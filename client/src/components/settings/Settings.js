import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/ProfileActions";
import { deleteAccount } from "../../actions/auth";
import { setAuthFalse } from "../../actions/auth";
import Axios from "axios";
import "./styling/main.css";
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {editAccount} from '../../actions/auth';

const Settings = ({
  sponsor,
  isAuthenticated,
  profile,
  getCurrentProfile,
  setAuthFalse,
  user,
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
  })

  const deleteAccount = async () => {
    if (sponsor) {
      await Axios.delete("/api/sponsors").then((res) => {
        this.props.setAuthFalse();
      });
    } else {
      await Axios.delete("/api/users").then((res) => {
        this.props.setAuthFalse();
      });
    }
  };
  //Making user information editable upon clicking the edit button
  const onClick = (e) => {
    $(`.${e.target.classList[1]}`).next().attr(
      "readOnly",
      !$(`.${e.target.classList[1]}`).next().attr("readOnly")
    );
    if(!$('.forms__submission').hasClass('visible')) {
        $('.forms__submission').addClass('visible');
    }
    
  };

  //submitting updated information to the back end
  const onSubmit = (e) => {
    if($('.forms__submission').hasClass('visible')) {
        $('.forms__submission').removeClass('visible');
    }

  }

  return (
    <div className="settings">
        <h3 className = 'heading'>Settings</h3>
      <form className="forms">
          <h3 className='subheading'>Edit your Account Information</h3>
        <div className="forms__container">
          <svg
            onClick={(e) => onClick(e)}
            id="icon-edit"
            viewBox="0 0 20 20"
            className="forms__edit forms__edit-1"
          >
            <path d="M17.561 2.439c-1.442-1.443-2.525-1.227-2.525-1.227l-12.826 12.825-1.010 4.762 4.763-1.010 12.826-12.823c-0.001 0 0.216-1.083-1.228-2.527zM5.68 17.217l-1.624 0.35c-0.156-0.293-0.345-0.586-0.69-0.932s-0.639-0.533-0.932-0.691l0.35-1.623 0.47-0.469c0 0 0.883 0.018 1.881 1.016 0.997 0.996 1.016 1.881 1.016 1.881l-0.471 0.468z"></path>
          </svg>
          <input
            type="text"
            readOnly={true}
            value={formData.name}
            className="forms__input"
          />
        </div>
        <div className="forms__container">
          <svg
            onClick={(e) => onClick(e)}
            id="icon-edit"
            viewBox="0 0 20 20"
            className="forms__edit forms__edit-2"
          >
            <path d="M17.561 2.439c-1.442-1.443-2.525-1.227-2.525-1.227l-12.826 12.825-1.010 4.762 4.763-1.010 12.826-12.823c-0.001 0 0.216-1.083-1.228-2.527zM5.68 17.217l-1.624 0.35c-0.156-0.293-0.345-0.586-0.69-0.932s-0.639-0.533-0.932-0.691l0.35-1.623 0.47-0.469c0 0 0.883 0.018 1.881 1.016 0.997 0.996 1.016 1.881 1.016 1.881l-0.471 0.468z"></path>
          </svg>
          <input
            type="text"
            readOnly={true}
            value={formData.email}
            className="forms__input"
          />
        </div>
        <Link to='/changepassword'className = 'forms__forgot-password'>Change Password &rarr;</Link>
        <button type='submit' className = 'forms__submission button'>Submit My Changes</button>
      </form>
      <button className="deleteButton" onClick={(e) => deleteAccount()}>
        Delete Profile and Account
      </button>
    </div>
  );
};

Settings.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  sponsor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  user: state.auth.user.user,
  isAuthenticated: state.auth.isAuthenticated,
  sponsor: state.auth.user.user.sponsor,
});

export default connect(mapStateToProps, { getCurrentProfile, setAuthFalse, editAccount })(
  Settings
);
