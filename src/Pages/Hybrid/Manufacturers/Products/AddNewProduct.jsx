import { Alert, Button, DatePicker, Form, Input, notification, Space, Select } from 'antd'
import { useState, useContext, useEffect } from 'react';
import { productAPI } from './productAPI';
import eventemitter from '../../../../Services/EventEmitter'
import { AuthContext } from '../../../../Context/AuthContext'
import { useHistory } from 'react-router-dom';

export default function AddNewProduct({ handleOk }) {
    const { state } = useContext(AuthContext)
    const hist = useHistory()

    const [error, setError] = useState({ status: false, message: '', descriptions: '' })
    const [loading, setLoading] = useState(false)
    const [user] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [batches, setBatches] = useState({ loading: false, data: [] })

    const { Option } = Select;


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
        productDetails.companyId = user.companyId._id

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

    async function fetchBatches() {
        setBatches({ loading: true, data: [] })

        // console.log(state.currentUser.companyId)
        await productAPI.getBatches(state.currentUser.companyId)
            .then(data => {
                // console.log(data)
                setBatches({ loading: false, data })
            }).catch(error => {
                console.log(error)
                console.log(error.response)
                setBatches({ loading: false, data: [] })
            })
    }

    const onFinishFailed = async () => {

    }

    const onChange = (e) => {
        console.log(e._d)
        console.log(e)
    }

    useEffect(() => {
        fetchBatches()
        return () => {
            setBatches(null)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input Products Name!" }]}>
                <Input placeholder='Product Name' />
            </Form.Item>
            <Form.Item
                label="Product Count"
                name="count"
                rules={[{ required: true, message: 'Please input Products Count!' }]}>
                <Input type='number' placeholder='Enter product count' />
            </Form.Item>
            <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[{ required: true, message: 'Please input Products Expiary Date!' }]}>
                <DatePicker placeholder='Select Expiry Date' onChange={onChange} />
            </Form.Item>
            <div className='alert alert-info text-center'>
                Select batch below or <div className="btn btn-info btn-sm py-0" onClick={() => hist.replace('/manufacturers/products/batches')}>Create New Batch</div>
            </div>
            <Form.Item
                label="Batch Name"
                name="batch"
                rules={[{ required: true, message: 'Please select Products Batch Name' }]}>
                <Select
                    showSearch
                    loading={batches.loading}
                    placeholder="Search to Select"
                    optionFilterProp="children" >
                    {/* {batches.data.map(batch => <Option className='' style={{ fontSize: 'small' }} value={batch._id}>{batch.name}</Option>)} */}
                    {batches.data.map(batch => {
                        console.log(batch)
                        return (
                            <Option className='' style={{ fontSize: 'small' }} value={batch._id}>{batch.name}</Option>
                        )
                    })}
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space size='middle' direction='horizontal'>
                    <Button type="ghost" htmlType="reset" >
                        Reset
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
