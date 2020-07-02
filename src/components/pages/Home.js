import React, { useEffect, useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import quark from './quark.png';

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
            <div className="container-small text-center">
                <h1>
                    <span className="text-primary">Hi!</span> Welcome to
                    web-quark!
                </h1>
                <br/>
                <img alt="quiz" src={quark} className='quark'></img>
            </div>
        </Fragment>
    );
};

export default Home;
