import { GET_RECIPIENTS, GET_SPONSORS, SET_LOADING, GET_CHATLOGS } from "../actions/Types";

const initialState = {
    recipients: null,
    sponsors: null,
    chatlogs: null,
    loading: false,
};


//reset forgot password reducer
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_RECIPIENTS: 
            return {
                ...state,
                recipients: payload,
                loading: false,
            }
        case GET_SPONSORS: 
            return {
                ...state,
                sponsors: payload,
                loading: false,
            }
        case GET_CHATLOGS: 
            return {
                ...state,
                chatlogs: payload,
                loading: false,
            }
        default: 
            return state;
        }
        
    }