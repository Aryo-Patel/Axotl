import React from 'react'
import PropTypes from 'prop-types'

const EmailSent = props => {
    return (
        <div className = 'emailSent'>
            <h3 className="heading">Email Successfully Sent</h3>
            <p className="subheading">Check your email for the link to reset your password</p>
        </div>
    )
}

EmailSent.propTypes = {

}

export default EmailSent
