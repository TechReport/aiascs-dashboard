import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Affix, Button, PageHeader, Tag, Popover, message, Skeleton } from "antd";
// import Paragraph from "antd/lib/skeleton/Paragraph";

import moment from 'moment';
import {
    // EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { agentsCompanyAPI } from '../agentsCompanyAPI';
import { AuthContext } from '../../../../Context/AuthContext';
import { ShowForRole } from '../../../../Components/Authentication/CheckPermission';
import AssignProducts from './AssignProducts';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default function CompanySubProfile(props) {
    const { state } = useContext(AuthContext)
    // eslint-disable-next-line 
    const [agentCompany] = useState(props.location.state)
    // eslint-disable-next-line 
    const [associatedCompanies, setAssociatedCompanies] = useState({ loading: false, data: [] })
    // console.log(state)

    const [agentsProductList, setAgentProductList] = useState({ loading: false, data: [] })
    const [alreadyAssigned, setAlreadyAssigned] = useState(agentCompany.manufacture.some(item => item._id === state.currentUser.companyId))

    console.log(agentCompany)

    const hist = useHistory()
    const [top] = useState(0)

    // async function fetchAssociatedCompanies() {
    //     await agentsCompanyAPI.getAssocatedToCompany(agentCompany._id)
    //         .then(data => setAssociatedCompanies({ loading: false, data }))
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }


    async function assignToManCompany() {
        setAssociatedCompanies({ loading: true, data: [] })
        await agentsCompanyAPI.associateToManufactureringCompany(agentCompany._id, state.currentUser.companyId)
            .then(data => {
                console.log(data)
                setAssociatedCompanies({ loading: false, data })
                setAlreadyAssigned(true)
                message.success('Agent assigned successfully')
            })
            .catch(error => {
                console.log(error)
            })
    }

    async function getAssociatedProducts() {
        await agentsCompanyAPI
            .getAssociatedProducts(agentCompany._id, state.currentUser.companyId)
            .then(data => {
                console.log(data)
                setAgentProductList({ loading: false, data: data.productsRange })
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAssociatedProducts()
        // eslint-disable-next-line
    }, [])
    // useEffect(() => {
    //     fetchAssociatedCompanies()
    //     return () => {
    //         setAssociatedCompanies()
    //     }
    // }, [])

    return (
        <div className="mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={agentCompany.name}
                    extra={<>
                        {/* {console.log(state.currentUser.companyId)} */}
                        {/* {console.log(agentCompany.manufacture)} */}
                        {alreadyAssigned ?
                            <>
                                <Button>Company Already Assigned</Button>
                            </>
                            :
                            <Button loading={associatedCompanies.loading} type='ghost' onClick={() => assignToManCompany()} >Assign As Agent</Button>
                        }
                        {/* <Button type='danger' onClick={() => { }}>Delete</Button> */}
                    </>}
                    subTitle={<Tag color='gold'>{agentCompany._id}</Tag>}
                />
            </Affix>
            {console.log(agentCompany)}
            <div className="card shadow-sm">
                <div className="row w-100">
                    <div className="col-6 shadow-s">
                        <div className="jumbotron shadow-s h-100 bg-white p-3">
                            <p><strong>Company Name: </strong>{agentCompany.name}</p>
                            <p><strong>Registered Date: </strong>{moment(agentCompany.createdAt).format('')}</p>
                            <p><strong>Regisitration No: </strong>{agentCompany.regno}</p>
                            <p><strong>Email: </strong>{agentCompany.email}</p>
                            <p><strong>Phone Number: </strong>{agentCompany.phonenumber}</p>
                            {console.log(agentCompany.location)}
                            <p><strong>Location: </strong><span className='text-uppercase'>{agentCompany.location && `${agentCompany.location.region || ''}, ${agentCompany.location.district || ''}, ${agentCompany.location.ward || ''}`}</span></p>
                            <p>
                                <strong>Admin: </strong>
                                {agentCompany.admin ?
                                    <>
                                        <Popover content='view admin'>
                                            <Tag color='success' style={{ cursor: 'pointer' }} onClick={() => hist.replace(`/user/${agentCompany.admin._id}`, agentCompany.admin)}>{`${agentCompany.admin.firstName} ${agentCompany.admin.lastName}`}</Tag>
                                        </Popover>
                                        {/* <Button size='small' type='text' onClick={() => { }}><EditOutlined /></Button> */}
                                    </>
                                    :
                                    <>
                                        <Tag color='lime'>Not assigned</Tag>
                                        <ShowForRole allowedRoles={['ROLE_SUPER_ADMIN']}>
                                            <Popover content='Assign Admin'>
                                                <Button size='small' type='text' onClick={() => { }}><PlusOutlined style={{ fontSize: '15px' }} /></Button>
                                            </Popover>
                                        </ShowForRole>
                                    </>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 w-100">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <div>
                                Assigned Products
                            </div>
                            <AssignProducts agentCompanyId={agentCompany._id} getAssociatedProducts={getAssociatedProducts} />
                        </div>
                        {/* <Button onClick={getAssociatedProducts} >Get</Button> */}

                        <div className="card-body px-0">
                            {/* <Button onClick={getAssociatedProducts} >Get</Button> */}

                            {agentsProductList.loading ?
                                <Skeleton active />
                                :
                                <BootstrapTable options={{ onRowClick: (row) => hist.push(`/agents/${row._id}`, row) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={agentsProductList.data} pagination scrollTop='Top' striped hover >
                                    <TableHeaderColumn dataField='from' isKey widt='150'>From Product with Token</TableHeaderColumn>
                                    <TableHeaderColumn dataField='to' widt='150'>From Product with Token</TableHeaderColumn>
                                </BootstrapTable>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
