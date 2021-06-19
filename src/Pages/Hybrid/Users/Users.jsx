import UserList from './UserList';
import {
    UserAddOutlined
} from '@ant-design/icons';
import AddNewUser from './AddNewUser';
import Modal from 'antd/lib/modal/Modal';

import ShowForPermission, { ShowForRole } from '../../../Components/Authentication/CheckPermission'
import { Button } from 'antd';
import { useState } from 'react';

export default function Users() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className="container-fluid mt-4">
                <div className="actions">
                    <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_QUALITY_CONTROLLER_ADMIN']}>
                        <ShowForPermission allowedPermissions='createUser'>
                            <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                                Add User <UserAddOutlined className='' />
                            </Button>

                            <Modal title="Add User"
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                                destroyOnClose={true}>
                                <AddNewUser handleOk={handleOk} />
                            </Modal>
                        </ShowForPermission>
                    </ShowForRole>
                </div>
            </div>
            <div className="container-fluid row w-100 mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-white border-0">
                            <div className="title h5 text-muted">All users</div>
                        </div>
                        <div className="card-body py-1 px-2">
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
