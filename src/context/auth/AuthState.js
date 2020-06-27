import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const getUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/users');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            console.error(err);
            dispatch({ type: AUTH_ERROR });
        }
    };

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
            getUser();
            // token is added to state by dispatch above then the user data is loaded instantly
        } catch (err) {
            console.error(err);
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
            getUser();
            // token is added to state by dispatch above then the user data is loaded instantly
        } catch (err) {
            console.error(err);
            dispatch({ type: LOGIN_FAIL });
        }
    };

    // logout user
    const logout = () => dispatch({ type: LOGOUT });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                register,
                login,
                getUser,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
