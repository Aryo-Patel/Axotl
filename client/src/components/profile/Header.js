import React, { Component } from 'react'

export default class Header extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
        <div class="media">
            <img class="mr-3" src={this.props.avatar} alt="Profile Picture" />
            <div class="media-body">
                <h5 class="mt-0">{this.props.handle}</h5>
                {this.props.bio}
                <h5>Location: {this.props.location}</h5>
            </div>
        </div>
        )
    }
}
