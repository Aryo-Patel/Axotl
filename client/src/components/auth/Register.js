import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import TextField from "../layout/TextField";

import { registerUser, registerSponsor } from "../../actions/auth";

import $ from 'jquery';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",

      email: "",

      password: "",

      password2: "",

      sponsor: false,
    };

    this.handleChange = this.handleChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.onToggle = this.onToggle.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onToggle() {
    //Weird bug with toggle
    const sponsor = $('.register__sponsor-toggle-label--2')
    const recipient = $('.register__sponsor-toggle-label--1')
    sponsor.hasClass('register__selected') ? sponsor.removeClass('register__selected') : sponsor.addClass('register__selected');
    recipient.hasClass('register__selected') ? recipient.removeClass('register__selected') : recipient.addClass('register__selected');
    this.setState({
      sponsor: !this.state.sponsor,
    });
    console.log(this.state.sponsor);
  }

  onSubmit(e) {
    e.preventDefault();
    let userData = {
      name: this.state.name,

      email: this.state.email.toLowerCase(),

      password: this.state.password,
    };

    if (this.state.sponsor === true) {
      console.log("Registering sponsor...");
      this.props.registerSponsor(userData, this.props.history);
    } else if (this.state.sponsor === false) {
      console.log("Registering recipient...");
      this.props.registerUser(userData, this.props.history);
    }
  }

  render() {
    if (this.props.isRegistered) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="register__background">
        <div className="register">
          <h5 className="heading">Register for an Axotl account!</h5>

          <form className = 'register__form' onSubmit={this.onSubmit}>
            <TextField
              name="name"
              placeholder="Enter your full name"
              className="register__field"
              parentClassName='register'
              value={this.state.name}
              onChange={this.handleChange}
              type="text"
              required
            ><i
            className="fas fa-user register__icon"
            samesite="none"
            SameSite="none"
          ></i></TextField>

            <TextField
              name="email"
              placeholder="Enter a Valid Email."
              className="register__field"
              parentClassName='register'
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              required
            ><i
            className="fas fa-envelope register__icon"
            samesite="none"
            SameSite="none"
          ></i></TextField>

            <TextField
              name="password"
              placeholder="Enter a Password."
              className="register__field"
              parentClassName='register'
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              required
            ><i className="fas fa-lock register__icon"></i></TextField>
            <TextField
              name="password2"
              placeholder="Confirm your Password."
              className="register__field register__last-field"
              parentClassName='register'
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
              required
            ><i className="fas fa-lock register__icon"></i></TextField>
            <div className="register__sponsor-toggle">
            <label id="sponsor-toggle" className="register__switch">
              <input
                
                type="checkbox"
                onClick={this.onToggle}
              />
              <span className="register__slider"></span>
            </label>
            <label className = 'register__sponsor-toggle-label--1' htmlFor="sponsor-toggle">I am a prospective sponsor</label>
            <label className = 'register__sponsor-toggle-label--2 register__selected' htmlFor="sponsor-toggle">I am a prospective recipient</label>
            </div>
            <input type="submit" className="register__submit button"></input>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRegistered: state.auth.isRegistered,
});

export default connect(mapStateToProps, { registerUser, registerSponsor })(
  withRouter(Register)
);
