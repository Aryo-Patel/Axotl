import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/ProfileActions';
import {Redirect} from 'react-router-dom'
import Header from './Header';
import Information from './Information';
import Spinner from '../common/Spinner';
import Credentials from './Credentials';
import Social from './Social';
import Axios from 'axios';
import { setAuthFalse } from '../../actions/auth';
import "./styling/main.css"

class Profile extends Component {
    constructor(props){
        super(props)

        this.deleteRecipientAccount = this.deleteRecipientAccount.bind(this);
        this.deleteSponsorAccount = this.deleteSponsorAccount.bind(this);
    }
    componentDidMount(){
        this.props.getCurrentProfile(this.props.sponsor);
    }

    deleteRecipientAccount = () => dispatch => {
        Axios.delete('/api/users')
        .then(res => {
            this.props.setAuthFalse();
        })
    }

    deleteSponsorAccount(){
        Axios.delete('/api/sponsors')
        .then(res => {
            this.props.setAuthFalse();
        })
    }


    render() {

        let { profile, loading } = this.props.profile;
        let sponsor = this.props.sponsor;
        let profileContent;

        //This will be the profile picture
        //let pfp;

        if (profile === null || loading){
            //If there is no profile yet, put spinner in
            profileContent = <Spinner />
        } else if(this.props.isAuthenticated === false){
            return <Redirect to='/login'/>
        } else if(Object.keys(profile).length > 0){
            //If there is a profile put it in.
            profileContent = (
            <div>
                <Header 
                avatar={profile.avatar}
                handle={profile.handle}
                bio={profile.bio}
                location={profile.location}
                organization={profile.organization}
                sponsor={sponsor}
                />
                {sponsor ? <Information profile={profile}/> : <Credentials profile={profile}/>}
                <Social props={profile}/>
                {sponsor ? <button className='btn btn-lg btn-primary' onClick={this.deleteSponsorAccount}>Delete Profile and Account</button> : <button className='btn btn-lg btn-primary' onClick={this.deleteRecipientAccount}>Delete Profile and Account</button>}
            </div>
            )
        } else {
            //User is prompted to make profile
            profileContent = (
                <div>
                    <p className="lead text-muted">Welcome</p>
                    <p>You have not yet created a profile. Please use this link to create one.</p>
                    {this.props.sponsor ? <Link to='/create-sponsor-profile' className="btn btn-lg btn-info">Create profile</Link> : <Link to='/create-profile' className="btn btn-lg btn-info">Create profile</Link>}  
                </div>
            );
        }

        return (
            <div>
                {profileContent} 
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyChLzU35-UEy2scOcEffcDgG4ubtBxDA0s&libraries=places"></script>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated,
    sponsor: state.auth.user.user.sponsor
})

export default connect(mapStateToProps, { getCurrentProfile, setAuthFalse})(withRouter(Profile));
