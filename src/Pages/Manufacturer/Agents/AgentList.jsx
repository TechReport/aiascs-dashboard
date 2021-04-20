import { Button, Popover, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { agentAPI } from './agentAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'
import {
    EditOutlined,
    EyeOutlined
} from '@ant-design/icons'

export default function AgentList() {
    const [agents, setAgents] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchAgents() {
        agentAPI.getAll('productAgent/all')
            .then(res => {
                console.log(res)
                setAgents({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on('updateAgents', () => fetchAgents());

    useEffect(() => {
        fetchAgents()
        return () => {
            setAgents({ loading: false, data: [] })
        }
    }, [])

    return (
        agents.loading ?
            <Skeleton active />
            :
            <BootstrapTable data={agents.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' >
                <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='role'
                    dataFormat={(cell) =>
                        <Tag colo={'red'} key={cell}>{cell.name.toUpperCase()}</Tag>
                    }>
                    Role
                </TableHeaderColumn> */}
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
