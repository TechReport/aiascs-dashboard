import { Form, Alert, Button, Input, Space, Steps, notification } from 'antd'
// import React, { useState } from 'react'
import {
    KeyOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import { authAPI } from '../../Services/auth/authAPI';
import eventEmitter from '../../Services/EventEmitter'


export default function FirstTimeLogin() {
    const onFinishFailed = async (e) => {
        console.log(e)
    }

    const onFinish = async (passwordInformation) => {
        console.log(passwordInformation)

        await authAPI.resetPassword(passwordInformation)
            .then(data => {
                console.log(data)
                if (data.status) {
                    openNotification({ message: 'Password Reset is Sucessfull', description: 'Please login using your newly created password' })
                    sessionStorage.removeItem('ftl')
                    return eventEmitter.emit('goto', 0)
                }
                console.log('THIS IS NEVER POSSIBLE')
            }).catch(err => {
                console.log(err)
            })
    }

    const openNotification = ({ message, description = '' }) => {
        notification.success({
            message,
            description,
            placement: 'bottomLeft'
        });
    };

    return (
        <div className="card-body">
            <Avatar style={{ backgroundColor: '#264653' }} size={64} className='m-5' icon={<KeyOutlined />} />
            <Alert message="First Time Login" description="Please update your password to continue" type="success" className='mb-4' />
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please enter your email!" }]}>
                    <Input.Password placeholder='Enter Password' />
                </Form.Item>
                <Form.Item
                    name="re_password"
                    rules={[{ required: true, message: 'Please input Password!' }]}>
                    <Input.Password placeholder='Repeat Password' />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" >
                        Change Password
                    </Button>
                </Form.Item>
                {/* <p>Forgot Password ? <Link>Reset</Link> </p> */}
                {/* <p>Don't have account? <Link to='/'>Contact Admin</Link></p> */}
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
