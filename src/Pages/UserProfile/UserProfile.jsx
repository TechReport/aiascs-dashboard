import { Affix, Button, PageHeader, Tag } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { useState, useEffect } from 'react'
import {
    UserOutlined,
    ManOutlined,
    WomanOutlined
} from '@ant-design/icons'

export default function UserProfile() {
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    const [top] = useState(0)


    useEffect(() => {
        console.log(user)
        return () => {
            console.log('exiting')
        }
    }, [user])
    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="bg-light"
                    title={`${user.firstName} ${user.lastName}`}
                    extra={<>
                        <Button type='ghost'>Edit</Button>
                        <Button type='danger'>Delete</Button>
                    </>}
                    subTitle={<Tag color='green'>{user.role.name}</Tag>}
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
                                <p><strong>Gender: </strong>{user.gender} {user.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}</p>
                                <p><strong>Email Verified: </strong>{<Tag>{user.emailVerified ? 'Verified' : 'Not Verified'}</Tag>}</p>
                                <p><strong>Phone Number: </strong>{user.phoneNumber}</p>
                                <p><strong>Registered At: </strong>{user.createdAt}</p>
                                <p><strong>Location: </strong>{user.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
