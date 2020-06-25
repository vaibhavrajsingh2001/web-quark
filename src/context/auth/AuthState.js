import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    // register a new user
    const register = async (details) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/users', details, config);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            // token is added to state by dispatch above then the user data is loaded instantly
        } catch (err) {
            localStorage.removeItem('token');
            dispatch({ type: REGISTER_FAIL });
        }
    };

    const login = async (details) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/login', details, config);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            // token is added to state by dispatch above then the user data is loaded instantly
        } catch (err) {
            localStorage.removeItem('token');
            dispatch({ type: LOGIN_FAIL });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                register,
                login
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
