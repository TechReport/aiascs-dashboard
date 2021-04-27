import { Affix, Button, PageHeader, Tag, message, Input, Popover, Skeleton } from "antd";
import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import { manufacturerAPI } from "../manufacturerAPI";
import Modal from "antd/lib/modal/Modal";
// import AddNewUser from "../../Manufacturer/Users/AddNewUser";
import AssignAdmin from "./AssignAdmin";
import { userAPI } from "../../Users/userAPI";
import Paragraph from "antd/lib/skeleton/Paragraph";
import Users from "./Users";
import ShowForPermission from "../../../../Components/Authentication/CheckPermission";
import AddNewUser from "../../../Manufacturer/Users/AddNewUser";
import eventEmitter from "../../../../Services/EventEmitter";
import ProductList from "../Products/ProductList";

export default function ManCompanyProfile(props) {
    const [top] = useState(0)
    const [company, setCompany] = useState(props.location.state)
    const [loading, setLoading] = useState(false)

    const [isDeleteCompanyModalVisible, setIsDeleteCompanyModalVisible] = useState(false);
    const [isAssignAdminModalVisible, setIsAssignAdminModalVisible] = useState(false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

    const [deleteCompanyCheck, setDeleteCompanyCheck] = useState('')
    const [admin, setAdmin] = useState({ loading: false, data: '' })

    // const [userUpdated, setUserUpdated] = useState(false)

    const showDeleteCompanyModal = () => {
        setIsDeleteCompanyModalVisible(true);
        setLoading(true)
    };

    const handleCancel = () => {
        setIsDeleteCompanyModalVisible(false);
        setIsAddUserModalVisible(false)
        setLoading(false)
    };

    const showAssignAdminModal = () => {
        setIsAssignAdminModalVisible(true)
    }

    const handleCancelAssignAdminModal = () => {
        setIsAssignAdminModalVisible(false)
    }

    eventEmitter.on('updatedAdmin', (event) => setAdmin({ loading: false, data: event }))


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

    function fetchUsers() {
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
        manufacturerAPI.deleteOne('manufacture/', company._id)
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
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={company.name}
                    extra={<>
                        <Button type='ghost' >Deactivate</Button>
                        <Button type='danger' loading={loading} onClick={showDeleteCompanyModal}>Delete</Button>
                    </>}
                    subTitle={<Tag color='gold'>{company._id}</Tag>}
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
                        <Button type='danger' disabled={!(company.name.toUpperCase() === deleteCompanyCheck.toUpperCase())} onClick={deleteCompany}>DELETE</Button>
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
                            <p><strong>Location: </strong>{company.location && `${company.location.country}, ${company.location.district}`}</p>
                            <p>
                                <strong>Admin: </strong>
                                {company.admin ?
                                    <>
                                        <Popover content='view admin'>
                                            <Tag color='success' style={{ cursor: 'pointer' }} onClick={() => hist.replace(`/user/${company.admin._id}`, company.admin)}>{`${company.admin.firstName} ${company.admin.lastName}`}</Tag>
                                        </Popover>
                                        <Button size='small' type='text' onClick={() => setIsAssignAdminModalVisible(true)}><EditOutlined /></Button>
                                    </>
                                    :
                                    <>
                                        <Tag color='lime'>Not assigned</Tag>
                                        <Popover content='Assign Admin'>
                                            <Button size='small' type='text' onClick={() => setIsAssignAdminModalVisible(true)}><PlusOutlined style={{ fontSize: '15px' }} /></Button>
                                        </Popover>
                                    </>
                                }
                                <Modal
                                    title='Assign Admin'
                                    visible={isAssignAdminModalVisible}
                                    onCancel={handleCancelAssignAdminModal}
                                    footer={null}
                                    destroyOnClose={true}>
                                    <AssignAdmin setCompany={setCompany} handleOk={() => setIsAssignAdminModalVisible(false)} companyId={company._id} />
                                    {/* <AddNewUser handleOk={() => setIsAssignAdminModalVisible(false)} role='ROLE_MANUFACTURING_COMPANY_ADMIN' /> */}
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
                                        <Button size='small' className='mt-2' type='primary' onClick={showAssignAdminModal}>Assign Admin</Button>
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
                                    {/* <Button type='ghost' size='middle' className='rounded-pill' onClick={()=>)}>
                                        Add User <UserAddOutlined className='' />
                                    </Button> */}
                                    <Button size='small' type='primary' className='ml-auto' onClick={() => setIsAddUserModalVisible(true)}>Add Users</Button>

                                    <Modal title="Add User"
                                        visible={isAddUserModalVisible}
                                        onCancel={handleCancel}
                                        footer={null}
                                        destroyOnClose={true}>
                                        <AddNewUser
                                            // company={{ id: company._id, type: 'manufacture' }}
                                            companyId={company._id}
                                            type='manufacture'
                                            role={['ROLE_OPERATION_PERSONNEL_MAN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']}

                                            handleOk={() => {
                                                setIsAddUserModalVisible(false)
                                                fetchUsers()
                                            }} />
                                    </Modal>
                                </ShowForPermission>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <Users companyId={company._id} />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="h5 card-header bg-white border-0">
                            Products
                        </div>
                        <div className="card-body mt-n5 py-2 px-0">
                            <ProductList companyId={company._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
