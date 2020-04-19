import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Landing = (props) => {
  return (
    <Fragment>
      <div
        className="Landing Block"
        style={{ backgroundColor: "#f7f5f5", width: "100%", height: "1000px", "margin" : "0 0"}}
      >
        <div className="cards my-3">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://2a9h4ym6yis3rbxe73gyzw48-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/iStock_Handshake_030620.jpg"
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Making Connections</h5>
              <p className="card-text">
                Bringing local companies and individuals together with hackathon
                organizers to foster young talent and support tech initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Landing.propTypes = {};

export default Landing;
