/*
    This will be the equivalent of the recipient's credentials page but this will be for the sponsor info
    This will include things such as donation types, contact information, etc. 
    TODO: Expand upon what goes into this page.
*/

import React, { Component } from 'react';

class Information extends Component {
    render() {
        let donationTypes = this.props.profile.donationTypes;
        
        let donationList = Object.keys(donationTypes).map(function(key, index) {
            if(donationTypes[key] === true){
                return <li>{key}</li>
            }
          });

        return (
            <div>
                <h5>Donation Types:</h5> 
                <ul>
                    {donationList}
                </ul>
            </div>
        )
    }
}

export default Information;



