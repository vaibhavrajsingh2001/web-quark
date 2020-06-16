import React, { useReducer } from 'react';
import axios from 'axios';
import QuizContext from './quizContext';
import quizReducer from './quizReducer';
import { SET_QUIZ } from '../types';

const QuizState = (props) => {
    const initialState = {
        quizzes: [
            {
                id: 1,
                category: 'Random quiz',
                link: 'https://opentdb.com/api.php?amount=10&type=multiple',
            },
            {
                id: 2,
                category: 'General Knowledge Quiz',
                link: 'https://opentdb.com/api.php?amount=10&category=9&type=multiple',
            },
            {
                id: 3,
                category: 'Entertainment: Books',
                link: 'https://opentdb.com/api.php?amount=10&category=10&type=multiple',
            },
            {
                id: 4,
                category: 'Science & Nature quiz',
                link: 'https://opentdb.com/api.php?amount=10&category=17&type=multiple',
            },
            {
                id: 5,
                category: 'Mythology quiz',
                link: 'https://opentdb.com/api.php?amount=10&category=20&type=multiple',
            },
        ],
        currentQuiz: [],
    };

    const [state, dispatch] = useReducer(quizReducer, initialState);

    // fetch individual quiz
    const getQuiz = async (id) => {
        const link = state.quizzes[id-1].link;
        const res = await axios.get(link);
        console.log(res.data.results);
        if (res) {
            dispatch({
                type: SET_QUIZ,
                payload: res.data.results,
            });
        }
    };

    return (
        <QuizContext.Provider
            value={{
                quizzes: state.quizzes,
                currentQuiz: state.currentQuiz,
                getQuiz,
            }}
        >
            {props.children}
        </QuizContext.Provider>
    );
};

export default QuizState;
