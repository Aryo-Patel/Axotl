import React, { Component } from 'react';
import DefaultPfp from '../common/defaultpfp.png';

export default class Header extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <div class="media">
            <img class="mr-3" src={DefaultPfp} style={{width: '200px', position: "relative", textalign: "center"}} alt= ""/>
            <div class="media-body">
                <h5 class="mt-0"><strong>@{this.props.handle}</strong></h5>
                <p>{this.props.bio}</p>
                <p class="mt-0">Organization: {this.props.organization}</p> 
                <p class="mt-0">Location: {this.props.location}</p>
            </div>
        </div>
        )
    }
}
