import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>

            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                    ></input>

                    <label htmlFor='email'>Email-id</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    ></input>

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                        minLength='6'
                    ></input>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    ></input>
                </div>
                <input
                    type='submit'
                    value='Register'
                    className='btn btn-dark'
                ></input>
            </form>
        </div>
    );
};

export default Register;
