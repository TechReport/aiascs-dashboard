import { Form, Alert, Button, Input, Space, Steps } from 'antd'
import '../../Styles/login.css'

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
        await authAPI.login(userDetails)
            .then(data => {
                if (data.data.target === 'firstTimeLoginStatus') {
                    sessionStorage.setItem('ftl', data.data.tempToken)
                    return eventEmitter.emit('goto', 1)
                }
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('user', JSON.stringify(data.data.user))
                window.location.reload()
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
