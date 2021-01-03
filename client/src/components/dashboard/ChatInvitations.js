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

    reject = async(id) => {
        let res = await axios.post(`/api/chat/reject/${id}`)
        await this.props.loadUser();
        this.setState({
            chatInvites: []
        })
        this.loadChatInfo();
    }

    loadDisplay(){
        let output = this.state.chatInvites.map((invite) => {
            if(invite){
                return(
                    <div style={{position:"relative"}}>
                        <div style={{position:"absolute", whiteSpace:"nowrap", display: "inline-block", width: "100%"}} classkey={invite}>
                            <div style={{position: "relative", width: "30%", display: "inline-block", overflowX: "hidden"}}>
                                <strong><p style={{position: "relative", verticalAlign:"center", display: "inline-block"}}>{invite["name"]}</p></strong>
                            </div>
                            <i className="icons-yay fas fa-times action" onClick={() => this.accept(invite._id)}/>
                            <i className="icons-yay fas fa-check-square action" onClick={() => this.accept(invite._id)}/>
                            
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                )
            }
        })
        return output;
    }

    render() {
        
        //This will be the display for the invitations:
        let displayInvitations;

        //This will fill the displayInvitations variable.
        if(this.state.chatInvites.length > 0){
            displayInvitations = this.loadDisplay();
        }

        return (
            <div style={{position: "relative"}}>
                <p>Your current Chat Invitations: </p>
                {displayInvitations}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatInvites: state.auth.user.user.chatInvitations,
});

export default connect(mapStateToProps, {loadUser})(ChatInvitations)
