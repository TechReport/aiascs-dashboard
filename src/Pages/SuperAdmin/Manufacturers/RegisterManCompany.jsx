import { useState } from 'react';
import { Button, Input, Space, Form, Alert, notification } from 'antd';
import { adminAPI } from '../adminAPI'
import eventemitter from '../../../Services/EventEmitter'

export default function RegisterManCompany({ handleOk }) {
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

    const onFinish = async (manDetails) => {
        // console.log(userDetails)
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await adminAPI.post('manufacture/register', manDetails)
            .then(res => {
                console.log(res)
                manDetails = ''
                openNotification({ message: res.message })
                eventemitter.emit('updateManCompanies')
                handleOk()
            })
            .catch(err => {
                console.log(err)
                // setError({ status: true, errObj: err.response })
                setError({ status: true, message: err.message, descriptions: err.descriptions })
                // console.log('eerr')
            })
            .finally(() => setLoading(false))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openNotification = ({ message, description = '' }) => {
        notification.success({
            message,
            description,
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
