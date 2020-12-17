import { TRANSACTION_LOADED, TRANSACTION_LOADING, TRANSACTION_ERROR } from '../_action/type'

const initialState = {
    transaction: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TRANSACTION_LOADING:
            return {
                ...state
            }
        case TRANSACTION_LOADED:
        case TRANSACTION_ERROR:
            return {
                ...state,
                transaction: action.payload
            }
        default:
            return state
    }
}
