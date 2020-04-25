import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from "../actions/Types";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user,
                sponsor: payload.sponsor
            };
        case LOGIN_FAIL:
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