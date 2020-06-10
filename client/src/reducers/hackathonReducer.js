import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL,
    CREATE_HACKATHON,
    CREATE_HACKATHON_FAIL,
    GET_HACKATHON,
    GET_USER_HACKATHONS,
    GET_USER_HACKATHONS_FAIL,
    HACKATHON_DELETED,
    HACKATHON_EDITED,
    GET_HACKATHONS_LOCATIONS
} from '../actions/Types';

const initialState = {
    hackathonList: [],
    hackathon: {},
    loading: true,
    numHackathons: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_HACKATHONS:
        case GET_USER_HACKATHONS:
        case GET_HACKATHONS_LOCATIONS:
            return {
                ...state,
                hackathonList: payload.hackathons,
                numHackathons: payload.num,
                loading: false
            };
        case CREATE_HACKATHON:
            return {
                ...state,
                hackathonList: [...state.hackathonList, payload],
                loading: false
            }
        case CREATE_HACKATHON_FAIL:
        case GET_USER_HACKATHONS_FAIL:
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
        case HACKATHON_EDITED:
            let newHackathonList = state.hackathonList.map(hackathon => {
                if (hackathon._id.toString() == payload._id.toString()) {
                    return payload;
                } else {
                    return hackathon;
                }
            })

            return {
                ...state,
                loading: false,
                hackathonList: newHackathonList
            }
        case HACKATHON_DELETED:
            const hackathons = state.hackathonList.filter(hackathon => hackathon._id.toString() == payload.hackathonId.toString())
            return {
                ...state,
                hackathonList: hackathons,
                loading: false
            }
        default:
            return {
                ...state
            };
    }
}