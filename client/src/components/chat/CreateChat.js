import React, { Component } from 'react';
import connect from 'connect-mongodb-session';
import { getRecipients, getSponsors } from '../../actions/chat';
import TextField from '../layout/TextField';

class CreateChat extends Component {
    constructor(props){
        super(props)

        this.state = {
            sponsorSearch: '',
            recipientSearch: '',
            members: [],
        }

        this.onChange = this.onChange.bind(this);
        this.searchRecipient = this.searchRecipient.bind(this);
        this.searchSponsor = this.searchSponsor.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchRecipient(e){
        e.preventDefault;
        let recipient = this.getRecipients(this.state.recipientSearch);

    }

    searchSponsor(e){
        e.preventDefault;
        let sponsor = this.getSponsors(this.state.sponsorSearch);

    }

    confirmRecipient(e){

    }

    confirmSponsor(e){

    }

    confirmFinal(e){

    }

    render() {
        let recipientChoice;
        let sponsorsChoice;
        let memberList = this.state.members,

        return (
            <div>
                <form onSubmit={this.searchRecipient}>
                    <TextField 
                        type='text'
                        placeholder="Search for a RECIPIENT by handle to add to your chat"
                        name='recipientSearch'
                        value={this.state.recipientSearch}
                        onChange={this.onChange}
                    />
                    <button type="submit" className="btn btn-primary">Confirm Add</button>
                </form> 
                <form onSubmit={this.searchSponsor}>
                    <TextField 
                        type='text'
                        placeholder="Search for a SPONSOR by handle to add to your chat"
                        name='sponsorSearch'
                        value={this.state.sponsorSearch}
                        onChange={this.onChange}
                    />
                    <button type="submit" className="btn btn-primary">Confirm Add</button>
                </form> 
                <form onSubmit={this.confirmFinal}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipient: state.chat.chat.recipients,
    sponsor: state.chat.chat.sponsors,
    loading: state.chat.chat.loading,
})

export default connect(mapStateToProps, {getRecipients, getSponsors})(CreateChat);
