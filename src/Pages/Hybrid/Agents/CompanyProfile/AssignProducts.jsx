import { Modal, Button, Select, Form, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../Context/AuthContext'
import { productAPI } from '../../Manufacturers/Products/productAPI'
import { agentsCompanyAPI } from '../agentsCompanyAPI'

export default function AssignProducts({ agentCompanyId, getAssociatedProducts }) {
    const { state } = useContext(AuthContext)
    console.log(state.currentUser.companyId)
    const [show, setShow] = useState(false)

    const { Option } = Select

    const handleCancel = () => setShow(false)
    const handleShow = () => setShow(true)

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const [productIDS, setProductIDS] = useState([])

    // function handleAssigenProducts(companyDetails) {
    //     console.log(companyDetails)
    //     console.log('object')
    // }

    const onFinish = async (productsRange) => {
        // console.log(productsRange)
        // console.log(companyDetails)
        setLoading(true)
        // setError({ status: false, message: '', descriptions: '' })
        // // await companyAPI.updateOne(resource === 'agents' ? 'productAgent' : resource, companyDetails, data._id)

        await agentsCompanyAPI.assignProductsRange(agentCompanyId, state.currentUser.companyId, productsRange)
            .then(res => {
                console.log(res)
                productsRange = ''
                message.success('Products assigned successfully')
                loadProductIDs()
                handleCancel()
                getAssociatedProducts()
                // eventEmitter.emit('companyEdited')
                // openNotification()
            })
            .catch(err => {
                console.log(err)
                // setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
            .finally(() => setLoading(false))
    };

    function loadProductIDs() {
        // companyId
        setLoading2(true)
        productAPI.fetchProductIDS(state.currentUser.companyId).then(data => {
            console.log(data)
            setProductIDS(data.filter(a => a.token))
            setLoading2(false)
        }).catch(error => {
            console.log(error)
            setLoading2(false)
        })
    }

    useEffect(() => {
        loadProductIDs()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Button onClick={handleShow}>Assign Products</Button>
            <Modal
                title={<div>Assign Products To Agents</div>}
                visible={show}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout='vertical'>

                    <Form.Item
                        label="Select The Start Product Token"
                        name="from"
                        rules={[{ required: true, message: 'Please input your role' }]}>
                        <Select
                            showSearch
                            loading={loading2}
                            placeholder="Search to Select Products"
                            optionFilterProp="children" >
                            {productIDS.map(productsids => <Option className='' style={{ fontSize: 'small' }} value={productsids.token}>{`${productsids.token}`}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Select The End Product Token"
                        name="to"
                        rules={[{ required: true, message: 'Please input your role' }]}>
                        <Select
                            showSearch
                            loading={loading2}
                            placeholder="Search to Select Products"
                            optionFilterProp="children" >
                            {productIDS.map(productsids => <Option className='' style={{ fontSize: 'small' }} value={productsids.token}>{`${productsids.token}`}</Option>)}
                        </Select>
                    </Form.Item>
                    <div className='mt-3 text-right'>
                        <Button type='ghost' className='mr-1' onClick={loadProductIDs}>Dismiss</Button>
                        <Button type='danger' disabled={false} loading={loading} htmlType='submit'>Confirm</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
