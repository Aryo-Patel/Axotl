/*
    THIS IS FOR SPONSORS!!!!!!
    ^^^^^^^^^^^^^^^^^^^^^^^^^
*/

import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { createProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LocationInput from './LocationInput';

class CreateSponsorProfile extends Component {
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
            donationTypes: {
                merch: false,
                prizes: false,
                food: false,
                drinks: false,
                workshops: false,
                judging: false,
                other: false,

            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeDonationTypes = this.changeDonationTypes.bind(this);

    }
    
    componentDidMount(){
        if(this.props.sponsor === false){
            return <Redirect to="/dashboard" />
        }
    }

    changeDonationTypes(e){
        let newDonation = this.state.donationTypes;
        newDonation[e.target.name] = !newDonation[e.target.name];
        this.setState({
            donationTypes: newDonation
        })
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
        console.log(this.state.location)
        let profileData = {
            sponsor: true,
            handle: this.state.handle,
            organization: this.state.organization,
            location: this.state.location,
            bio: this.state.bio,
            twitter: this.state.twitter,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            donationTypes: this.state.donationTypes,
        }

        this.props.createProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div className="createSponsorProfile">
            <h5 className='heading'>Create your profile:</h5>
            <form className='createSponsorProfile__form' onSubmit={this.onSubmit}>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
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
                placeholder="What is your company/organization name?"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                required
                />
                <div className="createSponsorProfile__locationInput">
                <LocationInput className = 'createSponsorProfile__field' parentClassName='createSponsorProfile' onChange={this.handleLocationChange}/>
                </div>
                <input
                style = {{height: 0, width: 0, opacity: 0}}
                className='createSponsorProfile__field'
                name="location"
                type="text"
                value={this.state.location}
                required
                disabled
                />
                <div className="createSponsorProfile__donationTypes">
                <div className="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="merch" />Merch/Swag</label>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="prizes" />Prizes</label>
                </div>
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="food" />Food</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="drinks" />Drinks</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="workshops" />Workshop Hosting</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="judging" />Judging</label>
                </div> 
                <div className="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="other" />Other</label>
                </div> 
                </div>

                <div className="createSponsorProfile__form-group">
                    <textarea className="createSponsorProfile__textarea" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange} required></textarea>
                    <label className="createSponsorProfile__label">Write a brief biography here...</label>
                </div>
                <TextField
                placeholder="Link your Twitter!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="twitter"
                type="text"
                value={this.state.twitter}
                onChange={this.handleChange}
                
                ><i
                className="fab fa-twitter createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>
                <TextField
                placeholder="Link your Youtube Channel!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="youtube"
                type="text"
                value={this.state.youtube}
                onChange={this.handleChange}
                
                ><i
                className="fab fa-youtube createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>
                <TextField
                placeholder="Link your Facebook!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="facebook"
                type="text"
                value={this.state.facebook}
                onChange={this.handleChange}
                
                ><i
                className="fab fa-facebook createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>
                <TextField
                placeholder="Link your LinkedIn!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="linkedin"
                type="text"
                value={this.state.linkedin}
                onChange={this.handleChange}
                
                ><i
                className="fab fa-linkedin createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>
                <TextField
                placeholder="Link your Instagram!"
                parentClassName='createSponsorProfile'
                className='createSponsorProfile__field'
                name="instagram"
                type="text"
                value={this.state.instagram}
                onChange={this.handleChange}
                
                ><i
                className="fab fa-instagram createSponsorProfile__icon"
                samesite="none"
                SameSite="none"
              ></i></TextField>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    sponsor: state.auth.user.user.sponsor,
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateSponsorProfile));