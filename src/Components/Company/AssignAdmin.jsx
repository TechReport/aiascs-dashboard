import { Alert, Button, message, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { userAPI } from '../../Pages/Hybrid/Users/userAPI';
import eventEmitter from '../../Services/EventEmitter';
import AddNewUser from './AddNewUser';

export default function AssignAdmin({ handleOk, companyId, setCompany, companyAPI, companyType }) {
    let role = ''
    switch (companyType) {
        case 'manufacture':
            role = ['ROLE_MANUFACTURING_COMPANY_ADMIN']
            break;
        case 'qualityController':
            role = ['ROLE_QUALITY_CONTROLLER_ADMIN']
            break;
        case 'productAgent':
            role = ['ROLE_AGENT_COMPANY_ADMIN']
            break;
        default:
            role = []
            break;
    }
    const [current, setCurrent] = useState(0)
    const [users, setUsers] = useState({ loading: false, data: [] })

    const [selectedAdmin, setSelectedAdmin] = useState("")

    const { Option } = Select;
    // const filter = {
    //     role:
    // }
    // TODO
    // getByRole('usr/role', { role: { genericName: 'ROLE_MANUFACTURING_COMPANY_ADMIN' } })
    async function fetchAdministrators() {
        userAPI.getCompanyUserByRole({ role: { genericName: role }, companyId }, 'firstName lastName email',)
            .then(res => {
                setUsers({ loading: false, data: res })
            }).catch(err => {
                console.log(err)
                setUsers({ loading: false, data: [] })
            })
    }

    async function assignAdmin() {
        companyAPI.assignAdmin(`${companyType}/assignAdmin`, companyId, selectedAdmin)
            .then(res => {
                console.log(res)
                setCompany(prevState => {
                    prevState.admin = res.admin
                    return { ...prevState };
                });
                eventEmitter.emit('updatedAdmin', res.admin)
                message.success('Admin added succesfully')
                handleOk()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchAdministrators()
        return () => {
            setUsers({ loading: false, data: [] })
        }
        // eslint-disable-next-line
    }, [])

    const steps = [
        {
            title: 'Select From Existing Users',
            content: <AssignFromExistingUsers />,
        },
        {
            title: 'Create new user',
            content: <AddNewUser
                handleOk={handleOk}
                companyId={companyId}
                type={companyType} />,
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