import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_FAIL,
	LOGIN_FAIL,
	UPDATE_PASSWORD
} from '../_action/type.js'

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
	user: null,
	msg: null
}

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			}
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: action.payload,
				// msg: action.payload
			}
		case REGISTER_USER:
		case LOGIN_USER:
		localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isLoading: false,
				isAuthenticated: true,
			}
	    case UPDATE_PASSWORD:
	        return {
				...state,
				...action.payload,
				isLoading: false,
				isAuthenticated: true,
			}
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT_USER:
		case REGISTER_FAIL:
		localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				user: null
			}
		default:
			return state;
	}
}
