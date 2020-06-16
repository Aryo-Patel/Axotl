import { CONFIRMATION, ERROR, REMOVE_ERROR, REMOVE_CONFIRMATION } from './Types'

export const setError = (message) => dispatch => {
    console.log('alert reached')
    console.log(message)
    dispatch({
        type: ERROR,
        payload: {
            class: 'alert__error',
            message
        }
    })
    setTimeout(() => {
        dispatch({
            type: REMOVE_ERROR,
            payload: {
                message
            }
        })
    }, 15000)
}

export const setConfirmation = (message) => dispatch => {
    console.log('confirmation reached')
    dispatch({
        type: CONFIRMATION,
        payload: {
            class: 'alert__confirmation',
            message
        }
    })
    setTimeout(() => {
        dispatch({
            type: REMOVE_CONFIRMATION,
            payload: {
                message
            }
        })
    }, 10000)
}