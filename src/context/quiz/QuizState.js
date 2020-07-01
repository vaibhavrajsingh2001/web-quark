import React, { useReducer } from 'react';
import axios from 'axios';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';
import {
    SET_QUIZ,
    SET_QUIZZES,
    SET_LEADERBOARD,
    SET_QUIZ_FAIL,
    CLEAR_ERRORS,
} from '../types';

const QuizState = (props) => {
    const initialState = {
        quizzes: [],
        currentQuiz: [],
        leaderboard: [],
        error: null,
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);

    // fetch all quizzes
    const getAllQuizzes = async () => {
        try {
            const res = await axios.get('/api/quiz');
            dispatch({ type: SET_QUIZZES, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_QUIZ_FAIL, payload: err.response.data.msg });
        }
    };

    // fetch individual quiz
    const getQuiz = async (id) => {
        try {
            const res = await axios.get(`/api/quiz/${id}`);
            dispatch({ type: SET_QUIZ, payload: res.data });
        } catch (err) {
            dispatch({ type: SET_QUIZ_FAIL, payload: err.response.data.msg });
        }
    };

    // fetch leaderboard
    const getLeaderboard = async () => {
        try {
            const res = await axios.get('/api/score');
            if (res) {
                console.log(res.data);
                dispatch({ type: SET_LEADERBOARD, payload: res.data });
            }
        } catch (err) {
            console.err(err);
        }
    };

    // update total score of user
    const sendScore = async (score) => {
        console.log(score);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(
                '/api/score',
                { points: score },
                config
            );
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                currentQuiz: state.currentQuiz,
                leaderboard: state.leaderboard,
                error: state.error,
                getQuiz,
                getAllQuizzes,
                getLeaderboard,
                sendScore,
                clearErrors,
            }}
        >
            {props.children}
        </QuizContext.Provider>
    );
};

export default QuizState;
