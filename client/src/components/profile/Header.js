import React, { Component } from "react";
import DefaultPfp from "../common/defaultpfp.png";
import DefaultSponsorPfp from "../common/sponsorDefault.png";
import { Link } from "react-router-dom";
import "./styling/main.css";

export default class Header extends Component {
  // constructor(props){
  //     super(props)
  // }
  render() {
    return (
      <div className="compHeader">
        <div className="imgWrapper">
          <img
            className="mr-3 avatar"
            src={this.props.sponsor ? DefaultSponsorPfp : DefaultPfp}
            style={{
              width: "200px",
              position: "relative",
              textalign: "center",
            }}
            alt=""
          />
        </div>
        <div className="descrWrapper">
          <p className="title">{this.props.organization}</p>
          <h5 className="mt-0 handle">
            <strong>@{this.props.handle}</strong>
          </h5>
          <p className="location">Located In: {this.props.location}</p>
          <p className="bio">{this.props.bio}</p>

          
          {this.props.sponsor ? (
            <Link to="/edit-sponsor-profile" className="btn btn-success">
              Edit Profile
            </Link>
          ) : (
            <Link to="/edit-profile" className="btn btn-success">
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    );
  }
}
