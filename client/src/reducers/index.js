import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import auth from './auth'

export default combineReducers({
    profile: profileReducer,
    auth: auth
})