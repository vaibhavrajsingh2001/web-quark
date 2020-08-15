import React, { useEffect, useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import QuizContext from '../../context/quiz/quizContext';
import quark from './quark.png';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { getUser } = authContext;

    const quizContext = useContext(QuizContext);
    const { getAllQuizzes } = quizContext;

    useEffect(() => {
        if (localStorage.token) {
            getUser();
        }
        getAllQuizzes();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div className="container-small text-center">
                <h1>
                    <span className="text-primary">Hi!</span> Welcome to
                    web-quark!
                </h1>
                <br />
                <img alt="quiz" src={quark} className="quark"></img>
            </div>
        </Fragment>
    );
};

export default Home;
