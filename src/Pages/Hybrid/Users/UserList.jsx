import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { userAPI } from './userAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'

import './style.css'


export default function UserList() {
    // const [state] = useContext(AuthContext)

    // console.log(state)

    const [userData] = useState(JSON.parse(localStorage.getItem('user')))
    console.log(userData)

    const [users, setUsers] = useState({ loading: true, data: [] })
    // const [usernameToDelete, setUsernameToDelete] = useState()

    const hist = useHistory()
    let filter = {}
    userData.companyId ?
        filter = { companyId: userData.companyId._id }
        :
        filter = {}
    function fetchUsers() {
        userAPI.getAll('user/', '', filter)
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
        // eslint-disable-next-line
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
            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/user/${cell._id}`, cell) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={users.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName={trClassFormat} className='mt-n5 p-0' >
                <TableHeaderColumn dataField='firstName' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='role'
                    dataFormat={(cell) =>
                        <Tag color={'geekblue'} key={cell}>{cell.name}</Tag>
                    }>
                    Role
                </TableHeaderColumn>
            </BootstrapTable>
    )
}
