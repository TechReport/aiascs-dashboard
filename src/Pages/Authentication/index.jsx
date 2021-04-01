import React, { useState } from 'react'
import '../../Styles/login.css'

import Login from './Login';
import FirstTimeLogin from './FirstTimeLogin';
import ResetPassword from './ResetPassword';

import eventEmitter from '../../Services/EventEmitter'

export default function AuthHandler() {
    const [current, setCurrent] = useState(0)
    eventEmitter.on('goto', (gotab) => {
        setCurrent(gotab)
    })

    const steps = [
        {
            title: 'Login',
            content: <Login />,
        },
        {
            title: 'First Time Login',
            content: <FirstTimeLogin />,
        },
        {
            title: 'Reset Password',
            content: <ResetPassword />,
        }
    ];

    return (
        <div className="login">
            <p className='text-center mt-5' style={{ fontSize: 'xx-large' }}>AIASCS Login</p>
            <div className="text-center cont card shadow">
                <div className="steps-content">{steps[current].content}</div>
            </div>
        </div>
    )
}
