import { Alert, Button, DatePicker, Form, Input, notification, Space } from 'antd'
import { useState } from 'react';
import { productAPI } from './productAPI';
import eventemitter from '../../../../Services/EventEmitter'

export default function AddNewProduct({ handleOk }) {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)

    const openNotification = ({ message, description = '' }) => {
        notification.success({
            message,
            description,
            placement: 'bottomLeft'
        });
    };


    const layout = {
        labelCol: {
            span: 7,
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
    const onFinish = async (productDetails) => {
        console.log(productDetails)
        setError({ status: false, message: '', descriptions: '' })
        setLoading(true)
        await productAPI.post('products/', { newProduct: productDetails })
            .then(res => {
                console.log(res)
                openNotification({ message: res.message })
                eventemitter.emit('updateProducts')
                handleOk()
            })
            .catch(err => {
                console.log(err)
                setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
        .finally(() => setLoading(false))
    };


    const onFinishFailed = async () => {

    }

    const onChange = (e) => {
        console.log(e._d)
        console.log(e)
    }


    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input User's First Name!" }]}>
                <Input placeholder='Product Name' />
            </Form.Item>
            <Form.Item
                label="Product Count"
                name="count"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                <Input type='number' placeholder='Enter product count' />
            </Form.Item>
            <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                <DatePicker placeholder='Select Expiry Date' onChange={onChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Clear Inputs
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading} >
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
}
