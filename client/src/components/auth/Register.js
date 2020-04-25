import React from "react";

import { withRouter } from "react-router-dom";

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
            placeholder="Enter a valid eamil"
            value={this.state.email}
            onChange={this.handleChange}
            type="text"
          />

          <TextField
            name="password"
            placeholder="Enter a good password!"
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
          />

          <input type="submit" className="btn btn-info btn-block mt-4"></input>
        </form>
      </div>
    );
  }
}

export default connect(null, { registerUser })(withRouter(Register));
