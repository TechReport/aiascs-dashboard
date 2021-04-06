import { Button, Popover, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { productAPI } from './productAPI'
import eventEmitter from '../../../Services/EventEmitter'
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QrcodeOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { useHistory } from 'react-router'
import toBase64 from '../../../Services/Utilities'

export default function ProductList() {
    const [products, setProducts] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchProducts() {
        productAPI.getAll('products/', '')
            .then(res => {
                setProducts({ loading: false, data: res.data })
            })
            .catch(error => {
                console.log(error)
                setProducts({ loading: false, data: [] })
            })
    }
    eventEmitter.on('updateProducts', () => fetchProducts());

    useEffect(() => {
        fetchProducts()
        return () => {
            setProducts({ loading: false, data: [] })
        }
    }, [])
    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        products.loading ?
            <Skeleton active />
            :
            <BootstrapTable data={products.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='name' isKey width='150'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='qrcode' dataFormat={cell => cell.productToken}>Token</TableHeaderColumn>
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
                <Button size='small' shape='circle' type='text'><DeleteOutlined className='text-danger' /></Button>
                <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
                <Button size='small' shape='circle' type='text' onClick={() => hist.push('products/one', row)}><EyeOutlined className='text-dark' /></Button>
            </>
        )
    }
}

function formatQRCode(cell) {
    return (
        <Popover
            content={<img src={`data:image/png;base64,${toBase64(cell.qrCodeImage.data)}`} />}
            >
            <QrcodeOutlined style={{ cursor: 'pointer', fontSize: '20px' }} />
        </Popover>
    )
}

