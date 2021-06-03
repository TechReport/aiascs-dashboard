import { Form, Button, Input, Alert } from 'antd'
import '../../Styles/login.css'

import {
    UserOutlined
} from '@ant-design/icons';
import { useState } from 'react';

import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import { authAPI } from '../../Services/auth/authAPI';

import eventEmitter from '../../Services/EventEmitter'

export default function Login() {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)

    const onFinishFailed = async (e) => {
        console.log(e)
    }

    const onFinish = async (userDetails) => {
        setError({ status: false, message: '', descriptions: '' })
        setLoading(true)
        await authAPI.login(userDetails)
            .then(data => {
                console.log(data)
                if (data.status === 'firstTimeLogin') {
                    sessionStorage.setItem('ftl', data.user.token)
                    return eventEmitter.emit('goto', 1)
                }
                setLoading(false)
                sessionStorage.setItem('token', data.user.token)
                sessionStorage.setItem('user', JSON.stringify(data.user))
                window.location.reload()
            }).catch(err => {
                console.log(err)
                setLoading(false)
                setError({ status: true, message: err.message, descriptions: err.descriptions })
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
                    <Button type="primary" loading={loading} htmlType="submit" >
                        Login
                    </Button>
                </Form.Item>
                <p>Forgot Password ? <Link>Reset</Link> </p>
                <p>Don't have account? <Link to='/'>Contact Admin</Link></p>
                {error.status &&
                    <Alert
                        message={error.message}
                        description={error.descriptions}
                        type="error"
                    />
                }
            </Form>
        </div>
    )
}
