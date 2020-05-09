/*
    THIS IS FOR SPONSORS!!!!!!
    ^^^^^^^^^^^^^^^^^^^^^^^^^
*/

import React, { Component } from 'react';
import TextField from '../layout/TextField';
import { createProfile } from '../../actions/ProfileActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import locations from '../../utils/locations.json';
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
                required
                />
                <label>Organization/Company</label>
                <TextField
                placeholder="What is your company/organization name?"
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.handleChange}
                required
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

                <div class="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="merch" />Merch/Swag</label>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="prizes" />Prizes</label>
                </div>
                <div class="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="food" />Food</label>
                </div> 
                <div class="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="drinks" />Drinks</label>
                </div> 
                <div class="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="workshops" />Workshop Hosting</label>
                </div> 
                <div class="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="judging" />Judging</label>
                </div> 
                <div class="checkbox disabled">
                    <label><input type="checkbox" value="" onClick={this.changeDonationTypes} name="other" />Other</label>
                </div> 

                <div class="form-group">
                    <label for="Bio">Biography</label>
                    <textarea class="form-control" name='bio' value={this.state.bio} id="Bio" rows="4" onChange={this.handleChange} required></textarea>
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

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    sponsor: state.auth.user.user.sponsor,
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateSponsorProfile));