import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/ProfileActions';
import {Redirect} from 'react-router-dom'
import Header from './Header';
import Spinner from '../common/Spinner';
import Credentials from './Credentials';

class Profile extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render() {

        let { profile, loading } = this.props.profile;

        let profileContent;

        //This will be the profile picture
        // let pfp;

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
                />
                <Credentials profile={profile}/>
            </div>
            )
        } else {
            //User is prompted to make profile
            profileContent = (
                <div>
                    <p className="lead text-muted">Welcome</p>
                    <p>You have not yet created a profile. Please use this link to create one.</p>
                    <Link to='/create-profile' className="btn btn-lg btn-info">Create profile</Link>  
                </div>
            );
        }

        return (
            <div>
                {profileContent} 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Profile));
