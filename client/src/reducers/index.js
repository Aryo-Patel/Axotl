import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import auth from './auth'
import hackathonReducer from './hackathonReducer';

export default combineReducers({
    profile: profileReducer,
    auth: auth,
    hackathons: hackathonReducer
})