/*
    THIS IS THE PROFILE CREATOR FOR RECIPIENTS
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/


import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { createProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';
import LocationInput from './LocationInput';


class CreateProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            handle: '',
            organization: '',
            bio: '',
            location: '',
            youtube: '',
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);

    }

    componentDidMount(){
        if(this.props.sponser === true){
            return <Redirect to="/dashboard"/>
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLocationChange(data){
        this.setState({
            location: data,
        })
    }

    onSubmit(e){
        e.preventDefault();
        
        let profileData = {
            sponsor: false,
            handle: this.state.handle,
            organization: this.state.organization,
            location: this.state.location,
            bio: this.state.bio,
            twitter: this.state.twitter,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
        }

        this.props.createProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div className="container" style={{padding: '2% 0% 2%'}}>
            <h5>Create your profile:</h5>
            <form onSubmit={this.onSubmit}>
                <label>Handle</label>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.handleChange}
                required
                />
                <label>Current Affiliation</label>
                <TextField
                placeholder="What organization are you currently a part of?"
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                />
                <label>Location</label>
                <LocationInput onChange={this.handleLocationChange}/>
                <br></br>
                <TextField
                placeholder="Your location..."
                name="location"
                type="text"
                value={this.state.location}
                required
                disabled
                />
                <div className="form-group">
                    <label>Biography</label>
                    <textarea className="form-control" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange} required></textarea>
                </div>
                <TextField
                placeholder="Link your Twitter!"
                name="twitter"
                type="text"
                value={this.state.twitter}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Youtube Channel!"
                name="youtube"
                type="text"
                value={this.state.youtube}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Facebook!"
                name="facebook"
                type="text"
                value={this.state.facebook}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your LinkedIn!"
                name="linkedin"
                type="text"
                value={this.state.linkedin}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Instagram!"
                name="instagram"
                type="text"
                value={this.state.instagram}
                onChange={this.handleChange}
                
                />

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    sponsor: state.auth.user.user.sponsor,
})


export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));