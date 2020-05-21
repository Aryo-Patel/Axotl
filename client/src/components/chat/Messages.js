import React, { Component } from 'react';
import './styling/chat.css';
import axios from 'axios';

export default class Messages extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let displayMessages = this.props.messages.map(item => 
            <div>
                <h5><strong>{item.name}:</strong></h5>
                <p>{item.message}</p>
            </div>
        )
        return (
            <div>
                <div className="second">
                    <div>
                        {displayMessages}
                    </div>
                    
                </div>
                <form className="text-field" onSubmit={this.props.onSubmit}>
                        <input type="text" onChange={this.props.onChange} value={this.props.newMessageValue} name="newMessage"/>   
                        <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
