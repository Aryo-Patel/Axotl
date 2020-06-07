import axios from 'axios'

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, RES_PASSWORD, REGISTER_SUCCESS, REGISTER_FAIL, USER_FAILED, USER_LOADED, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD, CHANGE_PASSWORD, EDIT_ACCOUNT, CLEAR_CHATLOG } from './Types'
import bcrypt from 'bcryptjs';

export const sendLogin = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/users/login', body, config)
        console.log(res.data)
        const payload = {
            user: res.data
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload
        })
    } catch (err) {
        console.error(err.message)
            //DISPATCH ALERTS FOR ERRORS
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const registerUser = (userData, history) => async(dispatch) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let body = JSON.stringify(userData);
    try {
        await axios.post('/api/users/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                registered: true
            }
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
        console.error(error.message);
    }
}

export const registerSponsor = (userData, history) => async(dispatch) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let body = JSON.stringify(userData);
    try {
        console.log('reached action');
        await axios.post('/api/sponsors/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                registered: true
            }
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
        console.error(error.message);
    }
}

export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth')
        const payload = {
            user: res.data
        }
        dispatch({
            type: USER_LOADED,
            payload
        })
    } catch (err) {
        dispatch({
            type: USER_FAILED
        })
        console.error(err.message);
    }
}

export const deleteRecipient = () => async dispatch => {
    try {
        await axios.delete('/api/users/')
        dispatch({
            type: ACCOUNT_DELETED
        })
    } catch (err) {
        console.error(err.message);
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.get('/api/users/logout')
        console.log('finished logging out the back end')
        dispatch({
            type: LOGOUT
        })
        dispatch({
            type: CLEAR_CHATLOG
        })
    } catch (err) {
        console.error(err.message);
    }
}

export const setAuthFalse = () => dispatch => {
    try {
        dispatch({
            type: LOGOUT
        })
    } catch (err) {
        console.error(err.message);
    }
}

export const forPass = (email, history) => async dispatch => {
    console.log('forpass hit')
    try {
        const res = await axios.get(`/api/auth/forgotpassword/${email}`)
        history.push('/email-sent')
        dispatch({
            type: FORGOT_PASSWORD
        })
    } catch (err) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL
        })
    }
}

export const resPass = (formData, jwt, history) => async dispatch => {
    console.log('respass hit')
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //CHECK PASSWORDS?
    const password = formData.pass1
    const body = JSON.stringify({ password })

    try {
        await axios.post(`/api/auth/resetpassword/${jwt}`, body, config)
        history.push('dashboard')
        dispatch({
            type: RES_PASSWORD
        })
    } catch (err) {
        console.log('did not work lmao')
    }
}

export const changePass = (formData, history) => async dispatch => {
    const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //CHECK PASSWORDS?

    const password = formData.currPass;
    const newPassword = formData.newPass;
    const body = JSON.stringify({ password, newPassword })

    try {
        await axios.post(`/api/auth/changepassword`, body, config)
        history.push('/dashboard')
        dispatch({
            type: CHANGE_PASSWORD
        })
    } catch (err) {
        console.log('did not work lmao')
    }
}

export const editAccount = (formData) => async dispatch => {
    console.log('I EXIST')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    Object.keys(formData).forEach(key => {
        console.log(formData[key])
    })
    const body = JSON.stringify(formData);
    console.log(body)
    try {
        console.log('editAccount trycatch hit')
        const res = await axios.post('/api/auth/edit', body, config);
        console.log(res)
        dispatch({
            type: EDIT_ACCOUNT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        //dispatch alert?
    }

}

export const deleteAccount = (sponsor) => async dispatch => {
    try {
        let res = null;
        if (sponsor) {
            res = await axios.delete('/api/sponsors');
        } else {
            res = await axios.delete('/api/users')
        }
        console.log(res);
        dispatch({
            type: ACCOUNT_DELETED
        })
    } catch (err) {
        console.error(err.message);
        //dispatch alert?
    }

}