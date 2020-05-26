import React, { Component } from 'react';
import './styling/chat.css';
import Moment from 'react-moment';
import axios from 'axios';

export default class Messages extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        this.newestMessages.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        let displayMessages = this.props.messages.map(item =>
            <div>
                <div className={item.user.toString() === this.props.yourID.toString() ? "your-message" : "they-message"}>
                    <div className="message-contents">
                        <div>{item.user.toString() === this.props.yourID.toString() ? <p><big>You:</big></p> : <p><big>{item.name}:</big></p>}</div>
                        <p><b>{item.message}</b></p>
                        <p><small>(<Moment format="HH:mm DD/MM/YY">{item.date}</Moment>)</small></p>
                    </div>
                </div>
                <br></br>
            </div>
        )
        return (
            <div>
                <div className="message-container">
                    <div>
                        {displayMessages}
                        <div ref={(el) => { this.newestMessages = el }}></div>
                    </div>
                    <form onSubmit={this.props.onSubmit}>
                        <div className="chat-form">
                        <input className="text-field" type="text" onChange={this.props.onChange} value={this.props.newMessageValue} name="newMessage" />
                        <button className="button-send" type="submit">Send</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
