import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizContext from '../../context/quiz/quizContext';
import Spinner from '../layout/Spinner';

const Quizzes = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuizzes } = quizContext;

    useEffect(() => {
        getAllQuizzes();
        // eslint-disable-next-line
    }, []);

    if (quizzes.length < 1) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link to={`/quiz/${quiz._id}`}>{quiz.name}</Link>
                        <br />
                        <br />
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;
