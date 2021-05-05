import { Skeleton, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { agentsCompanyAPI } from './agentsCompanyAPI'
import eventEmitter from '../../../Services/EventEmitter'
import { useHistory } from 'react-router-dom'

export default function RegisteredAgents() {
    const [agentCompanies, setAgentCompanies] = useState({ loading: true, data: [] })

    const hist = useHistory()

    function fetchAgentsCompanies() {
        agentsCompanyAPI.getAll('agents/all')
            .then(res => {
                console.log(res)
                setAgentCompanies({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on('updateQualityControllers', fetchAgentsCompanies);

    useEffect(() => {
        fetchAgentsCompanies()
        return () => {
            setAgentCompanies({ loading: false, data: [] })
        }
    }, [])

    return (
        agentCompanies.loading ?
            <Skeleton active />
            :
            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/manage/qcontroller/profile/${cell._id}`, cell) }} tableContainerClas='mt-n2' className='bg-inf mt-n3' data={agentCompanies.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' trClassName='bg-inf border' trStyle={{ cursor: 'pointer' }} >
                <TableHeaderColumn dataField='name' filterFormatted isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='phonenumber'>Phone Number</TableHeaderColumn>
                <TableHeaderColumn dataField='admin' dataFormat={formatAdmin}>Admin</TableHeaderColumn>
            </BootstrapTable>
    )

    function formatAdmin(cell) {
        if (cell)
            return `${cell.firstName} ${cell.lastName}`
        return <Tag color='geekblue'>Not Assigned</Tag>
    }
}
