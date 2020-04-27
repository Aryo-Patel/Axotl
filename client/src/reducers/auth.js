import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, USER_FAILED } from "../actions/Types";

const initialState = {
    user: null,
    isAuthenticated: false,
    isRegistered: false,
    loading: true,
    sponsor: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                sponsor: payload.sponsor
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true
            }
        case REGISTER_FAIL:
            return state;
        case LOGIN_FAIL:
        case USER_FAILED:
        case LOGOUT:
        case ACCOUNT_DELETED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
}