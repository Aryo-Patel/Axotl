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
        history.push('/profile')
    })
};

//Edit a profile for the current user
export const editProfile = (profileData, history) => dispatch => {
    axios.post('/api/profiles/recipient/', profileData)
    .then(res => {
        console.log("Profile updated!");
        history.push('/profile');
    })
}

//This will be used to add education to the user's profile.
export const addEducation = (educationData, history) => {
    axios.post('/api/profiles/recipient/education', educationData)
    .then(res => {
        console.log("Education added!")
        history.push('/profile')
    })
}

//This will be used to add experience
export const addExperience = (experienceData, history) => {
    axios.post('/api/profiles/recipient/experience', experienceData)
    .then(res => {
        console.log("Experience added!")
        history.push('/profile')
    })
    .catch(err => console.log(err));
}

//This will be used to add a previous hackathon
export const addPreviousHackathon = (hackathonData, history) => {
    axios.post('/api/profiles/recipient/previous-hackathons', hackathonData)
    .then(res => {
        console.log("Hackathon added!")
        history.push('/profile')
    })
    .catch(err => console.log(err));
}

//This will be used to delete an education object
export const deleteEducation = (id) => {
    axios.delete(`/api/profiles/recipient/education/${id}`)
    .then(res => {
        console.log("Education deleted!")
    })
    .catch(err => console.log(err));
}

//This will be used to delete an experience
export const deleteExperience = (id) => {
    axios.delete(`/api/profiles/recipient/experience/${id}`)
    .then(res => {
        console.log("Experience deleted!")
    })
    .catch(err => console.log(err));
}

//This will be used to delete a previous hackahton
export const deletePreviousHackathon = (id) => {
    axios.delete(`/api/profiles/recipient/previous-hackathons/${id}`)
    .then(res => {
        console.log("Hackathon deleted!")
    })
    .catch(err => console.log(err));
}

const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    }
};