import { TVSUB_VERIFY_LOADED, TVSUB_VERIFY_LOADING } from '../_action/type'

const initialState = {
    verify: [],
    msg: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case TVSUB_VERIFY_LOADING:
            return {
                ...state
            }
        case TVSUB_VERIFY_LOADED:
            return {
                ...state,
                verify: action.payload,
            }
        default:
            return state
    }
}
