import React, { Component } from 'react';
import DefaultPfp from './defaultpfp.png';

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={DefaultPfp} />
            </div>
        )
    }
}
