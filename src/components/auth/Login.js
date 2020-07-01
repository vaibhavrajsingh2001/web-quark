import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { error, clearErrors, isAuthenticated, login } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    // useEffect for redirecting to home page on succesful signIn
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'Invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    // component level state
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email-id</label>
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        required
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        required
                        minLength="6"
                    ></input>
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="btn btn-dark"
                ></input>
            </form>
        </div>
    );
};

export default Login;
