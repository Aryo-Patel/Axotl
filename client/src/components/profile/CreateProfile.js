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
        <div className="createProfile">
            <h5 className = 'heading'>Create your profile:</h5>
            <form onSubmit={this.onSubmit}>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                parentClassName='createProfile'
                className='createProfile__field'
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.handleChange}
                required
                ><i
                className="fas fa-at createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>
                
                <TextField
                placeholder="What organization are you currently a part of?"
                parentClassName='createProfile'
                className='createProfile__field'
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                required
                />
                <div className="createProfile__locationInput">
                <LocationInput className = 'createSponsorProfile__field'  parentClassName='createSponsorProfile' onChange={this.handleLocationChange}/>
                </div>
                <input
                style={{height: 0, width: 0, opacity: 0}}
                className='goAway'
                name="location"
                type="text"
                value={this.state.location}
                style= {{height: 0}}
                required
                disabled
                />
                <div className="createProfile__form-group">
                    <textarea className="createProfile__textarea" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange} required></textarea>
                    <label className="createProfile__label">Write a brief biography here...</label>
                </div>
                <TextField
                placeholder="Link your Twitter!"
                parentClassName='createProfile'
                className='createProfile__field'
                name="twitter"
                type="text"
                value={this.state.twitter}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Youtube Channel!"
                parentClassName='createProfile'
                className='createProfile__field'
                name="youtube"
                type="text"
                value={this.state.youtube}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Facebook!"
                parentClassName='createProfile'
                className='createProfile__field'
                name="facebook"
                type="text"
                value={this.state.facebook}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your LinkedIn!"
                parentClassName='createProfile'
                className='createProfile__field'
                name="linkedin"
                type="text"
                value={this.state.linkedin}
                onChange={this.handleChange}
                
                />
                <TextField
                placeholder="Link your Instagram!"
                parentClassName='createProfile'
                className='createProfile__field'
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