import { ERROR, CONFIRMATION, REMOVE_ERROR, REMOVE_CONFIRMATION, CLEAR_ALERTS } from '../actions/Types'

const initialState = {
    alerts: []
}

export default function(state = initialState, action) {
    const { payload, type } = action
    switch (type) {
        case CONFIRMATION:
        case ERROR:
            const newAlerts = state.alerts.filter(alert =>
                alert.message != payload.message
            )
            return {
                ...state,
                alerts: [...newAlerts, payload]
            }
        case REMOVE_CONFIRMATION:
        case REMOVE_ERROR:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.message !== payload.message)
            }
        case CLEAR_ALERTS:
            return {
                alerts: []
            }
        default:
            return state;
    }
}