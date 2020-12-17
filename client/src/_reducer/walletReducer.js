import { INITIAL_WALLET, ADDED_BALANCE_WALLET, DEDUCT_FROM_WALLET, PAYMENT_FAIL } from '../_action/type'

const initialState = {
    wallet: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INITIAL_WALLET:
            return {
                ...state,
                wallet: action.payload
            }
        case ADDED_BALANCE_WALLET:
            return {
                ...state,    
            }
        case DEDUCT_FROM_WALLET:
            return {
                ...state
            }
        case PAYMENT_FAIL:
            return {
                wallet: []
            }
        default:
            return state
    }
}
