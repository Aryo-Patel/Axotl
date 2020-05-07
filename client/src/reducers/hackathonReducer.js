import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL,
    CREATE_HACKATHON,
    CREATE_HACKATHON_FAIL,
    GET_HACKATHON
} from '../actions/Types';

const initialState = {
    hackathonList: [],
    hackathon: {},
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_HACKATHONS:
            return {
                ...state,
                hackathonList: payload,
                loading: false
            };
        case CREATE_HACKATHON:
            return {
                ...state,
                hackathonList: [...state.hackathonList, payload],
                loading: false
            }
        case CREATE_HACKATHON_FAIL:
        case GET_HACKATHONS_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_HACKATHON:
            return {
                ...state,
                loading: false,
                hackathon: payload
            }
        default:
            return {
                ...state
            };
    }
}