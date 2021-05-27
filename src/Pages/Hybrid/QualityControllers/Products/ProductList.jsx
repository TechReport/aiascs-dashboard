import { Button, Popover, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import eventEmitter from '../../../../Services/EventEmitter'
import {
    QrcodeOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { useHistory } from 'react-router'
import toBase64 from '../../../../Services/Utilities'
import { ShowForRole } from '../../../../Components/Authentication/CheckPermission'
import { productAPI } from '../../Manufacturers/Products/productAPI';

export default function ProductList({ companyId }) {
    console.log('i wonder')
    console.log(companyId)
    const [products, setProducts] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchProducts() {
        const filter = {}
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
    eventEmitter.on('updateProducts', () => {
        setProducts({ loading: true, data: [] })
        return fetchProducts()
    });

    useEffect(() => {
        fetchProducts()
        return () => {
            setProducts({ loading: false, data: [] })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {products.loading ?
                <Skeleton active />
                :
                <BootstrapTable options={{ onRowClick: (row) => hist.push(`products/${row._id}`, row) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={products.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf ' tableHeaderClass='' >
                    <TableHeaderColumn dataField='name' isKey width='150'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='qrcode' width='90' dataFormat={formatQRCode}>QR Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='isRevoked' width='90' dataFormat={(cell) => cell ? <Tag color='magenta'>True</Tag> : <Tag color='cyan'>False</Tag>}>Revoked ?</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdAt' dataSort={true} dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Registered At</TableHeaderColumn>
                    <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Expiry</TableHeaderColumn>
                </BootstrapTable>
            }
        </>
    )
}

function formatQRCode(cell) {
    return (
        <Popover content={<img src={`data:image/png;base64,${toBase64(cell.qrCodeImage.data)}`} alt='' />}>
            <QrcodeOutlined style={{ cursor: 'pointer', fontSize: '20px' }} />
        </Popover>
    )
}