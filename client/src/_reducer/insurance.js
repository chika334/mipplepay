import { INSURANCE_PAY } from '../_action/type'

const initialState = {
    insurance: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case INSURANCE_PAY:
            return {
                ...state,
                insurance: action.payload
            }
        default:
            return state
    }
}
