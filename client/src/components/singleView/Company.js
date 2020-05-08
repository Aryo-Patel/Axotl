import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompany } from "../../actions/companies";

import './styling/single-view-styling.css'

const Company = ({ match, getCompany, company : {social , donationDescription, bio, location, avatar, organization, handle, donationTypes} }) => {
  useEffect(() => {
    console.log(match.params.id);
    getCompany(match.params.id);
  }, [getCompany, match.params.id]);
  let facebook = null;
  let twitter = null;
  let instagram = null;
  let linkedin = null;
  if(social) {
    let {facebook, twitter, linkedin, instagram} = social
  } 
  return (
    <Fragment>
      <div className = 'compHeader'>
      <img src="http://www.pngall.com/wp-content/uploads/2018/04/Businessman-Transparent.png" alt="Avatar" className="avatar" />
      <h1 className="title">{organization}</h1>
      <h3 className="handle">@{handle}</h3>
      <p className = 'location'><svg class="bi bi-map" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z" clip-rule="evenodd"/>
</svg>{' '}{location}</p>
<div className = 'bioContainer'>
  {facebook ? <a><i className="fab fa-facebook fa-2x"></i></a> : null}
  {twitter ? <a><i className="fab fa-twitter fa-2x"></i></a> : null}
  {linkedin ? <a><i className="fab fa-linkedin fa-2x"></i></a> : null}
  {instagram ? <a><i className="fab fa-instagram fa-2x"></i></a> : null}
      <p className = 'bio'>{bio}</p>
      </div>
</div>

      <div className="donationTypes">
  
        {donationTypes && Object.keys(donationTypes).map(key => donationTypes[key] ? (
          <p className = 'donoType'>{key}{'  '}<svg
            className="btn btn-success bi bi-check"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
          </p>
       
        ) : (
          <p className = 'donoType'>{key}{'  '}<svg
            className="btn btn-danger bi bi-x mx-1"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
              clip-rule="evenodd"
            />
          </svg>
          </p>
        ))}
        <p className="donationDescrips">{donationDescription}</p>
      </div>
    </Fragment>
  );
};

Company.propTypes = {
  getCompany: PropTypes.func.isRequired,
  company: PropTypes.object,
};

const mapStateToProps = (state) => ({
  company: state.companies.company,
});

export default connect(mapStateToProps, { getCompany })(Company);
