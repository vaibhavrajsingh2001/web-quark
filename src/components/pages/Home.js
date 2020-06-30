import React, { useEffect, useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import quizImg from './quiz.jpg';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { getUser } = authContext;
    useEffect(() => {
        if (localStorage.token) {
            getUser();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <div className="container-small">
                <h1><span className='text-primary'>Hi!</span> Welcome to web-quark!</h1>
                <img alt='quiz' src={quizImg}></img>
            </div>
        </Fragment>
    );
};

export default Home;
