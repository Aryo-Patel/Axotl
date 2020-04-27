import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logout} from '../../actions/auth';

class Logout extends Component {
    componentDidMount(){
        this.props.logout();
        console.log("Logging out...")
    }
    render() {
        return (
        <div>
            <Redirect to='/'/>
        </div>
        )
    }
}

export default connect(null, {logout})(Logout)

