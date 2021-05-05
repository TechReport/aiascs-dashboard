import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import DashboardWidgetCard from '../../../Components/Reusable/DashboardWidgetCard'
import {
    UserAddOutlined
} from '@ant-design/icons';

import RegisteredAgents from './RegisteredAgents';
import RegisterAgentsCompany from './RegisterAgentsCompany';
import withCompanyProfile from '../../../HOC/withCompany/withCompanyHome';
import eventEmitter from '../../../Services/EventEmitter';


function Agents({ isModalVisible, showModal, handleOk, handleCancel, data }) {
    eventEmitter.on('closeModal', handleOk)

    return (
        <div>
            <div className='row mt-3 w-100' gutter={12} >
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>
            <div className="mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        Register Agent Company
                        <UserAddOutlined />
                    </Button>
                    <Modal title="Register Agents Company"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <RegisterAgentsCompany handleCancel={handleCancel} handleOk={handleOk} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default withCompanyProfile(Agents,
    { RegisteredCompanies: RegisteredAgents },
    { from: 'agents' }
)