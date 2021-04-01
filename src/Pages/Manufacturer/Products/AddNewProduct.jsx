import { Alert, Button, DatePicker, Form, Input, Radio, Select, Space, Switch } from 'antd'
import { useState, useEffect } from 'react';
import { productAPI } from './productAPI';

export default function AddNewProduct() {
    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    // const [associateQRCode, setAssociateQRCode] = useState(true)


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
        // console.log(userDetails)
        // setLoading(true)
        setError({ status: false, message: '', descriptions: '' })
        await productAPI.post('products/', { newProduct: productDetails })
            .then(res => {
                console.log(res)
                // userDetails = ''
                // openNotification({ message: res.message })
                // eventemitter.emit('updateUsers')
                // handleOk()
            })
            .catch(err => {
                console.log(err)
                // console.log(err.message)
                // console.log(err.descriptions)
                // setError({ status: true, errObj: err.response })
                setError({ status: true, message: err.message, descriptions: err.descriptions })
                // console.log('eerr')
            })
            // .finally(() => setLoading(false))
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
                name="productName"
                rules={[{ required: true, message: "Please input User's First Name!" }]}>
                <Input placeholder='Product Name' />
            </Form.Item>
            <Form.Item
                label="Batch"
                name="batch"
                rules={[{ required: true, message: 'Please input Batch number!' }]}>
                <Input placeholder='Batch Id' />
            </Form.Item>
            <Form.Item
                label="Product Count"
                name="count"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                <Input type='number' placeholder='Enter product count' />
            </Form.Item>

            <Form.Item
                label="Associate QR Code"
                name="associateQCode">
                <Switch defaultChecked />
            </Form.Item>

            <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}>
                <DatePicker placeholder='Select Expiry Date' onChange={onChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Clear Inputs
                    </Button>
                    <Button type="primary" htmlType="submit" >
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
