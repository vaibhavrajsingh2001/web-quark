import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: action.payload,
            };
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
