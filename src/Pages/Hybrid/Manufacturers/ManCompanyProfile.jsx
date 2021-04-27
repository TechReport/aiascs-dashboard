import { Affix, Button, PageHeader, Tag, message, Input, Popover } from "antd";
import {
    EditOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import { manufacturerAPI } from "./manufacturerAPI";
import Modal from "antd/lib/modal/Modal";
// import AddNewUser from "../../Manufacturer/Users/AddNewUser";
import AssignAdmin from "./AssignAdmin";


export default function ManCompanyProfile(props) {
    const [top] = useState(0)
    const [company, setCompany] = useState(props.location.state)
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssignAdminModalVisible, setIsAssignAdminModalVisible] = useState(false);

    const [deleteCompanyCheck, setDeleteCompanyCheck] = useState('')

    // const [userUpdated, setUserUpdated] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setLoading(false)
    };

    const showAssignAdminModal = () => {
        setIsAssignAdminModalVisible(true)
    }

    const handleCancelAssignAdminModal = () => {
        setIsAssignAdminModalVisible(false)
    }


    const hist = useHistory()


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


    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={company.name}
                    extra={<>
                        <Button type='ghost' >Deactivate</Button>
                        <Button type='danger' loading={loading} onClick={showModal}>Delete</Button>
                    </>}
                    subTitle={<Tag color='gold'>{company._id}</Tag>}
                />

                <Modal
                    title={<div>Delete  <Tag color='gold'>{company.name}</Tag> Company</div>}
                    visible={isModalVisible}
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

            <div className="card border-0 shadow-sm">
                <div className="row">
                    <div className="col-6">
                        <div className="jumbotron bg-white p-3">
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
                                        <Button size='small' type='text' onClick={showAssignAdminModal}><EditOutlined /></Button>
                                    </>
                                    :
                                    <>
                                        <Tag color='lime'>Not assigned</Tag>
                                        <Popover content='Assign Admin'>
                                            <Button size='small' type='text' onClick={showAssignAdminModal}><PlusOutlined style={{fontSize:'15px'}} /></Button>
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
                        <div className="jumbotron bg-white"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
