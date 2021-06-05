import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Affix, Button, PageHeader, Tag, message, Input, Popover, Skeleton } from "antd";
// import Paragraph from "antd/lib/skeleton/Paragraph";

import moment from 'moment';
import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { manufacturerAPI } from '../../Manufacturers/manufacturerAPI';
import { agentsCompanyAPI } from '../agentsCompanyAPI';
import { AuthContext } from '../../../../Context/AuthContext';

export default function CompanySubProfile(props) {
    const { state } = useContext(AuthContext)
    const [agentCompany, setAgentCompany] = useState(props.location.state)
    const [associatedCompanies, setAssociatedCompanies] = useState({ loading: false, data: [] })
    console.log(state)

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
        await agentsCompanyAPI.associateToManufactureringCompany(agentCompany._id, state.currentUser.companyId)
            .then(data => setAssociatedCompanies({ loading: false, data }))
            .catch(error => {
                console.log(error)
            })
    }


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
                        <Button type='ghost' onClick={() => assignToManCompany()} >Assign As Agent</Button>
                        {/* <Button type='danger' onClick={() => { }}>Delete</Button> */}
                    </>}
                    subTitle={<Tag color='gold'>{agentCompany._id}</Tag>}
                />
            </Affix>

            <div className="card shadow-sm">
                <div className="row w-100">
                    <div className="col-6 shadow-s">
                        <div className="jumbotron shadow-s h-100 bg-white p-3">
                            <p><strong>Company Name: </strong>{agentCompany.name}</p>
                            <p><strong>Registered Date: </strong>{moment(agentCompany.createdAt).format('')}</p>
                            <p><strong>Regisitration No: </strong>{agentCompany.regno}</p>
                            <p><strong>Email: </strong>{agentCompany.email}</p>
                            <p><strong>Phone Number: </strong>{agentCompany.phonenumber}</p>
                            <p><strong>Location: </strong><span className='text-uppercase'>{agentCompany.location && `${agentCompany.location.region}, ${agentCompany.location.district}, ${agentCompany.location.ward}`}</span></p>
                            <p>
                                <strong>Admin: </strong>
                                {agentCompany.admin ?
                                    <>
                                        <Popover content='view admin'>
                                            <Tag color='success' style={{ cursor: 'pointer' }} onClick={() => hist.replace(`/user/${agentCompany.admin._id}`, agentCompany.admin)}>{`${agentCompany.admin.firstName} ${agentCompany.admin.lastName}`}</Tag>
                                        </Popover>
                                        <Button size='small' type='text' onClick={() => { }}><EditOutlined /></Button>
                                    </>
                                    :
                                    <>
                                        <Tag color='lime'>Not assigned</Tag>
                                        <Popover content='Assign Admin'>
                                            <Button size='small' type='text' onClick={() => { }}><PlusOutlined style={{ fontSize: '15px' }} /></Button>
                                        </Popover>
                                    </>
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
