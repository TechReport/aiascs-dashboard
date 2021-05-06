import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import eventEmitter from '../../Services/EventEmitter'
import InternalError from '../../Pages/Errors/InternalError'

export default function Users({ companyId, companyAPI }) {
    const [users, setUsers] = useState({ loading: true, data: [] })
    const [error, setError] = useState({ status: '', message: '' })
    let filter = { companyId }
    function fetchUsers() {
        companyAPI.getAll('user/', 'firstName lastName email phoneNumber role', filter)
            .then(data => {
                console.log(data)
                setUsers({ loading: false, data })

            })
            .catch(error => {
                console.log(error)
                setUsers({ loading: false, data: [] })
                setError({ status: 'warning', message: error.message })

            })
    }
    eventEmitter.on('updateUsers', () => fetchUsers());

    useEffect(() => {
        fetchUsers()
        return () => {
            setUsers({ loading: false, data: [] })
        }
        // eslint-disable-next-line
    }, [])


    return (
        <>
            {error.status ?
                <InternalError status={error.status} title={error.message} />
                :
                users.loading ?
                    <Skeleton active />
                    :
                    <BootstrapTable data={users.data} pagination scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' tableBodyClass='small ' tableHeaderClass='small    ' bordered={false}>
                        <TableHeaderColumn dataField='firstName' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                        <TableHeaderColumn dataField='role' dataFormat={cell => <Tag color='green'>{cell.name}</Tag>}>Role</TableHeaderColumn>
                    </BootstrapTable>
            }
        </>
    )
}
