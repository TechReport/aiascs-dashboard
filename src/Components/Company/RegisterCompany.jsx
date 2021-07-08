import { useState } from 'react';
import { Button, Input, Space, Form, Alert, notification } from 'antd';
// import { manufacturerAPI } from './manufacturerAPI'
import eventemitter from '../../Services/EventEmitter'
import LocationSelect from '../../Pages/Hybrid/Users/LocationSelect';

export default function RegisterCompany({ handlerAPI, resource, updateEvent }) {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)

    const [location, setLocation] = useState({ region: '', district: '', ward: '' })
    const [locationError, setLocationError] = useState({ status: false, message: '' })


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
        if (!location.ward) {
            return setLocationError({ status: true, message: 'Please select location' })
        }
        companyDetails.location = location

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
                rules={[{ required: true, message: "Please input Companies's Name!" }]}>
                <Input placeholder='Enter Manufacturing Company Name' />
            </Form.Item>
            <Form.Item
                label="Registration No"
                name="regno"
                rules={[{ required: true, message: 'Please input Registration Number!' }]}>
                <Input placeholder='Enter Companies Registration Number' />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please input Companies Email!' },
                    {
                        pattern: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email Format",
                    },
                ]}>
                <Input type='email' placeholder="Enter Companie's Email" />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phonenumber"
                rules={[
                    { required: true, message: 'Please Enter Phone number!' },
                    {
                        pattern: /^[\d]{10,12}$/,
                        message: "Allowed format: 255626327561 or 0626327561",
                    },
                ]}>
                <Input type='number' placeholder='Enter Phone Number' />
            </Form.Item>
            <Form.Item
                label="Location"
                name="location">
                <LocationSelect setLocation={setLocation} locationError={locationError} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Reset
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
