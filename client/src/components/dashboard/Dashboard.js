import React, { Component } from 'react';
import {Link} from "react-router-dom";


//import in the hackathon modal
import CreateHackathonModal from '../hackathons/CreateHackathonModal';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    state = {modalDisplay: false};
    showModal = () => {
        this.setState({modalDisplay: true})
    }
    hideModal = () => {
        this.setState({modalDisplay: false})
    }
    render() {
        return (
            <div className="container" style={{textAlign:"center"}}>
                <button className = "btn btn-md btn-info" onClick = {e => this.showModal()}>Create a hackathon</button>
                <CreateHackathonModal show = {this.state.modalDisplay} handleClose = {this.hideModal} />
                <br></br>
                <br></br>
                <Link to='/profile' className="btn btn-lg btn-info">Your Profile</Link> 
            </div>
        )
    }
}
