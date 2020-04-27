import React, { Component } from 'react';
import DefaultPfp from '../common/defaultpfp.png';

export default class Header extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <div class="media">
            <img class="mr-3" src={DefaultPfp} style={{width: '200px'}} alt= ""/>
            <div class="media-body">
                <h5 class="mt-0">{this.props.handle}</h5>
                {this.props.bio}
                <h5>Location: {this.props.location}</h5>
                <h5>Organization: {this.props.organization}</h5> 
            </div>
        </div>
        )
    }
}
