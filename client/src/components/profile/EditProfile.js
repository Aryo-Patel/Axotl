import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { editProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LocationInput from './LocationInput';

class EditProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            sponsor: this.props.sponsor,
            handle: this.props.profile.profile.handle,
            company: this.props.profile.profile.company,
            organization: this.props.profile.profile.organization,
            bio: this.props.profile.profile.bio,
            location: this.props.profile.profile.location,
            twitter: this.props.profile.profile.social.twitter,
            instagram: this.props.profile.profile.social.instagram,
            youtube: this.props.profile.profile.social.youtube,
            linkedin: this.props.profile.profile.social.linkedin,
            facebook: this.props.profile.profile.social.facebook,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
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
            sponsor: this.state.sponsor,
            handle: this.state.handle,
            company: this.state.company,
            organization: this.state.organization,
            location: this.state.location,
            bio: this.state.bio,
            twitter: this.state.twitter,
            youtube: this.state.youtube,
            linkedin: this.state.linkedin,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
        }
        console.log(profileData);

        this.props.editProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div className="container" style={{padding: '2% 0% 2%'}}>
            <h5>Edit your profile:</h5>
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
                <label>Location</label>
                <LocationInput onChange={this.handleLocationChange}/>
                <br></br>
                <TextField
                placeholder="Your location..."
                name="location"
                type="text"
                value={this.state.location}
                required
                disabled={true}
                />

                <div className="form-group">
                    <label>Biography</label>
                    <textarea className="form-control" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange}></textarea>
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
    profile: state.profile,
    sponsor: state.auth.user.user.sponsor,
})

export default connect(mapStateToProps, { editProfile })(withRouter(EditProfile));