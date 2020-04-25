import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import TextField from "../layout/TextField";

import { registerUser } from "../../actions/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",

      email: "",

      password: "",

      password2 : '',

      sponsor : 'sponsor'
    };

    this.handleChange = this.handleChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let userData = {
      name: this.state.name,

      email: this.state.email,

      password: this.state.password,
    };

    this.props.registerUser(userData, this.props.history);
  }

  render() {
      if(this.props.isRegistered) {
        return <Redirect  to = '/login' />
      }
    return (
      <div>
        <h5>Register for an Axotl account!</h5>

        <form noValidate onSubmit={this.onSubmit}>
          <TextField
            name="name"
            placeholder="Enter your full name"
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
          />

          <TextField
            name="email"
            placeholder="Enter a Valid Email."
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
          />

          <TextField
            name="password"
            placeholder="Enter a Password."
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
          <TextField
            name="password2"
            placeholder="Confirm your Password."
            value={this.state.password2}
            onChange={this.handleChange}
            type="password"
          />

          <input type="submit" className="btn btn-info btn-block mt-4"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isRegistered : state.auth.isRegistered
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
