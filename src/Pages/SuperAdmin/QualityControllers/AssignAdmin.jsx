import { Alert, Button, message, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import AddNewUser from '../../Manufacturer/Users/AddNewUser';
import { userAPI } from '../../Manufacturer/Users/userAPI';
import { adminAPI } from '../adminAPI';

export default function AssignAdmin({ handleOk, companyId, setQController }) {
    const [current, setCurrent] = useState(0)
    const [users, setUsers] = useState({ loading: false, data: [] })

    const [selectedAdmin, setSelectedAdmin] = useState("")

    const { Option } = Select;

    async function fetchUsers() {
        userAPI.getByRole('user/role', { genericName: 'ROLE_QUALITY_CONTROLLER_ADMIN' }, 'firstName lastName email')
            .then(res => {
                setUsers({ loading: false, data: res })
            }).catch(err => {
                console.log(err)
                setUsers({ loading: false, data: [] })
            })
    }

    async function assignAdmin() {
        adminAPI.assignAdmin('qualitycontrollers/assignAdmin', companyId, selectedAdmin)
            .then(res => {
                console.log(res)
                setQController(prevState => {
                    prevState.admin = res.admin
                    return { ...prevState };
                });
                message.success('Admin added succesfully')
                handleOk()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUsers()
        return () => {
            setUsers({ loading: false, data: [] })
        }
    }, [])

    const steps = [
        {
            title: 'Select From Existing Users',
            content: <AssignFromExistingUsers />,
        },
        {
            title: 'Create new user',
            content: <AddNewUser handleOk={handleOk} role='ROLE_QUALITY_CONTROLLER_ADMIN' />,
        }
    ];

    function AssignFromExistingUsers() {
        return (
            <div>
                <p>Select User from the list below </p>
                <Select
                    showSearch
                    loading={users.loading}
                    disabled={users.data.length === 0}
                    value={selectedAdmin}
                    onChange={(e) => setSelectedAdmin(e)}
                    style={{ width: '100%' }}
                    placeholder={users.data.length > 0 ? "Search to Select" : 'No User To With Admin role. Create one '}
                    optionFilterProp="children" >
                    {users.data.map(user => <Option value={user._id} onC>{`${user.firstName} ${user.lastName} (${user.email})`}</Option>)}
                </Select>
                {!users.loading && users.data.length === 0 &&
                    <Alert message='Please create a user with role admin to be able to assign admin to the company' type='info' className='mt-3' />
                }
                <div className="text-right mt-4">
                    <Button type="ghost" className='mr-2' onClick={() => setCurrent(1)} >
                        Create New User
                    </Button>
                    <Button type="primary" htmlType="submit" loading={users.loading} disabled={users.data.length === 0 || selectedAdmin === ""} onClick={assignAdmin}>
                        Assign Admin
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="steps-content">{steps[current].content}</div>
        </div>
    )
}