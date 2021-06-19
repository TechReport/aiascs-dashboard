import { Button, Popover, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { productAPI } from './productAPI'
import eventEmitter from '../../../../Services/EventEmitter'
import {
    QrcodeOutlined
} from '@ant-design/icons';
import moment from 'moment'
import { useHistory } from 'react-router'
import toBase64 from '../../../../Services/Utilities'
import { ShowForRole } from '../../../../Components/Authentication/CheckPermission'

export default function ProductList({ companyId, extra, batch }) {
    console.log('i wonder')
    console.log(companyId)
    const [products, setProducts] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchProducts() {
        let filter = { companyId, ...extra }
        console.log(batch)
        if (batch) {
            filter.batch = batch._id
        }
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
        <div className='row'>
            <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_QUALITY_CONTROLLER_ADMIN']}>
                <div className="col-xl-8">
                    {products.loading ?
                        <Skeleton active />
                        :
                        <BootstrapTable options={{ onRowClick: (row) => hist.push(`products/${row._id}`, row) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={products.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf ' tableHeaderClass='' >
                            <TableHeaderColumn dataField='name' isKey width='150'>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='qrcode' width='90' dataFormat={formatQRCode}>QR Code</TableHeaderColumn>
                            <TableHeaderColumn dataField='isRevoked' width='90' dataFormat={(cell) => cell ? <Tag color='magenta'>Invalid</Tag> : <Tag color='cyan'>Valid</Tag>}>Product Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='createdAt' dataSort={true} dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Registered At</TableHeaderColumn>
                            <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Expiry</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </div>
            </ShowForRole>
            <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN']}>
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body border-bottom">
                            <p>Total Scanned Products: <Tag color='gold'>{products.data.length}</Tag></p>
                            <p>Total Revoked Products: <Tag color='gold'>{products.data.length}</Tag></p>
                            <p>Total Expired Products: <Tag color='gold'>{products.data.length}</Tag></p>
                            {/* <p>Total Products: <Tag color='gold'>{products.data.length}</Tag></p> */}
                        </div>
                        <div className="card-body">
                            Total Products: <Tag color='gold'>{products.data.length}</Tag>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-body">
                            Total Batches: <Tag color='gold'>{products.data.length}</Tag>
                            <Button size='small' shape='round' type='dashed' >View</Button>
                        </div>
                    </div>
                </div>
            </ShowForRole>
        </div>
    )
}

function formatQRCode(cell) {
    return (
        <Popover content={<img src={`data:image/png;base64,${toBase64(cell.qrCodeImage.data)}`} alt='' />}>
            <QrcodeOutlined style={{ cursor: 'pointer', fontSize: '20px' }} />
        </Popover>
    )
}

