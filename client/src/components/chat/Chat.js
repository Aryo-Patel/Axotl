import React, { Component,  } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import Messages from './Messages';
import CreateChat from './CreateChat';
import Contact from './Contact';
import './styling/chat.css';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: openSocket(),
            messages: [],
            newMessage: '',
            currentChatId: '',
            currentChat: {},
            createNew: false
            

        }
        this.onChange = this.onChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onChoose = this.onChoose.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.updateEverything = this.updateEverything.bind(this);
        this.createNewChat = this.createNewChat.bind(this);
        this.setChatFalse = this.setChatFalse.bind(this);

        // this.state.socket.on('newMessage', (message) => {
        //     this.setState({
        //         messages: [...this.state.messages, message],
        //     })
        // });

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    showModal(e) {
        this.setState({
            show: true,
        })
    }

    hideModal(e) {
        this.setState({
            show: false,
        })
    }

    sendMessage = async (e) => {
        e.preventDefault();
        let name = this.props.user.name;
        let data = {
            user: this.props.user._id,
            name: name,
            message: this.state.newMessage,
        }
        console.log('Sending message with this id: ' + this.state.currentChatId)
        //Database update
        await axios.post(`/api/chat/messages/${this.state.currentChatId}`, data)
        //Socket update
        this.state.socket.emit('newMessage', (data));
        this.setState({
            newMessage: '',
        })
        this.getMessages();
    }
    //This will be for choosing the chat that we want to be interacting with
    onChoose(id) {
        this.setState({
            currentChatId: id,
            createNew: false
        })
        //Retrieving the chat by its ID
        axios.get(`/api/chat/${id}`)
            .then(res => {
                this.setState({
                    currentChat: res.data,
                    messages: res.data.messages,
                })
            })
    }
    //stand alone function to get messages and put into state, perhaps will link up to a 'refresh' button.
    getMessages() {
        axios.get(`/api/chat/${this.state.currentChatId}`)
            .then(res => {
                this.setState({
                    currentChat: res.data,
                    messages: res.data.messages,
                })
            })
    }

    readMessages() {
        axios.post(`/api/chat/${this.state.currentChatId}`)
    }

    updateEverything(){
        this.forceUpdate();
    }

    createNewChat(){
        this.setState({
            createNew: !this.state.createNew
        })
    }

    setChatFalse(){
        console.log('this func executing');
        this.setState({
            createNew: false
        })
    }

    render() {

        return (
            <div className="message-main">
                <div className="container">
                    <div className="header">
                        <h1>
                            Your Chat Messages
                        </h1>
                    </div>
                    {/* <CreateChat show={this.state.show} onHide={this.hideModal} updateEverything={this.updateEverything}/> */}
                    <div className="chatlogs">
                        <button onClick={this.createNewChat} className="btn button-newChat">+ Create a new chat</button>
                        <Contact onChoose={this.onChoose} onClick= {this.setChatFalse} yourID={this.props.user._id} sponsor={this.props.user.sponsor} />
                    </div>
                    <Messages yourID={this.props.user._id} onChange={this.onChange} onSubmit={this.sendMessage} messages={this.state.messages} newMessageValue={this.state.newMessage} newChat = {this.state.createNew} />
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