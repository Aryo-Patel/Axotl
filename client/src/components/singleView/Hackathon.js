import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHackathon } from "../../actions/hackathonActions";
import Moment from 'react-moment'

import "./styling/single-view-styling.css";

const Hackathon = ({
  match,
  getHackathon,
  hackathon: {
    title,
    description,
    prizes,
    requirements,
    criteria,
    location,
    judges,
    website,
    donations,
    startDate,
    endDate,
    winners,
  },
}) => {
  useEffect(() => {
    console.log(match.params.id);
    getHackathon(match.params.id);
  }, [getHackathon]);

  return (
    <Fragment>
      <div className="compHeader">
        <div className="info-left">
          <h1 className="title">{title}</h1>
          {location && (
            <Fragment>
              <p className="hackloc">
                <svg
                  class="bi bi-map"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"
                    clip-rule="evenodd"
                  />
                </svg>{" "}
                {location}
              </p>
            </Fragment>
          )}

        </div>
        <div className="image-container">
          <img
            src="http://www.pngall.com/wp-content/uploads/2018/04/Businessman-Transparent.png"
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="info-right">
          <p className='hackathonWhen'><Moment format='MM/DD/YYYY'>{startDate}</Moment> - <Moment format='MM/DD/YYYY'>{endDate}</Moment></p>
        </div>
      </div>
      <div className="info-wrapper">


        <div className="infoContainer">
          {website ? (
            <Fragment>
              <i className="fas fa-globe"></i>{" "}<a href={website}>{website}</a>
            </Fragment>
          ) : null}
          <hr />
          <div className="hbioContainer">
            <h4 className="hackathonHeaders bio">WHAT</h4>
            <p className="bio">{description}</p>
          </div>
          <hr />
          <div className="hbioContainer">
            <h4 className="hackathonHeaders bio">ELIGIBILITY REQUIREMENTS</h4>
            <p className="bio">{requirements}</p>
          </div>
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="donationContainer">

        {donations &&
          donations.map((donation) => (
            <div className="oneDonationContainer">
              <h5 className="donationType">{donation.type}</h5>
              <p className="donationQuantity">{donation.quantity}</p>
              <p classname="donationDescription">{donation.description}</p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

Hackathon.propTypes = {
  getHackathon: PropTypes.func.isRequired,
  hackathon: PropTypes.object,
};

const mapStateToProps = (state) => ({
  hackathon: state.hackathons.hackathon,
});

export default connect(mapStateToProps, { getHackathon })(Hackathon);
