import { Affix, Button, PageHeader, Tag, message, Input, Popover, Skeleton } from "antd";
import Paragraph from "antd/lib/skeleton/Paragraph";

import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";
import { userAPI } from '../../Pages/Hybrid/Users/userAPI';
import AddNewUser from "./AddNewUser";
import ShowForPermission, { ShowForRole } from "../../Components/Authentication/CheckPermission";
import AssignAdmin from "./AssignAdmin";
import Users from "./Users";
import eventEmitter from "../../Services/EventEmitter";
import Edit from "./Edit";

/**
 * @param resource enum [qualitycontrollers, manufacture, productAgent]
 * @param companyType enum [qualityController, manufacture, productAgent]
 * @param updateEvent enum [updateQualityControllers, updateManufacturers, updateProductAgents]
 */
export default function CompanyProfile({ companyData, companyAPI, companyType, resource, updateEvent }) {
    const [top] = useState(0)
    const [company, setCompany] = useState(companyData)
    const [loading, setLoading] = useState(false)

    const [isDeleteCompanyModalVisible, setIsDeleteCompanyModalVisible] = useState(false);
    const [isAssignAdminModalVisible, setIsAssignAdminModalVisible] = useState(false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

    const [deleteCompanyCheck, setDeleteCompanyCheck] = useState('')
    const [admin, setAdmin] = useState({ loading: false, data: '' })

    const showDeleteCompanyModal = () => {
        setIsDeleteCompanyModalVisible(true);
        // setLoading(true)
    };

    const handleCancel = () => {
        setIsDeleteCompanyModalVisible(false);
        setIsAddUserModalVisible(false)
        // setLoading(false)
    };

    const showAssignAdminModal = () => {
        setIsAssignAdminModalVisible(true)
    }

    const handleCancelAssignAdminModal = () => {
        setIsAssignAdminModalVisible(false)
    }

    eventEmitter.on('updatedAdmin', (event) => setAdmin({ loading: false, data: event }))


    // EDIT COMPANY INFO 
    const [editModalVisible, setEditModalVisible] = useState(false)

    const showEditModal = () => {
        setEditModalVisible(true)
    }

    const closeEditModal = () => {
        setEditModalVisible(false)
    }


    // END OFO EDIT COMPANY
    const hist = useHistory()

    function fetchAdmin() {
        setAdmin({ loading: true, data: '' })
        userAPI.getSingle('user', company.admin._id)
            .then(data => {
                console.log(data)
                setAdmin({ loading: false, data })
            })
            .catch(error => {
                console.log(error)
                setAdmin({ loading: false, data: '' })
            })
    }

    function deleteCompany(e) {
        setLoading(true)
        companyAPI.deleteOne(`${resource}/`, company._id)
            .then(res => {
                console.log(res)
                message.success('Company Deleted Successfully')
                hist.goBack()
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        company.admin &&
            fetchAdmin()
        return () => {
            setAdmin({})
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div className="mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={company.name}
                    extra={
                        <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_SUPER_ADMIN']}>
                            <Button type='ghost' onClick={showEditModal} >Edit</Button>
                            {/* <Button type='ghost' >Deactivate</Button> */}
                            <Button type='danger' loading={loading} onClick={showDeleteCompanyModal}>Delete</Button>
                        </ShowForRole>}
                    subTitle={<Tag color='gold'>{company._id}</Tag>}
                />
                <Edit
                    isModalVisible={editModalVisible}
                    handleCancel={closeEditModal}
                    data={companyData}
                    companyAPI={companyAPI}
                    companyType={companyType}
                    resource={resource}
                />

                <Modal
                    title={<div>Delete  <Tag color='gold'>{company.name}</Tag> Company</div>}
                    visible={isDeleteCompanyModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}>
                    <p>
                        You have issued to delete <Tag color='gold'>{company.name}</Tag>. Please note that that this
                        process is <Tag color='geekblue'>IRREVERSIBLE</Tag>.
                    </p>
                    <p>Type the name of company below to approve action</p>
                    <Input className='text-uppercase text-center' value={deleteCompanyCheck} onChange={(e) => setDeleteCompanyCheck(e.target.value)} />
                    <div className='mt-3 text-right'>
                        <Button type='ghost' className='mr-1' onClick={handleCancel}>Dismiss</Button>
                        <Button type='danger' disabled={!(company.name.toUpperCase() === deleteCompanyCheck.toUpperCase())} onClick={deleteCompany} loading={loading} >DELETE</Button>
                    </div>
                </Modal>
            </Affix>

            <div className="card shadow-sm">
                <div className="row">
                    <div className="col-6 shadow-s">
                        <div className="jumbotron shadow-sm h-100 bg-white p-3">
                            <p><strong>Company Name: </strong>{company.name}</p>
                            <p><strong>Registered Date: </strong>{moment(company.createdAt).format('')}</p>
                            <p><strong>Regisitration No: </strong>{company.regno}</p>
                            <p><strong>Email: </strong>{company.email}</p>
                            <p><strong>Phone Number: </strong>{company.phonenumber}</p>
                            <p><strong>Location: </strong><span className='text-uppercase'>{company.location && `${company.location.region}, ${company.location.district}, ${company.location.ward}`}</span></p>
                            <p>
                                <strong>Admin: </strong>
                                {company.admin ?
                                    <>
                                        <Popover content='view admin'>
                                            <Tag color='success' style={{ cursor: 'pointer' }} onClick={() => hist.replace(`/user/${company.admin._id}`, company.admin)}>{`${company.admin.firstName} ${company.admin.lastName}`}</Tag>
                                        </Popover>
                                        <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_SUPER_ADMIN']}>
                                            <Button size='small' type='text' onClick={() => setIsAssignAdminModalVisible(true)}><EditOutlined /></Button>
                                        </ShowForRole>
                                    </>
                                    :
                                    <>
                                        <Tag color='lime'>Not assigned</Tag>
                                        <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_SUPER_ADMIN']}>
                                            <Popover content='Assign Admin'>
                                                <Button size='small' type='text' onClick={() => setIsAssignAdminModalVisible(true)}><PlusOutlined style={{ fontSize: '15px' }} /></Button>
                                            </Popover>
                                        </ShowForRole>
                                    </>
                                }
                                <Modal
                                    title='Assign Admin'
                                    visible={isAssignAdminModalVisible}
                                    onCancel={handleCancelAssignAdminModal}
                                    footer={null}
                                    destroyOnClose={true}>
                                    <AssignAdmin setCompany={setCompany} handleOk={() => setIsAssignAdminModalVisible(false)} companyId={company._id} companyAPI={companyAPI} companyType={companyType} />
                                </Modal>
                            </p>
                        </div>
                    </div>
                    <div className="col-6">
                        {admin.loading ?
                            <Skeleton active >
                                <Paragraph />
                            </Skeleton>
                            :
                            <div className="bg-white pt-2">
                                <h5>Administrator Informations</h5>
                                {admin.data ?
                                    <>
                                        <p><strong>Name: </strong>{`${admin.data.firstName} ${admin.data.lastName}`}</p>
                                        <p><strong>Email: </strong>{admin.data.email}</p>
                                        <p><strong>Gender: </strong>{admin.data.gender}</p>
                                        <p><strong>Phone Number: </strong>{admin.data.phoneNumber}</p>
                                        <p><strong>Role: </strong><Tag color='green'>{admin.data.role.name}</Tag></p>
                                        <p><strong>Registered At: </strong>{admin.data.createdAt}</p>
                                    </>
                                    :
                                    <div className=''>
                                        <Tag color='lime'>Admin is Not assigned</Tag> <br />
                                        <ShowForRole allowedRoles={['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']}>
                                            <Button size='small' className='mt-2' type='primary' onClick={showAssignAdminModal}>Assign Admin</Button>
                                        </ShowForRole>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header py-2">
                            <div className='d-flex p-0'>
                                <h5>Users</h5>
                                <ShowForPermission allowedPermissions='createUser'>
                                    {/*TODO <Button size='small' type='primary' className='ml-auto' onClick={() => setIsAddUserModalVisible(true)}>Add Users</Button> */}

                                    <Modal title="Add User"
                                        visible={isAddUserModalVisible}
                                        onCancel={handleCancel}
                                        footer={null}
                                        destroyOnClose={true}>
                                        <AddNewUser
                                            // company={{ id: company._id, type: 'manufacture' }}
                                            companyId={company._id}
                                            type={companyType}
                                            // role={['ROLE_OPERATION_PERSONNEL_MAN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']}
                                            handleOk={() => {
                                                setIsAddUserModalVisible(false)
                                            }} />
                                    </Modal>
                                </ShowForPermission>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Users companyId={company._id} companyAPI={companyAPI} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
