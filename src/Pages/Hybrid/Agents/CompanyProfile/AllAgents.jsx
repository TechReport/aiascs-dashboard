import { Button, Skeleton, Tag } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext'
import { agentsCompanyAPI } from '../agentsCompanyAPI'
import RegisterCompany from '../../../../Components/Company/RegisterCompany';
import eventEmitter from '../../../../Services/EventEmitter'


export default function AllAgents() {
    const hist = useHistory()
    const [agents, setAgents] = useState({ loading: false, data: [] })
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { state } = useContext(AuthContext)

    function fetchAgents() {
        setAgents({ loading: true, data: [] })
        agentsCompanyAPI.getAll('agents/all').then(data => {
            // console.log(data)
            // data.filter(company => {
            //     console.log(company.manufacture)
            //     company.manufacture.filter
            // })

            setAgents({ loading: false, data })
        }).catch(err => {
            console.log(err)
            setAgents({ loading: false, data: [] })
        })

    }
    eventEmitter.on('updateAgents', () => fetchAgents());

    useEffect(() => {
        fetchAgents()
        return () => {
            setAgents({})
        }
    }, [])

    return (
        <div className='container-fluid mt-4'>
            <div className="mt-4">
                <div className="actions">
                    <Link to='/manufacturers/agents/all' >
                        <Button type='ghost' size='middle' className='rounded-pill' onClick={() => setIsModalVisible(true)}>
                            Add New Agent
                        </Button>
                    </Link>
                    <Modal title={'Register New Agent Company'}
                        // ""
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                        destroyOnClose={true}>
                        <RegisterCompany handlerAPI={agentsCompanyAPI} resource='agents' updateEvent='updateAgents' />
                    </Modal>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header h5">Explore New Agents</div>
                        <div className="card-body px-1 pt-1">
                            {agents.loading ?
                                <Skeleton active />
                                :
                                <BootstrapTable options={{ onRowClick: (row) => hist.push(`/agents/${row._id}`, row) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={agents.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search companies' tableHeaderClass='' >
                                    <TableHeaderColumn dataField='name' isKey widt='150'>Company Name</TableHeaderColumn>
                                    {/* <TableHeaderColumn dataField='qrcode' width='90' dataFormat={formatQRCode}>QR Code</TableHeaderColumn> */}
                                    {/* <TableHeaderColumn dataField='isRevoked' width='90' dataFormat={(cell) => cell ? <Tag color='magenta'>True</Tag> : <Tag color='cyan'>False</Tag>}>Revoked ?</TableHeaderColumn> */}
                                    <TableHeaderColumn dataField='createdAt' dataSort={true} dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} widt='100' >Registered At</TableHeaderColumn>
                                    <TableHeaderColumn dataField='expiry' dataFormat={(cell) => moment(cell).format('DD-MM-YYYY')} widt='100' >Associated At</TableHeaderColumn>
                                    <TableHeaderColumn dataField='manufacture' dataFormat={formatAssociatedQN} widt='100' >Associated with your company?</TableHeaderColumn>
                                </BootstrapTable>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function formatAssociatedQN(cell, row) {
        if (cell.length === 0) {
            return <Tag color='magenta'>Not associated</Tag>
        } else {
            return <Tag color='blue'>Associated</Tag>

            // console.log(cell.includes({ _id: state.currentUser.companyId }))
            // console.log('includes')
        }
        // let ar = []
        // ar.incl
        // console.log(cell)
        // console.log(state.currentUser.companyId)
        // return cell.includes({ _id: state.currentUser.companyId })

        // return cell.contains(company => {
        //     console.log(company._id)
        //     if (company._id === state.currentUser.companyId) {
        //         return (
        //             <Tag color='gold'>Associated</Tag>
        //         )
        //     } else {
        //         return <Tag color='magenta'>Not associated</Tag>
        //     }
        // })
        // if (cell.length === 0) {
        //     return <Tag color='magenta'>Not associated</Tag>
        // } else {

        //     return cell.map(company => state.currentUser.companyId === company._id && <Tag color='gold'>Associated</Tag>)
        // }
    }
}
