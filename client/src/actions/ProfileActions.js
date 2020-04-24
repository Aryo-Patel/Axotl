import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING} from './Types';

//This will get the profile of the current user.
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/api/profiles/recipient/me')
    .then(res => {
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    //If no profile is found then we'll just have a payload of an empty object
    .catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {},
        })
    })
};

//Creating a profile for the current user
//Will take in two parameters as indicated in function
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profiles/recipient/', profileData)
    .then(res => {
        console.log("Profile Created!")
        //TODO: Just make this link to the dashboard after creation.
    })
};s

const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    }
};