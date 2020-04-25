import axios from 'axios'

import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, RES_PASSWORD, REGISTER_SUCCESS, REGISTER_FAIL } from './Types'

export const sendLogin = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/users/login', body, config)
        const payload = {
            user: res.data,
            sponsor: res.data.sponsor
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

        let res = await axios.post('/api/users/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                registered: true
            }
        })

    } catch (error) {

        console.error(error.message);

    }

}