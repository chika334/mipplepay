import { PAY_ELECTRIC, ELECTRIC_PAYMENT_FAIL, POST_PAY_ELECTRIC } from '../_action/type'

const initialState = {
    electric: [],
    msg: {},
    success: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_PAY_ELECTRIC:
        case PAY_ELECTRIC:
            return {
                ...state,
                ...action.payload,
            }
        case ELECTRIC_PAYMENT_FAIL:
            return {
                electric: []
            }
        default:
            return state
    }
}
