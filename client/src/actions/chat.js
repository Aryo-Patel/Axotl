import axios from 'axios';
import { GET_SPONSORS, GET_RECIPIENTS, SET_LOADING } from './Types';


export const getRecipients = (data) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    dispatch({type: SET_LOADING})
    axios.post('/api/users/find', data, config)
    .then(res => {
        dispatch({
            type: GET_RECIPIENTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_RECIPIENTS,
            payload: err
        })
    })
}

export const getSponsors = (data) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log("Second: " + data);
    dispatch({type: SET_LOADING})
    axios.post('/api/sponsors/find', data, config)
    .then(res => {
        dispatch({
            type: GET_SPONSORS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SPONSORS,
            payload: err
        })
    })
}
