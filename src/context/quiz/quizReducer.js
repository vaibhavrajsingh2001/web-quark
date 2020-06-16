import { SET_QUIZ } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_QUIZ:
            return {
                ...state,
                currentQuiz: action.payload,
            };
        default:
            return state;
    }
};
