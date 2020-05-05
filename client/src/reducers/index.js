import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import auth from './auth'
import hackathonReducer from './hackathonReducer';
import companies from './companies'

export default combineReducers({
    profile: profileReducer,
    auth: auth,
    hackathons: hackathonReducer,
    companies: companies
})