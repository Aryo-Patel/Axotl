import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';

const ENDPOINT = "http://localhost:6969";

class Chat extends Component {
    componentDidMount(){
        this.state = {
            socket: openSocket(ENDPOINT),
        }
    }
    render(){
        return (
            <div style={{padding: '10% 0% 10%'}}className='container'>
                <h3>This is the chat page.</h3>
            </div>
        )
    }

}

let mapStateToProps = (state) => {

}

export default connect(mapStateToProps, {})(Chat);