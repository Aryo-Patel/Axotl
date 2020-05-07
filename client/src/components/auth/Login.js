import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {sendLogin} from '../../actions/auth'
import {Redirect, Link} from 'react-router-dom'


//importing the css
import './authStyles/authstyles.css';
const Login = ({sendLogin, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const onChange = e => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const onSubmit = async e => {
        e.preventDefault();
        sendLogin(formData)
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <div className= "body">
                <div className = "login-container">
                    <form action="" className="form justify-content-center text-align-center align-center" onSubmit = {e => onSubmit(e)}>
                        <div className="form-group">
                            <input className = 'form-control' type="email" placeholder = 'Email Address' name = 'email' onChange = {e => onChange(e)} required value = {formData.email}/>
                        </div>
                        <div className="form-group">
                            <input className = 'form-control' type="password" placeholder = 'Password' name = 'password' onChange = {e => onChange(e)} value = {formData.password} required/>
                        </div>
                        <input type='submit' className="btn btn-large btn-primary" value="Login"></input>
                    </form>
                    <Link to = '/forgotpassword' className = 'btn btn-large btn-primary'>Forgot Password</Link>
                </div>
            </div>
            
        </Fragment>
    )
}

Login.propTypes = {
    sendLogin : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {sendLogin})(Login);
