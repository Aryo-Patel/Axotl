import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ChatInvitations extends Component {
    constructor(props){
        super(props)

        this.getChatInformation = this.getChatInformation.bind(this);
        this.accept = this.accept.bind(this);
    }

    getChatInformation = async(id) => {
        await axios.get(`/api/chat/invite/${id}`)
        .then(res => {
            return res.data;
        })
    }

    accept(id){
        axios.post(`/api/chat/accept/${id}`)
    }

    render() {
        let {chatInvites} = this.props;

        //This will be the display for the invitations:
        let displayInvitations;

        //This will fill the displayInvitations variable.
        if(chatInvites.length > 0){
            displayInvitations = chatInvites.map((invite) => {
                let chatInfo = this.getChatInformation(invite);
                return (
                    <div key={invite}>
                        <h5>{chatInfo.name}</h5>
                        <button className="button" onClick={() => this.accept(invite)}>Accept Invite</button>
                    </div>
                )
            })
        }

        return (
            <div>
                {displayInvitations}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatInvites: state.auth.user.user.chatInvitations,
});

export default connect(mapStateToProps, {})(ChatInvitations)
