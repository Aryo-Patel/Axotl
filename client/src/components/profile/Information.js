/*
    This will be the equivalent of the recipient's credentials page but this will be for the sponsor info
    This will include things such as donation types, contact information, etc. 
    TODO: Expand upon what goes into this page.
*/

import React, { Component } from 'react';

class Information extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let donationTypes = this.props.profile.donationTypes;
        
        let donationList = donationTypes.map(type => {
            return (
                <li><strong>{type}</strong></li>
            )
        })
        return (
            <div>
                <ul>
                    {donationList}
                </ul>
            </div>
        )
    }
}

export default Information;



