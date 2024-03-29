import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ onLogin, isLoggedIn }) => {

    if (isLoggedIn) {
        return <Redirect to='/'/>
    }

    return (
        <div className='jumbotron'>
            <p>Login to see seret page!</p>
            <button
                className='btn btn-primary'
                onClick={onLogin}>
                Login
            </button>
        </div>
    )
};

export default LoginPage;