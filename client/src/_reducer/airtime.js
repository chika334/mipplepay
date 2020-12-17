import { BUY_CREDIT, PAYMENT_LOADING, PAYMENT_LOADED, TRANS } from '../_action/type'

const initialState = {
    credit: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case BUY_CREDIT:
            return {
                ...state,    
            }
        case PAYMENT_LOADING:
            return {
                ...state,
            }
        case TRANS:
        case PAYMENT_LOADED:
            return {
                ...state,
                credit: action.payload
            }
        default:
            return state
    }
}
