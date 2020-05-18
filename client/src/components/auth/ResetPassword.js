import React, {useState, Fragment} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {resPass} from '../../actions/auth'
import {withRouter} from 'react-router-dom'

const ResetPassword = ({resPass}) => {
    const [formData, setFormData] = useState({
        pass1 : '',
        pass2 : ''
    })
    const url = window.location.href
    const jwt = url.substring(url.indexOf('d') + 2)
    

    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    return (
        <Fragment>
            <div className="resetPassword__background">
            <div className="resetPassword">
                <h3 className="heading">Reset Password</h3>
               <form action="" className="resetPassword__form" onSubmit = {e=> {
                   if(!(formData.pass1 === formData.pass2)) {
                       //alert checking
                   } else {
                   e.preventDefault()
                   resPass(formData, jwt)
                   setFormData({pass1 : '', pass2 : ''})
                   }
               }}>
                   <div className="resetPassword__group">
                       <input name = 'pass1' id='pass1' type="password" className="resetPassword__input" onChange = {e => onChange(e)} required/>
                       <label htmlFor="#pass1" className = 'resetPassword__label'>New Password</label>
                   </div>
                   <div className="resetPassword__group">
                       <input name = 'pass2' id='pass2' type="password" className="resetPassword__input" onChange = {e => onChange(e)} required/>
                       <label htmlFor="#pass2" className = 'resetPassword__label'>Confirm New Password</label>
                   </div>
                   <button type="submit" class = 'resetPassword__submit button'>Submit</button>
               </form>
               </div>
               </div>
        </Fragment>
    )
}

ResetPassword.propTypes = {

}

export default connect(null, {resPass})(withRouter(ResetPassword))
