import React, { Component } from 'react';
import DefaultPfp from './sponsorDefault.png';

export default class DefaultSponsorPfp extends Component {
    render() {
        return (
            <div>
                <img src={DefaultPfp} />
            </div>
        )
    }
}
