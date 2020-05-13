import axios from 'axios'
import { GET_COMPANIES, GET_COMPANY, COMPANY_ERROR } from './Types'

export const getCompanies = () => async dispatch => {
    try {
        const res = await axios.get('/api/profiles/sponsor')
        dispatch({
            type: GET_COMPANIES,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message)
        dispatch({
            type: COMPANY_ERROR
        })
    }
}



//get one company's profile for display
export const getCompany = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profiles/sponsor/${id}`)
        dispatch({
            type: GET_COMPANY,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message)
        dispatch({
            type: COMPANY_ERROR
        })
    }
}

export const getDistances = () => async(dispatch) => {
    try {
        const response = await axios.get('/api/profiles/sponsor/search/locations')
        dispatch({
            type: GET_COMPANIES,
            payload: response.data
        })

    } catch (err) {
        console.error(err.message)

    }
}