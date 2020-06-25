import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizContext from '../../context/quiz/quizContext';

const Quizzes = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuizzes } = quizContext;

    useEffect(()=>{
        getAllQuizzes();
    // eslint-disable-next-line
    },[]);

    return (
        <div className="container">
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link to={`/quiz/${quiz._id}`}>{quiz.name}</Link><br /><br /><br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;
