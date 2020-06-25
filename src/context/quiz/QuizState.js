import React, { useReducer } from 'react';
import axios from 'axios';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';
import { SET_QUIZ, SET_QUIZZES } from '../types';

const QuizState = (props) => {
    const initialState = {
        quizzes: [],
        currentQuiz: [],
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);

    // fetch all quizzes
    const getAllQuizzes = async () => {
        const res = await axios.get('/api/quiz');
        console.log(res.data);
        if(res) {
            dispatch({type: SET_QUIZZES, payload: res.data})
        }
    };

    // fetch individual quiz
    const getQuiz = async (id) => {
        const res = await axios.get(`/api/quiz/${id}`);
        console.log(res.data);
        if (res) {
            dispatch({
                type: SET_QUIZ,
                payload: res.data,
            });
        }
    };

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                currentQuiz: state.currentQuiz,
                getQuiz,
                getAllQuizzes
            }}
        >
            {props.children}
        </QuizContext.Provider>
    );
};

export default QuizState;
