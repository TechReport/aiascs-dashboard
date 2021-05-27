import { Alert, Button, message, Modal, Tag } from 'antd'
import React, { useState } from 'react'
import { qualityControllerAPI } from '../../../QualityControllers/qualityControllerAPI'

export default function RevokeProduct({ revokeModalVisible, setRevokeModalVisible, product, refreshProductActivity }) {
    const [error, setError] = useState({ status: false, message: '', description: '' })
    const [revokeReason, setRevokeReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [revokeBatchLoading, setRevokeBatchLoading] = useState(false)

    async function handleRevokeProduct() {
        setError({ status: '', data: '' })
        setLoading(true)
        qualityControllerAPI.revokeProduct(product._id, revokeReason)
            .then(data => {
                console.log(data)
                message.success('Successfully Revoked Product')
                setRevokeModalVisible(false)
                refreshProductActivity()
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    async function handleRevokeBatch() {
        // setRevokeBatchLoading(true)

        setError({ status: '', data: '' })
        console.log(product)
        qualityControllerAPI.revokeBatch(product.batchInfo, revokeReason)
            .then(data => {
                console.log(data)
                message.success('Successfully Revoked Product')
                setRevokeModalVisible(false)
                refreshProductActivity()
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }
    return (
        <div>
            <Modal title="Confirm Revoke Product"
                visible={revokeModalVisible}
                onCancel={() => setRevokeModalVisible(false)}
                footer={null}
                destroyOnClose={true}>
                <table className='table table-hovered table-stripped table-bordered'>
                    <tr>
                        <td>Product Name</td>
                        <td><Tag color='lime'>{product.name}</Tag></td>
                    </tr>
                    <tr>
                        <td>Product Token</td>
                        <td><Tag color='green'>{product.token}</Tag></td>
                    </tr>
                    <tr>
                        <td>Batch</td>
                        <td><Tag color='green'>{product.batchInfoz.name}</Tag></td>
                    </tr>
                </table>
                <textarea value={revokeReason} onChange={(e) => setRevokeReason(e.target.value)} className='form-control mb-4' placeholder='Enter short descriptions on why revoking the product' rows='4'></textarea>
                <div className='text-right mb-2'>
                    <Button type='default' disabled={revokeBatchLoading || loading} className='mr-2' onClick={() => setRevokeModalVisible(false)}>Dismiss   </Button>
                    <Button type='primary' disabled={loading} loading={revokeBatchLoading} className='mr-2' onClick={handleRevokeBatch}>Revoke Entire Batch</Button>
                    <Button type='danger' disabled={revokeBatchLoading} loading={loading} onClick={handleRevokeProduct}>Revoke Product</Button>
                </div>
                {error.status &&
                    <Alert
                        message={error.message}
                        description={error.descriptions}
                        type="error"
                    />
                }
            </Modal>
        </div >
    )
}
