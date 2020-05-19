import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import Messages from './Messages';
import CreateChat from './CreateChat';
import './styling/chat.css';

class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            socket: openSocket(),
            messages: [],
            newMessage: '',
        }
        this.onChange = this.onChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state.socket.on('newMessage', (message) => {
            this.setState({
                messages: [...this.state.messages, message],
            })
            console.log(this.state.messages);
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value, 
        })
    }

    showModal(e){
        this.setState({
            show: true,
        })
    }

    hideModal(e){
        this.setState({
            show: false,
        })
    }

    sendMessage(e){
        e.preventDefault();
        let name = this.props.user.name;
        let data = {
            name: name,
            message: this.state.newMessage,
        }
        this.state.socket.emit('newMessage', (data));
        this.setState({
            newMessage: '',
        })
    }

    render(){
        return (
            <div style={{padding:'10% 0 10%'}}>
                <div className="container">
                    <CreateChat show={this.state.show} onHide={this.hideModal}/>
                    <div className="first">
                        <button onClick={this.showModal} className="btn btn-primary">+ Create a new chat</button>
                    </div>
                    <Messages onChange={this.onChange} onSubmit={this.sendMessage} messages={this.state.messages} newMessageValue={this.state.newMessage}/>
                    <div className="clear">

                    </div>
                </div>
                </div>
        )
    }

}

let mapStateToProps = (state) => ({
    user: state.auth.user.user
})

export default connect(mapStateToProps, {})(Chat);