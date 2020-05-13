import React, { Fragment } from "react";

import './styling/routing.css'
const NotFound = () => {
  return (
    <Fragment>
      <div className="notFound">
        <h1 className="x-large text-primary text-center">
          <i className="fas fa-exclamation-triangle"></i> Page Not Found
        </h1>
        <p className = 'text-center'>Sorry, this page does not exist</p>
      </div>
    </Fragment>
  );
};

export default NotFound;
