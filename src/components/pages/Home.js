import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

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
                <Link
                    to="/quiz"
                    className="btn btn-dark my-1"
                    style={{ fontSize: '30px' }}
                >
                    Go To Quizzes
                </Link>
                <Link
                    to="/leaderboard"
                    className="btn btn-dark my-1"
                    style={{ fontSize: '30px' }}
                >
                    Go To leaderboard
                </Link>
            </div>
        </Fragment>
    );
};

export default Home;
