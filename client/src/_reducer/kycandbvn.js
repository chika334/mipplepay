import { KYCANDBVN, COMPANYUPDATE } from '../_action/type.js'

const initialState = {
    isLoading: false,
    msg: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case KYCANDBVN:
            return {
                ...state,
			    msg: action.payload,
			    isLoading: false,
            }
        case COMPANYUPDATE:
            return {
                ...state,
			    msg: action.payload,
			    isLoading: false,
            }
        default:
            return state;
    }
}
