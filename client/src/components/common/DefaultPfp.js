import React, { Component } from 'react';
import DefaultPfp from './defaultpfp.png';

export default class DefaultPfp extends Component {
    render() {
        return (
            <div>
                <img src={DefaultPfp} />
            </div>
        )
    }
}
