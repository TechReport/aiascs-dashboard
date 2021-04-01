import { Form, Alert, Button, Input, Space, Steps } from 'antd'
import React, { useState } from 'react'
import '../../Styles/login.css'
import axios from 'axios';

import {
    UserOutlined
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Link, useHistory } from 'react-router-dom';
import { authAPI } from '../../Services/auth/authAPI';

import eventEmitter from '../../Services/EventEmitter'

export default function Login() {
    const onFinishFailed = async (e) => {
        console.log(e)
    }

    const onFinish = async (userDetails) => {
        console.log(userDetails)

        // const {data, error} = await authAPI.login(userDetails)
        // const data = await authAPI.login(userDetails)

        // console.log(data)
        // console.log(error)


        await authAPI.login(userDetails)
            .then(data => {
                console.log(data)
                console.log(data.data)
                console.log(data.data.target)
                if (data.data.target === 'firstTimeLoginStatus') {
                    sessionStorage.setItem('ftl', data.data.tempToken)
                    // axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.tempToken}`;
                    // axios.defaults.headers.at
                    return eventEmitter.emit('goto', 1)
                }
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('user', JSON.stringify(data.data.user))
                // const hist = useHistory()
                window.location.reload()
                // hist.replace('/')
                // goto(1)
                // eventEmitter.emit('goto', 1)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="card-body">
            <Avatar style={{ backgroundColor: '#264653' }} size={64} className='m-5' icon={<UserOutlined />} />
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please enter your email!" }]}>
                    <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input Password!' }]}>
                    <Input.Password placeholder='Password' />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        Login
                </Button>
                </Form.Item>
                <p>Forgot Password ? <Link>Reset</Link> </p>
                <p>Don't have account? <Link to='/'>Contact Admin</Link></p>
                {/* {error.status &&
                <Alert
                    message={error.message}
                    description={error.descriptions}
                    type="error"
                />
            } */}
            </Form>
        </div>
    )
}
