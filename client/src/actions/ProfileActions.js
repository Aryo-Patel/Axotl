import axios from 'axios';
//GET_PROFILES
import { GET_PROFILE,  PROFILE_LOADING} from './Types';

//This will get the profile of the current user.
export const getCurrentProfile = (sponsor) => dispatch => {
    dispatch(setProfileLoading())
    if (sponsor === false){
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
    } else if (sponsor === true){
        axios.get('/api/profiles/sponsor/me')
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
    }  
};

//Creating a profile for the current user
//Will take in two parameters as indicated in function
export const createProfile = (profileData, history) => dispatch => {
    if (profileData.sponsor === true){
        axios.post('/api/profiles/sponsor', profileData)
        .then(res => {
            console.log("Sponsor Profile Created!")
            history.push('/profile')
        })
    } else if (profileData.sponsor === false){
        axios.post('/api/profiles/recipient/', profileData)
        .then(res => {
            console.log("Recipient Profile Created!")
            history.push('/profile')
        })
    }
};

//Edit a profile for the current user
export const editProfile = (profileData, history) => dispatch => {
    if (profileData.sponsor === true){
        axios.post('/api/profiles/sponsor', profileData)
        .then(res => {
            console.log("Sponsor Profile Updated!")
            history.push('/profile')
        })
    } else if (profileData.sponsor === false){
        axios.post('/api/profiles/recipient/', profileData)
        .then(res => {
            console.log("Recipient Profile Updated!")
            history.push('/profile')
        })
    }
};

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