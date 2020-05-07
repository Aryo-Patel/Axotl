import React from "react";

import { withRouter, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import TextField from "../layout/TextField";

import { registerUser, registerSponsor } from "../../actions/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",

      email: "",

      password: "",

      password2 : '',

      sponsor : false,
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

  onToggle(){
    //Weird ass bug with toggle
    this.setState({
      sponsor: !this.state.sponsor,
    })
    console.log(this.state.sponsor);
  }

  onSubmit(e) {
    e.preventDefault();
    let userData = {
      name: this.state.name,

      email: this.state.email.toLowerCase(),

      password: this.state.password,
    };

    if(this.state.sponsor === true){
      console.log("Registering sponsor...")
      this.props.registerSponsor(userData, this.props.history);
    } else if (this.state.sponsor === false) {
      console.log("Registering recipient...")
      this.props.registerUser(userData, this.props.history);
    }
  }


  render() {
      if(this.props.isRegistered) {
        return <Redirect  to = '/login' />
      }
    return (
      <div>
        <h5>Register for an Axotl account!</h5>

        <form onSubmit={this.onSubmit}>
          <TextField
            name="name"
            placeholder="Enter your full name"
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            required
          />

          <TextField
            name="email"
            placeholder="Enter a Valid Email."
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            required
          />

          <TextField
            name="password"
            placeholder="Enter a Password."
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            required
          />
          <TextField
            name="password2"
            placeholder="Confirm your Password."
            value={this.state.password2}
            onChange={this.handleChange}
            type="password"
            required
          />

          <input type="checkbox" id="sponsor" name="sponsorToggle" value="Sponsor Toggle" onClick={this.onToggle}/>
          <label for="vehicle1">Check this box if you are signing up as a sponsor!</label><br></br>

          <input type="submit" className="btn btn-info btn-block mt-4"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isRegistered : state.auth.isRegistered
})

export default connect(mapStateToProps, { registerUser, registerSponsor })(withRouter(Register));
