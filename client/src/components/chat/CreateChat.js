import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipients, getSponsors, getChatLogs } from '../../actions/chat';
import TextField from '../layout/TextField';
import "./styling/chat.css";
import axios from 'axios';

class CreateChat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chatName: '',
            sponsorSearch: '',
            recipientSearch: '',
            recipients: [],
            sponsors: [],
        }

        this.onChange = this.onChange.bind(this);
        this.searchRecipient = this.searchRecipient.bind(this);
        this.searchSponsor = this.searchSponsor.bind(this);
        this.fullSponsorSearchFunction = this.fullSponsorSearchFunction.bind(this);
        this.fullRecipientSearchFunction = this.fullRecipientSearchFunction.bind(this);
        this.confirmRecipient = this.confirmRecipient.bind(this);
        this.confirmSponsor = this.confirmSponsor.bind(this);
        this.confirmFinal = this.confirmFinal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setCurrentUserParticipant = this.setCurrentUserParticipant.bind(this);
    }

    componentDidMount() {
        this.setCurrentUserParticipant();
    }

    setCurrentUserParticipant() {
        if (this.props.user.sponsor) {
            this.state.sponsors.push(this.props.user)
        }
        if (!this.props.user.sponsor) {
            this.state.recipients.push(this.props.user)
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchRecipient(e) {
        e.preventDefault();
        let data = {
            handle: this.state.recipientSearch,
        }
        let body = JSON.stringify(data);
        this.props.getRecipients(body);

    }

    searchSponsor(e) {
        e.preventDefault();
        let data = {
            handle: this.state.sponsorSearch,
        }
        let body = JSON.stringify(data)
        console.log(body);
        this.props.getSponsors(body);

    }

    async fullRecipientSearchFunction(e) {
        await this.onChange(e);
        this.searchRecipient(e);
    }

    async fullSponsorSearchFunction(e) {
        await this.onChange(e);
        this.searchSponsor(e);
    }


    confirmRecipient(e) {
        //Will push the recipient object to our member array if it is not a repeat
        let repeat;
        this.state.recipients.forEach((item) => {
            if (item._id === this.props.recipient._id) {
                repeat = true;
            }
        })
        if (!repeat) {
            this.state.recipients.push(this.props.recipient);
        }

        this.setState({
            recipientSearch: '',
        })
    }

    confirmSponsor(e) {
        //Will push the sponsor object to our member array if it is not a repeat
        let repeat;
        this.state.sponsors.forEach((item) => {
            if (item._id === this.props.sponsor._id) {
                repeat = true;
            }
        })
        if (!repeat) {
            this.state.sponsors.push(this.props.sponsor);
        }

        this.setState({
            sponsorSearch: '',
        })
    }

    confirmFinal(e) {
        // let recipientInfo = this.state.recipients.map((item) => {
        //     return {
        //         userID: item,
        //         numUnread: 0,
        //     }
        // })
        // let sponsorInfo = this.state.sponsors.map((item) => {
        //     return {
        //         userID: item,
        //         numUnread: 0,
        //     }
        // })


        /*
        recipients: {
            _id,
            name, 
            avatar
        }
        */
        let info = {
            name: this.state.chatName,
            recipients: this.state.recipients,
            sponsors: this.state.sponsors,
            messages: [],
        }
        
        axios.post('api/chat/create', info)

        this.closeModal();

        this.props.getChatLogs();
    }

    closeModal(e) {
        this.setState({
            chatName: '',
            recipients: [],
            sponsors: [],
            sponsorSearch: '',
            recipientSearch: '',
        })
        //this.props.onHide()
    }

    render() {
        //This will be the choice that is loaded from redux
        let recipientChoice = this.props.recipient;
        //This will be the choice that is loaded from redux
        let sponsorChoice = this.props.sponsor;
        //Loading also determined from redux
        let loading = this.props.loading;
        //This will be the list of recipients currently added
        let recipients = this.state.recipients;
        //This will be the list of sponsors currently added
        let sponsors = this.state.sponsors;
        //This is for the modal to show vs not show.
        const showHideClassName = this.props.show ? "display-block" : "display-none";

        //This will handle the recipient searching and the output associated with certain searches.
        let searchOutputR;
        if (recipientChoice === null || this.state.recipientSearch === '') {
            searchOutputR = <div></div>
        } else if (loading) {
            searchOutputR = <p>Searching...</p>
        } else if (recipientChoice.error != null) {
            searchOutputR = <p>User with that handle not found</p>
        } else if (recipientChoice.name != null) {
            searchOutputR = (
                <div>
                    <p>Were you looking for this user?</p>
                    <div><img className="profile-pic" src={recipientChoice.avatar}></img><p>{recipientChoice.name}</p></div>
                    <button type="submit" className="btn btn-primary" onClick={this.confirmRecipient}>Confirm Add</button>
                </div>
            )
        }

        let searchOutputS;
        if (sponsorChoice === null || this.state.sponsorSearch === '') {
            searchOutputS = <div></div>
        } else if (loading) {
            searchOutputS = <p>Searching...</p>
        } else if (sponsorChoice.error != null) {
            searchOutputS = <p>User with that handle not found</p>
        } else if (sponsorChoice.name != null) {
            searchOutputS = (
                <div>
                    <p>Were you looking for this user?</p>
                    <div><img className="profile-pic" src={sponsorChoice.avatar}></img><p>{sponsorChoice.name}</p></div>
                    <button type="submit" className="btn btn-primary" onClick={this.confirmSponsor}>Confirm Add</button>
                </div>
            )
        }

        //This will show the users what their current chat recipient list is:
        let recipientList = recipients.map((member) => {
            return (
                <div>
                    <div><img className="profile-pic" src={member.avatar}></img><p>{member.name}</p></div>
                </div>
            )
        })
        //This will show the users what their current chat recipient list is:
        let sponsorList = sponsors.map((member) => {
            return (
                <div>
                    <div><img className="profile-pic" src={member.avatar}></img><p>{member.name}</p></div>
                </div>
            )
        })

        return (
            <div className="center">
                <div>
                    <div className='create_main'>
                        <div className = "side-wrappers">

                        
                        <div className = "LHS">

                        
                        <TextField
                            type='text'
                            parentClassName = 'createChat'
                            placeholder="Name your chat!"
                            name='chatName'
                            value={this.state.chatName}
                            onChange={this.onChange}
                            className='input'
                            required = {true}
                        />
                        <div className = "bottom-spacer">

                        </div>
                        <form onSubmit={this.searchRecipient}>
                            <TextField
                                type='text'
                                placeholder="Search for a RECIPIENT"
                                name='recipientSearch'
                                value={this.state.recipientSearch}
                                onChange={this.fullRecipientSearchFunction}
                                className='input'
                                required = {true}
                                parentClassName = 'createChat'
                            />
                            <div className = "bottom-spacer">
                                {searchOutputR}
                            </div>
                        </form>
                        <form onSubmit={this.searchSponsor}>
                            <TextField
                                type='text'
                                placeholder="Search for a SPONSOR"
                                name='sponsorSearch'
                                value={this.state.sponsorSearch}
                                onChange={this.fullSponsorSearchFunction}
                                className='input'
                                required ={true}
                                parentClassName = 'createChat'
                            />
                            <div className = "bottom-spacer">
                                {searchOutputS}
                            </div>
                        </form>
                        <br></br>
                        </div>
                        <div className = "RHS">
                            <h5>Member List:</h5>
                            {recipientList}
                            {sponsorList}
                        </div>
                        </div>
                        <br></br>
                        <div class = "submit-chat-center">
                            <button type="submit" onClick={this.confirmFinal} className="submit-chat btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user.user,
    recipient: state.chat.recipients,
    sponsor: state.chat.sponsors,
    loading: state.chat.loading,
})

export default connect(mapStateToProps, { getRecipients, getSponsors, getChatLogs })(CreateChat);
