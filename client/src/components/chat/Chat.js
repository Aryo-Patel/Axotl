import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import './styling/chat.css'

class Chat extends Component {
    componentDidMount(){
        this.state = {
            socket: openSocket(),
            chat: []
        }
    }
    render(){
        return (
            <div style={{padding:'10% 0 10%'}}>
            <div className="header"></div>
                <div className="container">
                    <div className="first">

                    </div>
                    <div className="second">
                        
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        )
    }

}

let mapStateToProps = (state) => {
}

export default connect(mapStateToProps, {})(Chat);