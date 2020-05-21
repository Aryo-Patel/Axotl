import React, {useEffect} from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios';

const ConfirmEmailRecipient = props => {
    useEffect(() => {
        const url = window.location.href
    const jwt = url.substring(url.indexOf('l/') + 2)
    console.log(jwt)
        axios.put(`/api/users/confirmemail/${jwt}`)
    }, [])
    return (
        <div className = 'confirmEmail'>
            <div className = 'confirmContents'>
            <h3>Your email has been confirmed!</h3>
            <Link to = '/login' className = 'btn btn-large btn-primary'>Click Here to Log In</Link>
            </div>
        </div>
    )
}


export default ConfirmEmailRecipient
