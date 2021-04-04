
import { Form, Input, Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';

export default function ManufacturingCompanyRegistrationForm() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Form.Item
                    label="Company Name"
                    name="companyname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input placeholder='Enter Manufacturing Company Name' />
                </Form.Item>

                <Form.Item
                    label="Company Registration"
                    name="companyregistration"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Company Registration Number',
                        },
                    ]}>
                    <Input placeholder='Please Company Registration Number' />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" className='float-right'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
