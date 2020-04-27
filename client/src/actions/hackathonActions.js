import {
    GET_HACKATHONS,
    GET_HACKATHONS_FAIL
} from './Types';

import axios from 'axios';

//Return all the hackathons
export const getHackathons = () => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type' : 'applicaiton/json'
            }
        }

        //gets the hackathons from the appropriate route in the server end
        let hackathons = await axios.get('/api/hackathons', null, config);
        
        dispatch({
            type: GET_HACKATHONS,
            payload: hackathons.data
        })
    }catch(err){
        dispatch({
            type: GET_HACKATHONS_FAIL,
            payload: {}
        })
        console.log(err);
    }
}