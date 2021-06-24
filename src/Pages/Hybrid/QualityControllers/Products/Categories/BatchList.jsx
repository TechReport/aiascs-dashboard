import { Empty, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { useHistory } from 'react-router'
import { productAPI } from '../../../Manufacturers/Products/productAPI'

export default function BatchList({ selectedCompany }) {
    const [batches, setBatches] = useState({ loading: false, data: [] })

    function fetchBatches() {
        setBatches({ loading: true, data: [] })
        productAPI.getBatchesVSProducts(selectedCompany._id)
            .then(data => {
                console.log(data)
                setBatches({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setBatches({ loading: false, data: [] })
            })
    }
    useEffect(() => {
        fetchBatches()
        return () => {
            setBatches()
        }
    }, [selectedCompany])
    const hist = useHistory()

    return (
        <div>
            {batches.loading ?
                <Skeleton active />
                :
                batches.data.length === 0 ?
                    <Empty description='Company has no active batches with products' />
                    :
                    <BootstrapTable options={{
                        onRowClick: (row) => {
                            console.log(row)
                            hist.push('category/batch', { ...row, company: selectedCompany })
                        }
                    }} bordered={false} trStyle={{ cursor: 'pointer' }} data={batches.data} search striped hover searchPlaceholder='Search batches' >
                        <TableHeaderColumn dataField='_id' isKey hidden >Batch Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='batch' dataFormat={(cell) => cell[0].name}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='productsCount' >Products</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField='name' dataFormat={renderActions}>Actions</TableHeaderColumn> */}
                    </BootstrapTable>
            }
        </div>
    )
}
