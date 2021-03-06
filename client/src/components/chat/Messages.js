import React, { Component, Fragment } from 'react';
import './styling/chat.css';
import CreateChat from './CreateChat';
//import EditChat from './EditChat';
import Moment from 'react-moment';
import axios from 'axios';

export default class Messages extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     edit = this.props.edit,
        // }

        //this.goEditPage = this.goEditPage.bind(this);
        //this.setState = this.setState.bind(this);
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        if(!this.props.newChat) {
            this.newestMessages.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // goEditPage = () => {
    //     this.setState({
    //         edit: 0,
    //     })
    //     console.log("set to true");
    //     console.log(this.state.edit);
    // }

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
        if(this.props.newChat){
            return (
                <div className = "message-container">
                    <CreateChat />
                </div>
            )
        } 
        // else if (this.state.edit == 0){
        //     return (
        //         <div className="message-container">
        //             <EditChat />
        //         </div>
        //     )
        // }
        else {
            return (
                <div>
                    <div className="message-container">
                        {
                        //<i onClick={this.goEditPage} className="settings-button fas fa-users-cog"></i>
                        }
                        <h1 className="chat-banner">{this.props.currentChat.name}</h1>
                        <div>
                            {displayMessages}
                            <div ref={(el) => { this.newestMessages = el }}></div>
                        </div>
                    </div>
                    <div className="chat-div">
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
}
