import React, { useState } from 'react'
import { Button, Input, Space, Form, Alert, notification, Modal } from 'antd';
import eventEmitter from '../../Services/EventEmitter';

export default function Edit({ data, isModalVisible, handleCancel, companyAPI, companyType, resource }) {
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
        console.log(companyDetails)
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        // await companyAPI.updateOne(resource === 'agents' ? 'productAgent' : resource, companyDetails, data._id)
        await companyAPI.updateOne(resource, companyDetails, data._id)
            .then(res => {
                console.log(res)
                companyDetails = ''
                eventEmitter.emit('companyEdited')
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
            message: 'Company Updated Successfully',
            placement: 'bottomLeft'
        });
    };

    return (
        <div className="mt-4">
            <div className="actions">
                {/* <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                    Register Company
                <UserAddOutlined className='' />
                </Button> */}
                <Modal title='Edit Company'
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="Company Name"
                            name="name"
                            initialValue={data.name}
                            rules={[{ required: true, message: "Please input Companies Recognized Name!" }]}>
                            <Input placeholder='Enter Company Name' />
                        </Form.Item>
                        <Form.Item
                            label="Registration No"
                            name="regno"
                            initialValue={data.regno}
                            rules={[{ required: true, message: 'Please input Companies Brela registration Number!' }]}>
                            <Input placeholder='Enter Companies Brela Registation Number' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={data.email}
                            rules={[{ required: true, message: 'Please input Companies valid Email!' }]}>
                            <Input placeholder='Enter Company Email' />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phonenumber"
                            initialValue={data.phonenumber}
                            rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                            <Input type='number' placeholder='Input Companies Phone Number' />
                        </Form.Item>
                        {/* <Form.Item
                            label="Location"
                            name="location"
                            rules={[{ required: true, message: 'Please input your location!' }]}>
                            <Input />
                        </Form.Item> */}

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
                </Modal>
            </div>
        </div>
    )
}
