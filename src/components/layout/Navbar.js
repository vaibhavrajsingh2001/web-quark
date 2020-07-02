import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, logout } = authContext;

    const onLogout = () => logout();

    const loggedInLinks = (
        <Fragment>
            <li>
                <Link to="/">Hello {user && user.name}</Link>
            </li>
            <li>
                <Link to="/quiz">Quizzes</Link>
            </li>
            <li>
                <Link to='/' onClick={onLogout} href="#!" >Logout</Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </Fragment>
    );

    return (
        <nav className="navbar bg-primary">
            <h1>Web Quark</h1>
            <ul className="list">
                {isAuthenticated ? loggedInLinks : guestLinks}
                <li>
                <Link to='/leaderboard'>Leaderboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
