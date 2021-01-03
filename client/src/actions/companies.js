import axios from 'axios'
import { GET_COMPANIES, GET_COMPANY, COMPANY_ERROR, CHANGE_DISPLAYED_COMPANIES} from './Types'

export const getCompanies = (pageNumber) => async dispatch => {
    try {
        const res = await axios.get(`/api/profiles/sponsor/${pageNumber}`)
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

//

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

export const getDistances = (pageNumber) => async(dispatch) => {
    try {
        const response = await axios.get(`/api/profiles/sponsor/search/locations/${pageNumber}`)
        dispatch({
            type: GET_COMPANIES,
            payload: response.data
        })

    } catch (err) {
        console.error(err.message)

    }
}