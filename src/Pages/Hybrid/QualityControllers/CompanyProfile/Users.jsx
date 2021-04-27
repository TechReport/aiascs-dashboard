import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import eventEmitter from '../../../../Services/EventEmitter'


// import { useHistory } from 'react-router-dom'
// import {
//     EditOutlined,
//     EyeOutlined
// } from '@ant-design/icons'
// import { userAPI } from '../../Users/userAPI'
import { qualityControllerAPI } from '../qualityControllerAPI'


export default function Users({ companyId }) {
    const [users, setUsers] = useState({ loading: true, data: [] })
    // const [usernameToDelete, setUsernameToDelete] = useState()

    // const hist = useHistory()

    function fetchUsers() {
        const filter = { companyId }
        qualityControllerAPI.getUsers('firstName lastName email phoneNumber role', filter)
            .then(data => {
                console.log(data)
                setUsers({ loading: false, data })

            })
            .catch(error => {
                console.log(error)
                setUsers({ loading: false, data: [] })
            })
        // userAPI.getAll('user/', 'firstName lastName email phoneNumber')
        //     .then(data => {
        //         setUsers({ loading: false, data })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    eventEmitter.on('updateUsers', () => fetchUsers());

    useEffect(() => {
        fetchUsers()
        return () => {
            setUsers({ loading: false, data: [] })
        }
        // eslint-disable-next-line
    }, [])

    // function trClassFormat(row, rowIndex) {
    //     return 'small border'
    //     // row is the current row data
    //     // return rowIndex % 2 === 0 ? "small" : "tr-even";  // return class name.
    // }


    return (
        users.loading ?
            <Skeleton active />
            :
            <BootstrapTable data={users.data} pagination scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' tableBodyClass='small ' tableHeaderClass='small    ' bordered={false}>
                <TableHeaderColumn dataField='firstName' filterFormatted dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`} isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='role' dataFormat={cell => <Tag color='green'>{cell.name}</Tag>}>Role</TableHeaderColumn>
            </BootstrapTable>
    )

    // function ActionMenu(cell, row) {
    //     console.log(row)
    //     return (
    //         <>
    //             <Popover content='Edit'>
    //                 <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
    //             </Popover>
    //             <Popover content='View'>
    //                 <Button size='small' shape='circle' type='text' onClick={() => hist.push(`/user/${row._id}`, row)}><EyeOutlined className='text-dark' /></Button>
    //             </Popover>
    //         </>
    //     )
    // }
}
