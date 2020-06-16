import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import QuizContext from '../../context/quiz/quizContext';

const Quizzes = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes } = quizContext;

    return (
        <div className="container">
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <Link to={`/quiz/${quiz.id}`}>{quiz.category}</Link><br /><br /><br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quizzes;
