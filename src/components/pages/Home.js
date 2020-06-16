import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <div className="container-small">
            <Link to="/quiz" className="btn btn-dark my-1" style={{ fontSize: '30px' }}>
                Go To Quizzes
            </Link>
            <Link to="/leaderboard" className="btn btn-dark my-1" style={{ fontSize: '30px' }}>
                Go To leaderboard
            </Link>
        </div>
    </Fragment>
);

export default Home;
