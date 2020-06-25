import { SET_QUIZ, SET_QUIZZES } from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            };
        case SET_QUIZ:
            return {
                ...state,
                currentQuiz: action.payload,
            };
        default:
            return state;
    }
};
