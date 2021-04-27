import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { manufacturerAPI } from './manufacturerAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'

export default function RegisteredManufacturers() {
    const [manufacturers, setManufacturers] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchManCompanies() {
        manufacturerAPI.getAll('manufacture/all')
            .then(res => {
                console.log(res)
                setManufacturers({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on('updateManCompanies', () => fetchManCompanies());

    useEffect(() => {
        fetchManCompanies()
        return () => {
            setManufacturers({ loading: false, data: [] })
        }
    }, [])

    return (
        manufacturers.loading ?
            <Skeleton active />
            :
            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/manage/manufacturer/profile/${cell._id}`, cell) }} tableContainerClas='mt-n2' className='bg-inf mt-n3' data={manufacturers.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' trStyle={{ cursor: 'pointer' }} >
                <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='admin' dataFormat={formatAdmin}>Admin</TableHeaderColumn>
            </BootstrapTable>
    )

    function formatAdmin(cell) {
        if (cell)
            return `${cell.firstName} ${cell.lastName}`
    }
}
