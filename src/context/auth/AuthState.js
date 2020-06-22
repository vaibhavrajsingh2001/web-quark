import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    // register a new user
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/users', formData, config);
            if (res.data.token) localStorage.setItem('token', res.data.token);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
            // token is added to state by dispatch above then the user data is loaded instantly
        } catch (err) {
            localStorage.removeItem('token');
            dispatch({ type: REGISTER_FAIL });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
