import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizContext from '../../context/quiz/quizContext';
import AuthContext from '../../context/auth/authContext';

const Quizzes = () => {
    const quizContext = useContext(QuizContext);
    const { quizzes, getAllQuizzes, clearQuiz } = quizContext;

    const [quizList, setQuizList] = useState([...quizzes]);

    const authContext = useContext(AuthContext);
    const {
        user,
        getUser,
    } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            getUser();
        }
        async function fetchData() {
            await getAllQuizzes();
            const filteredQuizzes = quizList.filter(
                (quiz) => !user.participatedQuizzes.includes(quiz._id)
            );
            setQuizList(filteredQuizzes);
        }
        fetchData();
        return clearQuiz();
        // eslint-disable-next-line
    }, [user]);

    if (quizList.length < 1) {
        return (
            <p>
                <span className="text-primary">Sorry!</span> No quizzes left to
                participate in. See you next time!
            </p>
        );
    } else {
        return (
            <div className="container">
                <ul>
                    {quizList.map((quiz) => (
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
    }
};

export default Quizzes;
