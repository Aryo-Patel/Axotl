import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL
} from '../actions/Types';

const initialState = {
    hackathonList: [],
    loading: true
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type){
        case GET_HACKATHONS:
            return {
                ...state,
                hackathonList: payload,
                loading: false
            };
        case GET_HACKATHONS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return{
                ...state
            };
    }
}