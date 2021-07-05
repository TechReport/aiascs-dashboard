import { Affix, Button, PageHeader, Tag, message, Input, Popover, Skeleton, Modal } from "antd";
import Paragraph from "antd/lib/skeleton/Paragraph";

import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
// import { userAPI } from '../../Pages/Hybrid/Users/userAPI';
import { userAPI } from '../../../Hybrid/Users/userAPI';

// import AddNewUser from "./AddNewUser";
import { ShowForRole } from "../../../../Components/Authentication/CheckPermission";
import AssignAdmin from "../../../../Components/Company/AssignAdmin";
// import Users from "./Users";
import eventEmitter from "../../../../Services/EventEmitter";
import Edit from "../../../../Components/Company/Edit";
import LogoInput from './LogoInput'
// import EditAddress from "./EditAddress";

/**
 * @param resource enum [qualitycontrollers, manufacture, productAgent]
 * @param companyType enum [qualityController, manufacture, productAgent]
 * @param updateEvent enum [updateQualityControllers, updateManufacturers, updateProductAgents]
 */
export default function ProfileTemplate({ companyAPI, companyType, resource, companyId }) {

    const [top] = useState(0)
    const [company, setCompany] = useState({ loading: false, data: {} })
    const [loading, setLoading] = useState(false)

    const [isDeleteCompanyModalVisible, setIsDeleteCompanyModalVisible] = useState(false);
    const [isAssignAdminModalVisible, setIsAssignAdminModalVisible] = useState(false);
    const [setIsAddUserModalVisible] = useState(false);

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
    eventEmitter.on('companyEdited', () => {
        getCompanyDetails()
        closeEditModal()
    })



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
    function getCompanyDetails() {
        setCompany({ loading: true, data: {} })
        companyAPI.getSingle(`${resource}`, companyId)
            .then(res => {
                setCompany({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
                setCompany({ loading: false, data: {} })
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
        getCompanyDetails()
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
                    title={company.data.name}
                    extra={
                        <>
                            {company.loading && <Button type='text' loading={company.loading}>Loading</Button>}
                            <Button type='ghost' onClick={showEditModal} loading={loading || company.loading}>Edit</Button>
                            <Button type='danger' loading={loading || company.loading} onClick={showDeleteCompanyModal}>Delete</Button>
                        </>
                    }
                    subTitle={<Tag color='geekblue'>{company.data.regno}</Tag>}
                />
                <Edit
                    isModalVisible={editModalVisible}
                    handleCancel={closeEditModal}
                    data={company.data}
                    companyAPI={companyAPI}
                    companyType={companyType}
                    resource={resource}
                />

                <Modal
                    title={<div>Delete  <Tag color='gold'>{company.data.name}</Tag> Company</div>}
                    visible={isDeleteCompanyModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}>
                    <p>
                        You have issued to delete <Tag color='gold'>{company.data.name}</Tag>. Please note that that this
                        process is <Tag color='geekblue'>IRREVERSIBLE</Tag>.
                    </p>
                    <p>Type the name of company below to approve action</p>
                    <Input className='text-center' value={deleteCompanyCheck} onChange={(e) => setDeleteCompanyCheck(e.target.value)} />
                    <div className='mt-3 text-right'>
                        <Button type='ghost' className='mr-1' onClick={handleCancel}>Dismiss</Button>
                        <Button type='danger' disabled={!(company.data.name === deleteCompanyCheck)} onClick={deleteCompany} loading={loading} >DELETE</Button>
                    </div>
                </Modal>
            </Affix>

            {company.loading ?
                <div className="card">
                    <div className="card-body">
                        <Skeleton avatar active />
                    </div>
                </div>
                :
                <div className="card mt-n4 shadow-sm border-0">
                    <div className="row w-100">
                        <div className="col-12 col-xl-6">
                            <div className="jumbotron shadow-sm h-100 bg-white p-3">
                                <div className="row justify-content-between">
                                    <div className="col-6">
                                        <p><strong>Company Name: </strong>{company.data.name}</p>
                                        <p><strong>Registered Date: </strong>{moment(company.data.createdAt).format('')}</p>
                                        <p><strong>Regisitration No: </strong>{company.data.regno}</p>
                                        <p><strong>Email: </strong>{company.data.email}</p>
                                        <p><strong>Phone Number: </strong>{company.data.phonenumber}</p>
                                        <p><strong>Location: </strong><span className='text-uppercase'>{company.data.location && `${company.data.location.region}, ${company.data.location.district}, ${company.data.location.ward}`}</span></p>
                                        <p>
                                            <strong>Admin: </strong>
                                            {company.data.admin ?
                                                <>
                                                    <Tag color='success' style={{ cursor: 'pointer' }} onClick={() => hist.replace(`/user/${company.data.admin._id}`, company.data.admin)}>{`${company.data.admin.firstName} ${company.data.admin.lastName}`}</Tag>
                                                    <Button size='small' type='text' onClick={() => setIsAssignAdminModalVisible(true)}><EditOutlined /></Button>
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
                                    <div className="col-3">
                                        <p><strong>Company Logo: </strong></p>
                                        <LogoInput companyId={company.data._id} logo={company.data.logo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-6">
                            {admin.loading ?
                                <Skeleton active >
                                    <Paragraph />
                                </Skeleton>
                                :
                                <div className="jumbotron bg-white shadow-sm h-100 bg-white p-3">
                                    <h5>Administrator Informations</h5>
                                    {company.data.admin ?
                                        <>
                                            <p><strong>Name: </strong>{`${company.data.admin.firstName} ${company.data.admin.lastName}`}</p>
                                            <p><strong>Email: </strong>{company.data.admin.email}</p>
                                            <p><strong>Gender: </strong>{company.data.admin.gender}</p>
                                            <p><strong>Phone Number: </strong>{company.data.admin.phoneNumber}</p>
                                            <p><strong>Registered At: </strong>{company.data.admin.createdAt}</p>
                                            <Button onClick={() => hist.push(`/user/${company.data.admin._id}`, company.data.admin)}>View More</Button>
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
            }

            {/* <div className="row w-100 mt-4">
                <div className="col-12 col-lg-8 col-xl-6">
                    <div className="card">
                        <div className="card-header">EDIT OR ADD POSTAL ADDRESS</div>
                        <div className="card-body px-2 text-center">
                            {company.data.postalBox ?
                                <span className='alert alert-info'>Current Address: PO BOX {`${company.data.postalBox.boxNumber} ${company.data.postalBox.boxLocation.region.toUpperCase()}, ${company.data.postalBox.boxLocation.country.toUpperCase()}`}  </span>
                                :
                                <span className='alert alert-info'>Sample Address: PO BOX 7261 ARUSHA, TANZANIA</span>
                            }
                            <div className='mt-4'>
                                <EditAddress companyId={company.data._id} companyAPI={companyAPI} setCompany={setCompany} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div >
    )
}
