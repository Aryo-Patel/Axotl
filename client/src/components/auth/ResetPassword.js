import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {resPass} from '../../actions/auth'

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
               <form action="" className="form" onSubmit = {e=> {
                   if(!(formData.pass1 == formData.pass2)) {
                       //alert checking
                   } else {
                   e.preventDefault()
                   resPass(formData, jwt)
                   setFormData({pass1 : '', pass2 : ''})
                   }
               }}>
                   <div className="form-group">
                       <input name = 'pass1' type="password" className="form-control" placeholder = 'Password' onChange = {e => onChange(e)}/>
                   </div>
                   <div className="form-group">
                       <input name = 'pass2' type="password" className="form-control" placeholder = 'Confirm Password' onChange = {e => onChange(e)}/>
                   </div>
                   <button type="submit" class = 'btn btn-large btn-primary'>Submit</button>
               </form>
        </Fragment>
    )
}

ResetPassword.propTypes = {

}

export default connect(null, {resPass})(ResetPassword)
