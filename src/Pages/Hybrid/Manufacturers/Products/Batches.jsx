import { Skeleton, Tag, Form, Input, Modal, Button, Space, notification, Popover, Empty } from 'antd'

import React, { useState, useEffect } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { useHistory } from 'react-router';
import { CloseCircleOutlined } from '@ant-design/icons'

import { productAPI } from './productAPI';
// const { Option } = Select

export default function Batches() {
    const hist = useHistory()

    const [user] = React.useState(JSON.parse(sessionStorage.getItem('user')))
    console.log(user.companyId)
    const [batches, setBatches] = useState({ loading: false, data: [] })
    const [allBatches, setAllBatches] = useState({ loading: false, data: [] })

    const [batchSaveLoading, setBatchSaveLoading] = useState(false)


    function fetchBatches() {
        setBatches({ loading: true, data: [] })
        productAPI.getBatchesVSProducts(user.companyId._id)
            .then(data => {
                console.log(data)
                setBatches({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setBatches({ loading: false, data: [] })
            })
    }

    function fetchAllBatches() {
        setAllBatches({ loading: true, data: [] })
        productAPI.getBatches(user.companyId._id)
            .then(data => {
                console.log(data)
                setAllBatches({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setBatches({ loading: false, data: [] })
            })
    }
    useEffect(() => {
        fetchBatches()
        fetchAllBatches()
        return () => {
            setBatches([])
        }
        // eslint-disable-next-line
    }, [])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDeleteBatchModalVisible(false)
    };

    const [isDeleteBatchModalVisible, setIsDeleteBatchModalVisible] = useState(false)
    const [batchToDelete, setBatchToDelete] = useState()
    const [deleteBatchCheck, setDeleteBatchCheck] = useState('')
    const [loading, setLoading] = useState(false)


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

    const onFinishFailed = async () => {

    }
    const onFinish = async (batchDetails) => {
        batchDetails.companyId = user.companyId._id
        console.log(batchDetails)
        setBatchSaveLoading(true)
        // setError({ status: false, message: '', descriptions: '' })
        await productAPI.createBatch(batchDetails)
            .then(res => {
                console.log(res)
                openNotification({ message: res.message })
                fetchAllBatches()

                handleOk()
            })
            .catch(err => {
                console.log(err)
                // setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
            .finally(() => setBatchSaveLoading(false))
    };
    const openNotification = ({ message, description = '' }) => {
        notification.success({
            message,
            description,
            placement: 'bottomLeft'
        });
    };
    return (
        <div className='row w-100 mt-4'>
            <div className="col-8">
                <button className="btn btn-info mb-2" onClick={showModal}>Create Batch</button>
                <CreateBatch
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    batchSaveLoading={batchSaveLoading}
                    layout={layout}
                    tailLayout={tailLayout}
                />
                {batchToDelete &&
                    <DeleteBatch
                        batch={batchToDelete}
                        deleteBatchCheck={deleteBatchCheck}
                        setDeleteBatchCheck={setDeleteBatchCheck}
                        loading={loading}
                        setLoading={setLoading}
                        isDeleteBatchModalVisible={isDeleteBatchModalVisible}
                        handleCancel={handleCancel}
                    />

                }
                <div className="card my-3">
                    <div className="card-header">All Batches</div>
                    <div className="card-body">
                        {allBatches.data.length === 0 &&
                            <Empty description={
                                allBatches.loading ?
                                    <span>Loading Please wait. <span className='spinner-border spinner-border-sm'></span></span>
                                    :
                                    <span>No batches available. <span className='text-info' style={{ cursor: 'pointer' }} onClick={showModal}>Create new</span></span>
                            }
                            />
                        }
                        {allBatches.data.map(batch =>
                            <Popover
                                placement='bottom'
                                content={() =>
                                    <>
                                        <div className="btn btn-outline-info btn-sm btn-block" onClick={() => {
                                            // make state payload resemble required data
                                            hist.push('batches/products', { batch: [batch], _id: batch._id })
                                        }}>View Products</div>
                                        <div className="btn btn-outline-danger btn-sm btn-block"
                                            onClick={() => {
                                                setBatchToDelete(batch)
                                                setIsDeleteBatchModalVisible(true)
                                            }}
                                        >Delete Batch</div>
                                    </>
                                }>
                                <Tag color='blue' className='px-3 py-2 mb-2' style={{ cursor: 'pointer' }} >{batch.name}
                                    <CloseCircleOutlined
                                        className='ml-2 text-danger'
                                        style={{ fontSize: '16px', cursor: 'pointer' }}
                                        onClick={() => console.log(batch)} />
                                </Tag>
                            </Popover>
                        )
                        }
                    </div>
                </div>
                <div className="card">
                    <div className="card-header border-0 d-flex justify-content-between">
                        Batches With Products
                    </div>
                    <div className="card-body p-2">
                        {batches.loading ?
                            <Skeleton active />
                            :
                            <BootstrapTable data={batches.data} pagination search striped hover searchPlaceholder='Search batches' >
                                <TableHeaderColumn dataField='_id' isKey width='250'>Batch Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='batch' dataFormat={(cell) => cell[0].name}>Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='productsCount' >Products</TableHeaderColumn>
                                <TableHeaderColumn dataField='name' dataFormat={renderActions}>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        }
                    </div>
                </div>
            </div>
        </div >
    )



    function renderActions(cell, row) {
        return (
            <>
                <button className="btn btn-info btn-sm ml-2" onClick={() => {
                    console.log(row)
                    // hist.push('batches/products', row)
                }}>View Products</button>
                <button className="btn btn-danger btn-sm ml-2">Delete</button>
            </>
        )
    }


}


function CreateBatch({ isModalVisible, handleCancel, onFinish, onFinishFailed, batchSaveLoading, layout, tailLayout }) {
    return (
        <Modal title="Create Batch"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}>

            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="Batch Name"
                    name="name"
                    rules={[{ required: true, message: "Please input Batch Name!" }]}>
                    <Input placeholder='Product Name' />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space size='middle' direction='horizontal'>
                        <Button type="ghost" htmlType="reset" >
                            Reset
                            </Button>
                        <Button type="primary" htmlType="submit" loading={batchSaveLoading} >
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}

function DeleteBatch({ batch, deleteBatchCheck, setDeleteBatchCheck, loading, setLoading, isDeleteBatchModalVisible, handleCancel }) {
    // const [deleteBatchCheck, setDeleteBatchCheck] = useState('')
    // const [loading, setLoading] = useState(false)

    function deleteBatch() {
        setLoading(true)
        console.log('delete batch')
        console.log(batch)
    }
    return (
        <Modal
            title={<div>Delete batch named  <Tag color='gold'>{batch.name}</Tag></div>}
            visible={isDeleteBatchModalVisible}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}>
            <p>
                You have issued to delete <Tag color='gold'>{batch.name}</Tag> batch. Please note that that this
            process is <Tag color='geekblue'>IRREVERSIBLE</Tag> and it will delete all products associated with it.
        </p>
            <p>Type <Tag color='red'>{batch.name.toUpperCase()}</Tag> to approve DELETE action.</p>
            <Input className='text-uppercase text-center' value={deleteBatchCheck} onChange={(e) => setDeleteBatchCheck(e.target.value)} />
            <div className='mt-3 text-right'>
                <Button type='ghost' className='mr-1' onClick={handleCancel}>Dismiss</Button>
                <Button type='danger' disabled={!(batch.name.toUpperCase() === deleteBatchCheck.toUpperCase())} onClick={deleteBatch} loading={loading} >DELETE</Button>
            </div>
        </Modal>
    )
}