import React, {useEffect} from 'react'

import {Link} from 'react-router-dom'
import axios from 'axios'

const ConfirmEmailSponsor = props => {
    useEffect(() => {
        
        const url = window.location.href
    const jwt = url.substring(url.indexOf('l/') + 2)
    console.log(jwt)
        axios.put(`/api/sponsors/confirmemail/${jwt}`)
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



export default ConfirmEmailSponsor
