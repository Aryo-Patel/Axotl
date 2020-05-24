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
            // twitter: this.props.profile.profile.social.twitter,
            // instagram: this.props.profile.profile.social.instagram,
            // youtube: this.props.profile.profile.social.youtube,
            // linkedin: this.props.profile.profile.social.linkedin,
            // facebook: this.props.profile.profile.social.facebook,
        }
        if(this.props.profile.profile.social) {
            this.state.twitter= this.props.profile.profile.social.twitter;
            this.state.instagram= this.props.profile.profile.social.instagram;
            this.state.youtube= this.props.profile.profile.social.youtube;
            this.state.linkedin= this.props.profile.profile.social.linkedin;
            this.state.facebook= this.props.profile.profile.social.facebook;
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
        <div className="editProfile">
                <h5 className= 'heading'>Edit your profile:</h5>
                <form onSubmit={this.onSubmit}>
                    <TextField
                    placeholder="Enter a unique handle for your profile!"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="handle"
                    type="text"
                    value={this.state.handle}
                    onChange={this.handleChange}
                    />
                    <TextField
                    placeholder="What organization are you currently a part of?"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="organization"
                    type="text"
                    value={this.state.organization}
                    onChange={this.handleChange}
                    />
                    <div className="editProfile_locationInput">
                        <LocationInput 
                        parentClassName='editProfile'
                        className='editProfile__field' onChange={this.handleLocationChange}
                        location={this.state.location}
                        />
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
                    <div className="editProfile__form-group">
                        <textarea 
                        className="editProfile__textarea" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange}></textarea>
                        <label 
                        className="editProfile__label">Write a brief biography here...</label>
                    </div>
                    
                    <TextField
                    parentClassName='editProfile'
                    className='editProfile__field'
                    placeholder="Link your Twitter!"
                    name="twitter"
                    type="text"
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    
                    >
                      <i
                        className="fab fa-twitter editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>  
                    </TextField>
                    
                    <TextField
                    placeholder="Link your Youtube Channel!"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="youtube"
                    type="text"
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    
                    ><i
                        className="fab fa-youtube editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>
                    </TextField>
                    <i
                        className="fab fa-facebook editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>
                    <TextField
                    placeholder="Link your Facebook!"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="facebook"
                    type="text"
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    >
                        <i
                        className="fab fa-facebook editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>
                    </TextField>
                    
                    <TextField
                    placeholder="Link your LinkedIn!"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="linkedin"
                    type="text"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    >
                    <i
                        className="fab fa-linkedin editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>
                    </TextField>
                    
                    <TextField
                    placeholder="Link your Instagram!"
                    parentClassName='editProfile'
                    className='editProfile__field'
                    name="instagram"
                    type="text"
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    
                    >
                        <i
                        className="fab fa-instagram editProfile__icon"
                        samesite="none"
                        SameSite="none">
                    </i>
                    </TextField>

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