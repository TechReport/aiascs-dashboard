import { useState } from 'react';
import { Button, Input, Space, Form, Alert, notification } from 'antd';
// import { manufacturerAPI } from './manufacturerAPI'
import eventemitter from '../../Services/EventEmitter'

export default function RegisterCompany({ handlerAPI, resource, updateEvent }) {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            // span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 13,
            // span: 16,
        },
    };

    const onFinish = async (companyDetails) => {
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await handlerAPI.post(`${resource}/register`, companyDetails)
            .then(res => {
                companyDetails = ''
                eventemitter.emit(updateEvent)
                openNotification()
            })
            .catch(err => {
                console.log(err)
                setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
            .finally(() => setLoading(false))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openNotification = () => {
        notification.success({
            message: 'Company Registered',
            placement: 'bottomLeft'
        });
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Company Name"
                name="name"
                rules={[{ required: true, message: "Please input User's First Name!" }]}>
                <Input placeholder='Enter Manufacturing Company Name' />
            </Form.Item>
            <Form.Item
                label="Registration No"
                name="regno"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phonenumber"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please input your location!' }]}>
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Clear Inputs
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Space>
            </Form.Item>
            {error.status &&
                <Alert
                    message={error.message}
                    description={error.descriptions}
                    type="error"
                />
            }
        </Form>
    )
};
