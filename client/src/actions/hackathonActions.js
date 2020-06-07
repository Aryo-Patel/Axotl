import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL,
    CREATE_HACKATHON,
    CREATE_HACKATHON_FAIL,
    GET_HACKATHON,
    GET_USER_HACKATHONS,
    GET_USER_HACKATHONS_FAIL,
    USER_LOADED,
    HACKATHON_DELETED
} from './Types';

import axios from 'axios';

//Return all the hackathons
export const getHackathons = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //gets the hackathons from the appropriate route in the server end
        let hackathons = await axios.get('/api/hackathons', null, config);

        dispatch({
            type: GET_HACKATHONS,
            payload: hackathons.data
        })
    } catch (err) {
        dispatch({
            type: GET_HACKATHONS_FAIL,
            payload: {}
        })
        console.log(err);
    }
}

//Create a hackathon
export const createHackathon = (hackathonData) => async dispatch => {
    try {
        const body = hackathonData;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = axios.post('/api/hackathons/create', body, config);


        dispatch({
            type: CREATE_HACKATHON,
            payload: res.data.newHackathon
        })
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })

    } catch (err) {
        console.error(err);
        dispatch({
            type: CREATE_HACKATHON_FAIL,
            payload: {}
        })
    }
}

//get one hackathon's profile for display
export const getHackathon = (id) => async dispatch => {
    try {
        //5ec034aab98fe24fe80b5904

        const res = await axios.get(`/api/hackathons/hackathon/${id}`)
        dispatch({
            type: GET_HACKATHON,
            payload: res.data[0]
        })
    } catch (err) {
        dispatch({
            type: CREATE_HACKATHON_FAIL,
        })
    }
}


//get all hackathons a user has created
export const getUserHackathons = () => async dispatch => {
    try {
        let res = await axios.get(`/api/hackathons/my-hackathons`);
        dispatch({
            type: GET_USER_HACKATHONS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_USER_HACKATHONS_FAIL
        })
    }
}

//remove a hackathon
export const deleteHackathon = hackathonId => async dispatch => {
    try {
        const res = await axios.delete(`/api/hackathons/delete-hackathon/${hackathonId}`)
        dispatch({
            type: HACKATHON_DELETED,
            payload: { hackathonId }
        })
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
        })
    } catch (err) {
        console.error(err);
        //dispatch??
    }
}

export const editHackathon = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put(`/api/hackathons/edit-hackathon/${id}`, body, config)
    } catch (err) {
        //dispatch?
        console.error(err)
    }
}