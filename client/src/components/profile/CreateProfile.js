import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { createProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import locations from '../../utils/locations.json';
let locationChoices;

class CreateProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            handle: '',
            organization: '',
            bio: '',
            location: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        console.log(locations);

        locationChoices = locations.map(location => {
            return (
                <option>{location.name}</option>
            )
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        let profileData = {
            handle: this.state.handle,
            organization: this.state.organization,
            location: this.state.location,
            bio: this.state.bio
        }

        this.props.createProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div>
            <h5>Create your profile:</h5>
            <form onSubmit={this.onSubmit}>
                <label>Handle</label>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.handleChange}
                />
                <label>Current Affiliation</label>
                <TextField
                placeholder="What organization are you currently a part of?"
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                />
                <div class="form-group">
                    <label for="location">Location</label>
                    <select class="form-control" name='location' id="location" value={this.state.location} onChange={this.handleChange}>
                    {locationChoices}
                    </select>
                </div>

                <div class="form-group">
                    <label for="Bio">Biography</label>
                    <textarea class="form-control" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange}></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}


export default connect(null, { createProfile })(withRouter(CreateProfile));