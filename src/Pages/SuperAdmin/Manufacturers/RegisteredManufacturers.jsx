import { Button, Popover, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { adminAPI } from '../adminAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'
import {
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons'

export default function RegisteredManufacturers() {
    const [manufacturers, setManufacturers] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchManCompanies() {
        adminAPI.getAll('manufacture/all')
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
            <BootstrapTable tableContainerClas='mt-n2' className='bg-inf mt-n3' data={manufacturers.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='admin' dataFormat={formatAdmin}>Admin</TableHeaderColumn>
                <TableHeaderColumn dataFormat={ActionMenu}>Action</TableHeaderColumn>
            </BootstrapTable>
    )

    function formatAdmin(cell) {
        if (cell)
            return `${cell.firstName} ${cell.lastName}`
    }

    function ActionMenu(cell, row) {
        return (
            <>
                <Popover content='Edit'>
                    <Button size='small' shape='circle' type='text'><EditOutlined className='text-primary' /></Button>
                </Popover>
                <Popover content='View'>
                    <Button size='small' shape='circle' type='text' onClick={() => hist.push(`/manage/manufacturer/profile/${row._id}`, row)}><EyeOutlined className='text-dark' /></Button>
                </Popover>
            </>
        )
    }
}
