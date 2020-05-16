import React, { Component } from 'react';
import './styling/chat.css';

class Contact extends Component {
    constructor(props){
        super(props)

    }

    render() {
        let chatlogs = this.props.chatlogs.map(contact => (
            <div>{contact.name}</div>
        ))
        return (
            <div className="first">
                {chatlogs}
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    user: state.auth.user.user,
})


export default connect(mapStateToProps, {})(Contact);
