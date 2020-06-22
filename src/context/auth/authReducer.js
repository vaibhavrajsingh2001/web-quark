import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: state.payload,
            };
        case REGISTER_FAIL:
            return{
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
};
