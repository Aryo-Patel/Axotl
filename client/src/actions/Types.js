//File containing all of the action types

//profile actions
export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILES = "GET_PROFILES";
export const PROFILE_LOADING = "PROFILE_LOADING";

//auth actions
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"
export const LOGOUT = "LOGOUT"
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const USER_LOADED = 'USER_LOADED'
export const USER_FAILED = 'USER_FAILED'
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RES_PASSWORD = 'RES_PASSWORD'

//sponsor actions
export const GET_COMPANIES = 'GET_COMPANIES'
export const GET_COMPANY = 'GET_COMPANY'
export const COMPANY_ERROR = 'COMPANY_ERROR'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'

//post actions
export const CREATE_POST = 'CREATE_POST';
export const POST_FAIL = 'POST_FAIL';
export const EDIT_POST = 'EDIT_POST';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const EDIT_REPLY = 'EDIT_REPLY';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_REPLY = 'DELETE_REPLY';
export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const LIKE_COMMENT = 'LIKE_COMMENT';
export const LIKE_REPLY = 'LIKE_REPLY';
export const GET_MY_POSTS = 'GET_MY_POSTS';

//Hackathon Actions
export const GET_HACKATHONS = 'GET_HACKATHONS';
export const GET_HACKATHON = 'GET_HACKATHON'
export const GET_HACKATHONS_FAIL = 'GET_HACKATHONS_FAIL';
export const CREATE_HACKATHON = 'CREATE_HACKATHON';
export const CREATE_HACKATHON_FAIL = 'CREATE_HACKATHON_FAIL';
export const GET_USER_HACKATHONS = 'GET_USER_HACKATHONS';
export const GET_USER_HACKATHONS_FAIL = 'GET_USER_HACKATHONS_FAIL';
export const HACKATHON_DELETED = 'HACKATHON_DELETED';
export const HACKATHON_EDITED = 'HACKATHON_EDITED';
export const GET_HACKATHONS_LOCATIONS = 'GET_HACKATHONS_LOCATIONS';

//Chat Actions
export const GET_RECIPIENTS = 'GET_RECIPIENTS';
export const GET_SPONSORS = 'GET_SPONSORS';
export const SET_LOADING = 'SET_LOADING';
export const GET_CHATLOGS = 'GET_CHATLOGS';
export const CLEAR_CHATLOG = 'CLEAR_CHATLOG';

//alert actions
export const ERROR = 'ERROR'
export const CONFIRMATION = 'CONFIRMATION'
export const REMOVE_ERROR = 'REMOVE_ERROR'
export const REMOVE_CONFIRMATION = 'REMOVE_CONFIRMATION'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'