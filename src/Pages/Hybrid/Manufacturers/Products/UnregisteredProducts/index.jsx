import { Skeleton, Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import DashboardWidgetCard from '../../../../../Components/Reusable/DashboardWidgetCard'
import { productAPI } from '../productAPI'
import { useHistory } from 'react-router-dom'


export default function UnregisteredProducts() {
    const [unregisteredProducts, setUnregisteredProducts] = useState({ loading: true, data: [] })

    const hist = useHistory()

    const data = [
        { title: 'Unregistered Products', body: unregisteredProducts.data.length, percent: null, descriptions: 'The number of Unregistered products' },
    ]

    async function fetchUnregisteredProducts() {
        await productAPI.getAll('products/unregistered/')
            .then(res => {
                console.log(res)
                setUnregisteredProducts({ loading: false, data: res })
            }).catch(error => {
                console.log(error)
            })
    }


    useEffect(() => {
        fetchUnregisteredProducts()
    }, [])

    return (
        <div className='mt-3 w-100' gutter={12} >
            {data.map(item => <DashboardWidgetCard item={item} />)}

            <div className="container-fluid row  w-100 mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-white border-0">Unregistered Products</div>
                        <div className="card-body">
                            {
                                unregisteredProducts.loading ?
                                    <Skeleton active />
                                    :
                                    <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/manage/unregisteredProduct/${cell._id}`, cell) }} trStyle={{ cursor: 'pointer' }} data={unregisteredProducts.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf border' >
                                        <TableHeaderColumn dataField='name' isKey width='150'>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='companyName' width='150'>Company Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='createdAt' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Registered At</TableHeaderColumn>
                                        <TableHeaderColumn dataField='photo' dataFormat={(cell) => cell.length} width='100' >Images Uploaded</TableHeaderColumn>
                                        <TableHeaderColumn dataField='isRevoked' width='90' dataFormat={(cell) => cell ? <Tag color='magenta'>True</Tag> : <Tag color='cyan'>False</Tag>}>Revoked ?</TableHeaderColumn>
                                        <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} width='100' >Expiry</TableHeaderColumn>
                                    </BootstrapTable>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
