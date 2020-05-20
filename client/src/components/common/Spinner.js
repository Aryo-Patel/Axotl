import React, { Component } from 'react';
import AxotlSpinner from './AxotlSpinner.gif';

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={AxotlSpinner} alt = "Loading..." style={this.props.styling ? this.props.styling : {margin: 'auto', display: 'block'}} />
            </div>
        )
    }
}
