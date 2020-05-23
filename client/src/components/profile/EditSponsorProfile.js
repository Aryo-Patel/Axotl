import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { editProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LocationInput from './LocationInput';

class EditSponsorProfile extends Component {
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
            donationTypes: {
                merch: this.props.profile.profile.donationTypes.merch,
                prizes: this.props.profile.profile.donationTypes.prizes,
                food: this.props.profile.profile.donationTypes.food,
                drinks: this.props.profile.profile.donationTypes.drinks,
                workshops: this.props.profile.profile.donationTypes.workshops,
                judging: this.props.profile.profile.donationTypes.judging,
                other: this.props.profile.profile.donationTypes.other,
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.changeDonationTypes = this.changeDonationTypes.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeDonationTypes(e){
        let newDonation = this.state.donationTypes;
        newDonation[e.target.name] = !newDonation[e.target.name];
        this.setState({
            donationTypes: newDonation
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
            donationTypes: this.state.donationTypes,
        }
        console.log(profileData);

        this.props.editProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div className="editSponsorProfile">
            <h5 className="heading">Edit your profile:</h5>
            <form onSubmit={this.onSubmit}>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.handleChange}
                >
                    <i
                        className="fas fa-at editSponsorProfile__icon"
                        samesite="none"
                        SameSite="none"
                    ></i>
                </TextField>
                <TextField
                placeholder="What organization are you currently a part of?"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                />
                <div className="editSponsorProfile_locationInput"><LocationInput location={this.state.location} className="editSponsorProfile__field" parentClassName='editSponsorProfile' onChange={this.handleLocationChange}/></div>
                <input
                style = {{height: 0, width: 0, opacity: 0}}
                className='editSponsorProfile__field'
                name="location"
                type="text"
                value={this.state.location}
                required
                disabled
                />
                <div className="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="merch" checked={this.state.donationTypes['merch']}/>Merch/Swag</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="prizes" checked={this.state.donationTypes['prizes']}/>Prizes</label>
                </div>
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="food" checked={this.state.donationTypes['food']}/>Food</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="drinks" checked={this.state.donationTypes['drinks']}/>Drinks</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="workshops" checked={this.state.donationTypes['workshops']}/>Workshop Hosting</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="judging" checked={this.state.donationTypes['hosting']}/>Judging</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="other" checked={this.state.donationTypes['other']}/>Other</label>
                </div> 


                <div className="editSponsorProfile__form-group">
                    <textarea className="editSponsorProfile__textarea" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange} required></textarea>
                    <label className="editSponsorProfile__label">Write a brief biography here...</label>
                </div>

                <TextField
                placeholder="Link your Twitter!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="twitter"
                type="text"
                value={this.state.twitter}
                onChange={this.handleChange}
                
                >
                    <i
                className="fab fa-twitter editSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i>
                </TextField>
                <TextField
                placeholder="Link your Youtube Channel!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="youtube"
                type="text"
                value={this.state.youtube}
                onChange={this.handleChange}
                
                >
                    <i
                className="fab fa-youtube editSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i>
                </TextField>
                <TextField
                placeholder="Link your Facebook!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="facebook"
                type="text"
                value={this.state.facebook}
                onChange={this.handleChange}
                
                >
                    <i
                className="fab fa-facebook editSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i>
                </TextField>
                <TextField
                placeholder="Link your LinkedIn!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="linkedin"
                type="text"
                value={this.state.linkedin}
                onChange={this.handleChange}
                
                >
                    <i
                className="fab fa-linkedin editSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i>
                </TextField>
                <TextField
                placeholder="Link your Instagram!"
                parentClassName="editSponsorProfile"
                className="editSponsorProfile__field"
                name="instagram"
                type="text"
                value={this.state.instagram}
                onChange={this.handleChange}
                
                >
                    <i
                className="fab fa-instagram editSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i>
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

export default connect(mapStateToProps, { editProfile })(withRouter(EditSponsorProfile));