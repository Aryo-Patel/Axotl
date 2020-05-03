import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompany } from "../../actions/companies";

const Company = ({ match, getCompany, company : {avatar, organization, handle, donationTypes} }) => {
  useEffect(() => {
    console.log(match.params.id);
    getCompany(match.params.id);
  }, [getCompany]);
  return (
    <Fragment>
      <img src={avatar} alt="Avatar" className="avatar" />
      <h3 className="title">{organization}</h3>
      <h5 className="handle">@{handle}</h5>
      <p>{donationTypes && Object.keys(donationTypes)}</p>
      <div className="donationTypes">
        {donationTypes && Object.keys(donationTypes).forEach(key => donationTypes.key ? (
          <p>{key}<svg
            class="bi bi-check"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"
              clip-rule="evenodd"
            />
          </svg>
          </p>
        ) : (
          <p>{key}<svg
            class="bi bi-x"
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
