import React, { useReducer } from 'react';
import axios from 'axios';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';
import { SET_QUIZ, SET_QUIZZES, SET_LEADERBOARD } from '../types';

const QuizState = (props) => {
    const initialState = {
        quizzes: [],
        currentQuiz: [],
        leaderboard: [],
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);

    // fetch all quizzes
    const getAllQuizzes = async () => {
        const res = await axios.get('/api/quiz');
        if (res) {
            dispatch({ type: SET_QUIZZES, payload: res.data });
        }
    };

    // fetch individual quiz
    const getQuiz = async (id) => {
        const res = await axios.get(`/api/quiz/${id}`);
        if (res) {
            dispatch({
                type: SET_QUIZ,
                payload: res.data,
            });
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
            const res = await axios.post('/api/score', {"points":score}, config);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                currentQuiz: state.currentQuiz,
                leaderboard:state.leaderboard,
                getQuiz,
                getAllQuizzes,
                getLeaderboard,
                sendScore,
            }}
        >
            {props.children}
        </QuizContext.Provider>
    );
};

export default QuizState;
