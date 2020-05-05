import { GET_COMPANIES, GET_COMPANY, COMPANY_ERROR } from '../actions/Types'

const initialState = {
    companyList: [],
    company: {},
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_COMPANIES:
            return {
                ...state,
                companyList: payload,
                loading: false
            }
        case GET_COMPANY:
            return {
                ...state,
                company: payload,
                loading: false
            }
        case COMPANY_ERROR:
            return {
                ...state,
                company: {},
                companies: [],
                loading: true
            }
        default:
            return state
    }
}