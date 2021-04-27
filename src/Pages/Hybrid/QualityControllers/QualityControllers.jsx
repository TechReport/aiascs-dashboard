import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useState } from 'react'
import DashboardWidgetCard from '../../../Components/Reusable/DashboardWidgetCard'
// import RegisteredManufacturers from './RegisteredManufacturers'
import {
    UserAddOutlined
} from '@ant-design/icons';
import RegisteredQualityControllers from './RegisteredQualityControllers';
import RegisterQualityControllers from './RegisterQualityControllers';

export default function QualityControllers() {
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
    ]

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
            <div className='row mt-3 w-100' gutter={12} >
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>
            <div className="mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        Register Quality Controller Company
                        <UserAddOutlined className='' />
                    </Button>
                    <Modal title="Register Quality Controlling Company"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <RegisterQualityControllers handleCancel={handleCancel} handleOk={handleOk} />
                    </Modal>
                </div>
            </div>

            <div className="mt-4">
                <div className="row w-100">
                    <div className="col-8">
                        <div className="card shadow">
                            <div className="card-header bg-white border-0">
                                <div className="title" style={{ fontSize: 'medium' }}>Registered Quality Controllers</div>
                            </div>
                            <div className="card-body mt-n5">
                                <RegisteredQualityControllers />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
