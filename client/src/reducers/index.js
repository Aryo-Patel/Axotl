import { combineReducers } from 'redux';
import profileReducer from './profileRecucer';
export default combineReducers({
    profile: profileReducer,
})