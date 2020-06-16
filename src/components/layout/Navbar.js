import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title }) => {
    return (
        <nav className="navbar bg-primary">
            <h1>{title}</h1>
            <ul className='list'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/quiz">Quizzes</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'Web Quark',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Navbar;
