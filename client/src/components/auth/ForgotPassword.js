import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {forPass} from '../../actions/auth'

const ForgotPassword = ({forPass}) => {
    const [email, setEmail] = useState({
        email : ''
    })
    return (
        <Fragment>
               <form action="" className="form" onSubmit = {e=> {
                   e.preventDefault()
                   forPass(email)
                    setEmail('')
               }}>
                   <div className="form-group">
                       <input type="email" className="form-control" placeholder = 'Email Address' onChange = {e => setEmail(e.target.value)}/>
                   </div>
                   <button type="submit" className = 'btn btn-large btn-primary'>Submit</button>
               </form>
        </Fragment>
    )
}

ForgotPassword.propTypes = {
    forPass : PropTypes.func.isRequired,
}

export default connect(null, {forPass})(ForgotPassword)
