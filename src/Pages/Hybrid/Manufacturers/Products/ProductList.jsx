import { Button, Input, message, Popconfirm, Popover, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { productAPI } from './productAPI'
import eventEmitter from '../../../../Services/EventEmitter'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QrcodeOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { useHistory } from 'react-router'
import toBase64 from '../../../../Services/Utilities'

export default function ProductList({ companyId }) {
    console.log('i wonder')
    console.log(companyId)
    const [products, setProducts] = useState({ loading: true, data: [] })
    const [productName, setProductName] = useState('')
    // const [deleteProductProps, setDeleteProductProps] = useState({ productName: '', })

    const hist = useHistory()

    function fetchProducts() {
        const filter = { companyId }
        console.log(filter)
        productAPI.getAll('products/', '', filter)
            .then(res => {
                console.log(res.data)
                setProducts({ loading: false, data: res.data })
            })
            .catch(error => {
                console.log(error)
                setProducts({ loading: false, data: [] })
            })
    }
    eventEmitter.on('updateProducts', () => fetchProducts());

    function handleDeleteProduct(productID) {
        console.log(productID)

        productAPI.deleteOne('products/', productID)
            .then(response => {
                console.log(response)
                setProducts({ loading: false, data: products.data.filter(a => a._id !== productID) })
                message.info("Product Deleted Successfully")
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchProducts()
        return () => {
            setProducts({ loading: false, data: [] })
        }
    }, [])

    return (
        products.loading ?
            <Skeleton active />
            :
            <BootstrapTable bordered={false} data={products.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='name' isKey width='150'>Name</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='qrcode' dataFormat={cell => cell.productToken}>Token</TableHeaderColumn> */}
                <TableHeaderColumn dataField='qrcode' width='90' dataFormat={formatQRCode}>QR Code</TableHeaderColumn>
                <TableHeaderColumn dataField='isRevoked' width='90' dataFormat={(cell) => cell ? <Tag color='magenta'>True</Tag> : <Tag color='cyan'>False</Tag>}>Revoked ?</TableHeaderColumn>
                <TableHeaderColumn dataField='createdAt' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Registered At</TableHeaderColumn>
                <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Expiry</TableHeaderColumn>
                <TableHeaderColumn dataField='' width='100' dataFormat={ActionMenu}>Actions</TableHeaderColumn>
            </BootstrapTable>
    )

    function ActionMenu(cell, row) {
        return (
            <>
                <Popover content='Delete Product'>
                    <Popconfirm
                        title={
                            <>
                                Enter <strong className='text-uppercase'>{row.name}</strong> below to confirm delete <br />
                                <Input style={{ width: '100%' }} type='text' placeholder='Type name of the product ' value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </>
                        }

                        okButtonProps={{
                            disabled: row.name.toUpperCase() === productName.toUpperCase() ? false : true,
                            loading: false
                        }}
                        okText="Delete"
                        onConfirm={() => handleDeleteProduct(row._id)}
                        cancelText="Cancel">
                        <Button size='small' shape='circle' type='text'><DeleteOutlined className='text-danger' /></Button>
                    </Popconfirm>
                </Popover>
                <Popover content='Edit Product'>
                    <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
                </Popover>
                <Popover content='View Product'>
                    <Button size='small' shape='circle' type='text' onClick={() => hist.push('products/one', row)}><EyeOutlined className='text-dark' /></Button>
                </Popover>
            </>
        )
    }
}

function formatQRCode(cell) {
    return (
        <Popover content={<img src={`data:image/png;base64,${toBase64(cell.qrCodeImage.data)}`} alt='' />}>
            <QrcodeOutlined style={{ cursor: 'pointer', fontSize: '20px' }} />
        </Popover>
    )
}

