import React, { Component } from 'react';
import './styling/chat.css';
import {getChatLogs} from '../../actions/chat';
import { connect } from 'react-redux'


//This is the component that will render the group chats along the left side of the screen
//that the user is a part of.
class Contact extends Component {
    // constructor(props){
    //     super(props)
    //     this.state =
    //     }
    // }

    onHover(e){
        this.setState({})
    }

    componentDidMount(){
        this.props.getChatLogs();
    }

    render() {
        //This will render all the chat logs.
        let chatlogs;
        if(this.props.chatlogs != null){
            chatlogs = this.props.chatlogs.map(item => {
                return(
                <div className='chat-tab'>
                    <h5>{item.name}</h5> 
                </div>
                )
            })
        }
        return (
            <div>
                {chatlogs}
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    chatlogs: state.chat.chatlogs,
})


export default connect(mapStateToProps, {getChatLogs})(Contact);
