import { VERIFY_LOADED, VERIFY_ERROR, VERIFY_LOADING } from '../_action/type'

const initialState = {
    verify: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case VERIFY_LOADING:
            return {
                ...state
            }
        case VERIFY_LOADED:
            return {
                ...state,
                verify: action.payload,
            }
        case VERIFY_ERROR:
            return {
                verify: []
            }
        default:
            return state
    }
}
