import { Button, Popover, Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { userAPI } from './userAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'
import {
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons'
import './style.css'


export default function UserList() {
    const [users, setUsers] = useState({ loading: true, data: [] })
    // const [usernameToDelete, setUsernameToDelete] = useState()

    const hist = useHistory()

    function fetchUsers() {
        userAPI.getAll('user/', '')
            .then(data => {
                setUsers({ loading: false, data })
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

    function trClassFormat(row, rowIndex) {
        return 'small'
        // row is the current row data
        // return rowIndex % 2 === 0 ? "small" : "tr-even";  // return class name.
    }


    return (
        users.loading ?
            <Skeleton active />
            :
            <BootstrapTable trStyle={{ padding: '0px' }} data={users.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName={trClassFormat} >
                <TableHeaderColumn dataField='firstName' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='role'
                    dataFormat={(cell) =>
                        <Tag color={'geekblue'} key={cell}>{cell.name}</Tag>
                    }>
                    Role
                </TableHeaderColumn>
                <TableHeaderColumn dataFormat={ActionMenu}>Action</TableHeaderColumn>
            </BootstrapTable>
    )

    function ActionMenu(cell, row) {
        console.log(row)
        return (
            <>
                <Popover content='Edit'>
                    <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
                </Popover>
                <Popover content='View'>
                    <Button size='small' shape='circle' type='text' onClick={() => hist.push(`/user/${row._id}`, row)}><EyeOutlined className='text-dark' /></Button>
                </Popover>
            </>
        )
    }
}
