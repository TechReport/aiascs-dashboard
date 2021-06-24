import { Affix, Button, message, PageHeader, Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    UserOutlined,
    ManOutlined,
    WomanOutlined,
    EditOutlined
} from '@ant-design/icons'
import EditUser from './Edit'

import { userAPI } from '../userAPI'

export default function UserProfile(props) {
    console.log(props)
    const hist = useHistory()
    const [user, setUser] = useState(props.location.state)
    const [top] = useState(0)

    const [editUserModal, setEditUserModal] = useState(false)

    function assignCompany() {
        alert('on development')
    }

    async function deleteUser() {
        const deleteUser = window.confirm('Confirm to delete user')
        if (deleteUser) {
            await userAPI.deleteOne('user', user._id)
                .then(res => {
                    console.log(res)
                    message.success(res.message)
                    hist.goBack()

                }).catch(error => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        return () => {
            setUser({})
        }
    }, [])

    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="bg-light"
                    title={`${user.firstName} ${user.lastName}`}
                    onBack={() => hist.goBack()}
                    extra={<>
                        <Button type='ghost' onClick={() => setEditUserModal(true)}>Edit</Button>
                        <Button type='danger' onClick={deleteUser}>Delete</Button>
                    </>}
                    subTitle={<Tag color='green'>{user.role.name}</Tag>}
                />
                <EditUser
                    isModalVisible={editUserModal}
                    handleCancel={() => setEditUserModal(false)}
                    updateUser={setUser}
                    data={user}
                />
            </Affix>
            <div className="card border-0 shadow-sm">
                <div className="row">
                    <div className="col-auto">
                        <Avatar icon={<UserOutlined />} size={250} shape='square' />
                    </div>
                    <div className="col">
                        <div className="row py-3">
                            <div className="col">
                                <p><strong>Name: </strong>{`${user.firstName} ${user.lastName}`}</p>
                                <p><strong>Emal: </strong>{user.email}</p>
                                <p>
                                    <strong>Company: </strong>
                                    {user.companyId ?
                                        <span>{user.companyId.name}</span>
                                        :
                                        <>
                                            <Tag>Not Assigned</Tag>
                                            {/* <Button type='text' size='small' onClick={assignCompany}><EditOutlined /></Button> */}
                                        </>
                                    }
                                </p>
                                <p><strong>Gender: </strong>{user.gender} {user.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}</p>
                                <p><strong>Email Verified: </strong>{<Tag>{user.emailVerified ? 'Verified' : 'Not Verified'}</Tag>}</p>
                                <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
                                <p><strong>Registered At: </strong>{user.createdAt}</p>
                                {user.location &&
                                    <p><strong>Location: </strong><span className='text-uppercase'>{`${user.location.region} | ${user.location.district} | ${user.location.ward}`}</span></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
