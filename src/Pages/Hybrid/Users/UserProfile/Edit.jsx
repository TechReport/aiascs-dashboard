import React, { useEffect, useState } from 'react'
import { Button, Input, Select, Radio, Space, Form, Alert, notification, Modal } from 'antd';

import { userAPI } from '../userAPI';

export default function EditUser({ data, isModalVisible, handleCancel, role, updateUser }) {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)

    const [gender, setGender] = useState('male')
    const [roles, setRoles] = useState({ loading: false, data: [] })

    const { Option } = Select;

    const fetchRoles = async () => {
        setRoles({ loading: true, data: [] })
        await userAPI.getAll('acc/rolesbyrole', 'name _id genericName target')
            .then(data => {
                if (role) {
                    const resp = data.filter(a => a.genericName === role)
                    return setRoles({ loading: false, data: resp })
                }
                setRoles({ loading: false, data })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchRoles()
        return () => {
            setRoles([])
        }
        // eslint-disable-next-line
    }, [])

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


    const onFinish = async (userDetails) => {
        console.log(userDetails)
        setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await userAPI.updateOne('user', { userDetails }, data._id)
            .then(res => {
                userDetails = ''
                console.log(res)
                updateUser(res)
                openNotification()
            })
            .catch(err => {
                console.log(err)
                setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
            .finally(() => setLoading(false))
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const openNotification = () => {
        notification.success({
            message: 'User Updated Successfully.',
            placement: 'bottomLeft',
            // onClose: () => {
            //     notification.info({
            //         message: 'Updated user information will be seen in new session.',
            //         placement: 'bottomLeft',
            //         duration: 0
            //     });
            // }
        });
    };

    return (
        <div className="mt-4">
            <div className="actions">
                <Modal title="Edit User"
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
                            initialValue={data.firstName}
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: "Please input User's First Name!" }]}>
                            <Input placeholder='Enter Users First Name' />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            initialValue={data.lastName}
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder='Enter Users Last Name' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue={data.email}
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                                {
                                    pattern: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Invalid Email Format",
                                },
                            ]}>
                            <Input disabled placeholder='Enter users Email' />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            initialValue={data.phoneNumber}
                            rules={[
                                { required: true, message: 'Please input your Phone number!' },
                                {
                                    pattern: /^[\d]{10,12}$/,
                                    message: "Allowed format: 255626327561 or 0626327561",
                                },
                            ]}>
                            <Input disabled type='number' placeholder='Enter users Phone Number' />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            initialValue={data.gender}
                            rules={[{ required: true, message: 'Please select users gender!' }]}>
                            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="Role"
                            name="role"
                            initialValue={data.role._id}
                            rules={[{ required: true, message: 'Please input your role' }]}>
                            <Select
                                showSearch
                                loading={roles.loading}
                                placeholder="Search to Select"
                                optionFilterProp="children" >
                                {roles.data.map(role => <Option className='' style={{ fontSize: 'small' }} value={role._id}>{`${role.name}(${role.target})`}</Option>)}
                            </Select>
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
                </Modal>
            </div>
        </div>
    )
}
