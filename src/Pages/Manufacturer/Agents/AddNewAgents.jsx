import { useState } from 'react';
import { Button, Input, Space, Form, Alert, notification } from 'antd';
import { agentAPI } from './agentAPI'
import eventemitter from '../../../Services/EventEmitter'

export default function AddNewAgent({ handleOk }) {
    // const [gender, setGender] = useState('male')
    // const [roles, setRoles] = useState({ loading: false, data: [] })
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

    const onFinish = async (agentDetails) => {
        // console.log(userDetails)
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await agentAPI.post('productAgent/register', agentDetails)
            .then(res => {
                console.log(res)
                agentDetails = ''
                openNotification({ message: res.message })
                eventemitter.emit('updateAgents')
                handleOk()
            })
            .catch(err => {
                console.log(err)
                console.log(err.message)
                console.log(err.descriptions)
                // setError({ status: true, errObj: err.response })
                setError({ status: true, message: err.message, descriptions: err.descriptions })
                // console.log('eerr')
            })
            .finally(() => setLoading(false))
    };

    // const fetchRoles = async () => {
    //     // setRoles({ loading: true, data: [] })
    //     await agentAPI.getAll('acc/roles', 'name _id')
    //         // .then(res => setRoles({ loading: false, data: res.data }))
    //         .catch(err => console.log(err))
    // }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const { Option } = Select;


    // useEffect(() => {
    //     fetchRoles()
    //     return () => {
    //         // setRoles([])
    //     }
    // }, [])

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
                label="Agent Company Name"
                name="name"
                rules={[{ required: true, message: "Please input User's First Name!" }]}>
                <Input placeholder='Erick' />
            </Form.Item>
            <Form.Item
                label="Registration Number"
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
