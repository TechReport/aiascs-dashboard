import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { manufacturerAPI } from '../../../Manufacturers/manufacturerAPI'

export default function CompanyList({ setSelectedCompany }) {
    const [companies, setCompanies] = useState({ loading: false, data: [] })

    function fetchCompanies() {
        setCompanies({ loading: true, data: [] })
        manufacturerAPI.getAll('manufacture/all')
            .then(data => {
                console.log(data)
                setCompanies({ loading: false, data })
            }).catch(error => {
                console.log(error)
                setCompanies({ loading: false, data: [] })
            })
    }
    useEffect(() => {
        fetchCompanies()
        return () => {
            setCompanies()
        }
    }, [])

    return (
        <div>
            {companies.loading ?
                <Skeleton active />
                :
                <BootstrapTable bordered={false} options={{ onRowClick: (cell) => setSelectedCompany(cell) }} data={companies.data} search striped hover searchPlaceholder='Search by name' trClassName='bg-inf border' trStyle={{ cursor: 'pointer' }} >
                    <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                </BootstrapTable>
            }
        </div>
    )
}
