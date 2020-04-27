import React, { Component } from 'react';
import {Link} from "react-router-dom";


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Link to='/profile' className="btn btn-lg btn-info">Your Profile</Link> 
            </div>
        )
    }
}
