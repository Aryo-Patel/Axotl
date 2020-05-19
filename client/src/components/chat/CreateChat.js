import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipients, getSponsors } from '../../actions/chat';
import TextField from '../layout/TextField';
import "./styling/chat.css";

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
        e.preventDefault();
        let data = {
            handle: this.state.recipientSearch,
        }
        let body = JSON.stringify(data);
        this.props.getRecipients(body);

    }

    searchSponsor(e){
        e.preventDefault();
        let data = {
            handle: this.state.sponsorSearch,
        }
        let body = JSON.stringify(data)
        console.log(body);
        this.props.getSponsors(body);

    }

    // confirmRecipient(e){

    // }

    // confirmSponsor(e){

    // }

    // confirmFinal(e){

    // }

    render() {
        let recipientChoice;
        let sponsorsChoice;
        let memberList = this.state.members;
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className="center">
            <div className={showHideClassName}>
                <div className='modal-main'>
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
                <br></br>
                <button type="submit" onClick={this.props.onHide} className="btn btn-secondary">Close</button>
                <button type="submit" onClick={this.confirmFinal} className="btn btn-primary">Submit</button>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipient: state.chat.recipients,
    sponsor: state.chat.sponsors,
    loading: state.chat.loading,
})

export default connect(mapStateToProps, {getRecipients, getSponsors})(CreateChat);
