import React, { Component } from 'react';
import AxotlSpinner from './AxotlSpinner.gif';

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={AxotlSpinner} alt = "Loading..." style={{margin: 'auto', display: 'block'}} />
            </div>
        )
    }
}
