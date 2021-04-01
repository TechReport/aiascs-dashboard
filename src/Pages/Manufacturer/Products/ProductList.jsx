import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { productAPI } from './productAPI'
import eventEmitter from '../../../Services/EventEmitter'

export default function ProductList() {
    const [products, setProducts] = useState({ loading: true, data: [] })

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

    return (
        products.loading ?
            <Skeleton active />
            :
            <BootstrapTable data={products.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search products' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='Name' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='Batch'>Batch</TableHeaderColumn>
                <TableHeaderColumn dataField='phoneNumber'>QR code</TableHeaderColumn>
                <TableHeaderColumn dataField='expiry'>Expiry</TableHeaderColumn>
            </BootstrapTable>
    )
}
