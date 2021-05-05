import React, { useState } from 'react'
import { DashboardWidgetCard } from '../Reusable'
import {
    UserAddOutlined
} from '@ant-design/icons';
import { Button, Modal } from 'antd'


export default function CompanyHome({ data, RegisterCompany, RegisteredCompanies }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [userUpdated, setUserUpdated] = useState(false)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // setUserUpdated(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className='row mt-3 w-100' >
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>

            <div className="mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        Register Company
                        <UserAddOutlined className='' />
                    </Button>
                    <Modal title="Register Manufacturing Company"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <RegisterCompany handleCancel={handleCancel} handleOk={handleOk} />
                    </Modal>
                </div>
            </div>
            <div className="mt-4">
                <div className="row w-100">
                    <div className="col-8">
                        <div className="card shadow">
                            <div className="card-header bg-white border-0">
                                <div className="title" style={{ fontSize: 'medium' }}>Registered Companies</div>
                            </div>
                            <div className="card-body mt-n5">
                                <RegisteredCompanies />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
