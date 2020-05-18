import axios from 'axios';
import { GET_SPONSORS, GET_RECIPIENTS, SET_LOADING } from './Types';


export const getRecipients = (handle) => dispatch => {
    dispatch({type: SET_LOADING})
    axios.get('/api/profiles/users/find', handle)
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
}

export const getSponsors = (handle) => dispatch => {
    dispatch({type: SET_LOADING})
    axios.get('/api/profiles/users/find', handle)
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
}
