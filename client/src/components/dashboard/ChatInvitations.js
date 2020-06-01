import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {loadUser} from '../../actions/auth';

class ChatInvitations extends Component {
    constructor(props){
        super(props)

        this.state = {
            chatInvites: [],
        }
        this.getChatInformation = this.getChatInformation.bind(this);
        this.accept = this.accept.bind(this);
    }

    componentDidMount(){
        this.loadChatInfo();
    }

    loadChatInfo(){
        this.props.chatInvites.map((invite) => {
            this.getChatInformation(invite)
        })
    }

    getChatInformation = async(id) => {
        let response = await axios.get(`/api/chat/invite/${id}`)
        let data = await response.data;
        this.setState({
            chatInvites: [...this.state.chatInvites, data]
        })
    }

    accept = async(id) => {
        let res = await axios.post(`/api/chat/accept/${id}`)
        await this.props.loadUser();
        this.setState({
            chatInvites: [],
        })
        this.loadChatInfo();
    }

    render() {
        
        //This will be the display for the invitations:
        let displayInvitations;

        //This will fill the displayInvitations variable.
        if(this.state.chatInvites.length > 0){
            displayInvitations = this.state.chatInvites.map((invite) => {
                return (
                    <div key={invite}>
                        <h5>{invite["name"]}</h5>
                        <button className="button" onClick={() => this.accept(invite._id)}>Accept Invite</button>
                    </div>
                )
            })
        }

        return (
            <div>
                <br>
                </br>
                <h5>Your current Chat Invitations: </h5>
                {displayInvitations}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatInvites: state.auth.user.user.chatInvitations,
});

export default connect(mapStateToProps, {loadUser})(ChatInvitations)
