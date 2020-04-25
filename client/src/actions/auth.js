import axios from 'axios'

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, RES_PASSWORD } from './types'

export const sendLogin = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)
    try {
        const res = axios.post('/api/login', formData, config)
        const payload = {
            user: res.data,
            sponsor: res.data.sponsor
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload
        })
    } catch (err) {
        const errors = err.response.data.errors
            //DISPATCH ALERTS FOR ERRORS
        dispatch({
            type: LOGIN_FAIL
        })
    }
}