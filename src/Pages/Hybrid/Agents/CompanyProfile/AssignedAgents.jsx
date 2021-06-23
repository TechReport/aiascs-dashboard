import { Button, Skeleton } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext'
import { manufacturerAPI } from '../../Manufacturers/manufacturerAPI'
// import RegisterCompany from '../../../../Components/Company/RegisterCompany'

export default function AssignedAgents() {
    const hist = useHistory()
    const [assignedCompanies, setAssignedCompanies] = useState({ loading: false, data: [] })
    const { state } = useContext(AuthContext)
    // const [isModalVisible, setIsModalVisible] = useState(false)

    async function fetchAssociatedManCompanies() {
        setAssignedCompanies({ loading: true, data: [] })
        // associatedAgents
        await manufacturerAPI.getAssociatedAgents(state.currentUser.companyId)
            .then(data => {
                console.log(data)
                setAssignedCompanies({ loading: false, data })
            })
            .catch(error => {
                console.log(error)
                setAssignedCompanies({ loading: false, data: [] })
            })
    }

    useEffect(() => {
        fetchAssociatedManCompanies()
        return () => {
            setAssignedCompanies()
        }
        // eslint-disable-next-line 
    }, [])

    return (
        <div className='container-fluid mt-4'>
            <div className="mt-4">
                <div className="actions">
                    <Link to='/manufacturers/agents/all' >
                        <Button type='ghost' size='middle' className='rounded-pill'>
                            Assign Agent
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header">Associated Companies</div>
                        <div className="card-body px-1 pt-1">
                            {assignedCompanies.loading ?
                                <Skeleton active />
                                :
                                <BootstrapTable options={{ onRowClick: (row) => hist.push(`/agents/${row._id}`, row) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={assignedCompanies.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search companies' tableHeaderClass='' >
                                    <TableHeaderColumn dataField='name' isKey >Company Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='email' >Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField='createdAt' dataSort={true} dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')}  >Registered At</TableHeaderColumn>
                                    {/* <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} >Associated At</TableHeaderColumn> */}
                                </BootstrapTable>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
