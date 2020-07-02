import {
    SET_QUIZ,
    SET_QUIZZES,
    SET_LEADERBOARD,
    SET_QUIZ_FAIL,
    CLEAR_ERRORS,
    CLEAR_QUIZ,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload,
            };
        case SET_QUIZ:
            return {
                ...state,
                currentQuiz: action.payload,
            };
        case SET_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.payload,
            };
        case SET_QUIZ_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case CLEAR_QUIZ:
            return {
                ...state,
                currentQuiz: [],
            };
        default:
            return state;
    }
};
