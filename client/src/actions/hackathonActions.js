import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL,
    CREATE_HACKATHON,
    CREATE_HACKATHON_FAIL,
    GET_HACKATHON,
    GET_USER_HACKATHONS,
    GET_USER_HACKATHONS_FAIL,
    USER_LOADED,
    HACKATHON_DELETED,
    HACKATHON_EDITED,
    GET_HACKATHONS_LOCATIONS
} from './Types';

import axios from 'axios';

//Return all the hackathons
export const getHackathons = (pageNumber) => async dispatch => {
    try {

        console.log(pageNumber)
            //gets the hackathons from the appropriate route in the server end
        let hackathons = await axios.get(`/api/hackathons/${pageNumber}`);
        console.log(hackathons.data.hackathons)
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
export const getUserHackathons = (pageNumber) => async dispatch => {
    try {
        console.log(pageNumber)
        let res = await axios.get(`/api/hackathons/my-hackathons/${pageNumber}`);
        console.log(res.data)
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
export const deleteHackathon = (hackathonId) => async dispatch => {
    try {
        console.log('also here bruh')
        const res = await axios.delete(`/api/hackathons/delete-hackathon/${hackathonId}`)
        console.log('hello sir')
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

//edit a hackathon (except donations)
export const editHackathon = (formData, id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put(`/api/hackathons/edit-general/${id}`, body, config)
        console.log(res);
        dispatch({
            type: HACKATHON_EDITED,
            payload: res.data
        })
    } catch (err) {
        //dispatch?
        console.error(err)
    }
}

//get the distances from the current user for each hackathon
export const getHackathonLocations = (pageNumber) => async dispatch => {
    try {
        console.log('doin something')
        const res = await axios.get(`/api/hackathons/search/locations/${pageNumber}`);
        console.log(res.data)
        dispatch({
            type: GET_HACKATHONS_LOCATIONS,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        //don't dispatch anything because hopefully this will be replaced by the non-location get when it fails
    }
}