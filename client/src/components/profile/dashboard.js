import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/ProfileActions';


class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    render() {
        let { profile, loading } = this.props.profile;

        let dashboardContent

        if (profile === null || loading){
            dashboardContent = <p>Loading...</p>
        }   

        return (
            <div>
                {dashboardContent} 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Dashboard));
