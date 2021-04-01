import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { userAPI } from './api'
import eventEmitter from '../../../Services/EventEmitter'

export default function UserList() {
    const [users, setUsers] = useState({ loading: true, data: [] })

    function fetchUsers() {
        userAPI.getAll('user/', 'firstName lastName email phoneNumber')
            .then(res => {
                setUsers({ loading: false, data: res.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on('updateUsers', () => fetchUsers());

    useEffect(() => {
        fetchUsers()
        return () => {
            setUsers({ loading: false, data: [] })
        }
    }, [])

    return (
        users.loading ?
            <Skeleton active />
            :
            <BootstrapTable data={users.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='firstName' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='role'
                    dataFormat={(cell) =>
                        <Tag colo={'red'} key={cell}>{cell.name.toUpperCase()}</Tag>
                    }>
                    Role
                </TableHeaderColumn>
                <TableHeaderColumn >Action</TableHeaderColumn>
            </BootstrapTable>
    )
}
