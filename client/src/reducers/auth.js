import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, USER_FAILED, FORGOT_PASSWORD, FORGOT_PASSWORD_FAIL, EDIT_ACCOUNT } from "../actions/Types";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    isRegistered: false,
    sponsor: false,
    hasProfile: false
};


//reset forgot password reducer
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
        case LOGIN_SUCCESS:
            console.log(payload.user)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                sponsor: payload.user.user.sponsor,
                hasProfile: payload.user.user.hasProfile,
                isRegistered: true
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
            return {
                ...state,
                isAuthenticated: false,
                isRegistered: false,
                hasProfile: false,
                sponsor: false,
                user: null
            }
        case ACCOUNT_DELETED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                hasProfile: false,
                isRegistered: false
            };
        case FORGOT_PASSWORD:
        case FORGOT_PASSWORD_FAIL:
            return state;
        case EDIT_ACCOUNT:
            return {
                ...state,
                loading: false,
                user: {
                    user: payload
                }
            }
        default:
            return state;
    }
}