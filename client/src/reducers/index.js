import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import auth from './auth'
import hackathonReducer from './hackathonReducer';
import companies from './companies';
import chat from './chat';
import post from './post';

export default combineReducers({
    profile: profileReducer,
    auth: auth,
    hackathons: hackathonReducer,
    companies: companies,
    chat: chat,
    post: post
})