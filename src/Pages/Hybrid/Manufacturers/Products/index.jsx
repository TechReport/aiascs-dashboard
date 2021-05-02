import { useState } from 'react'
import {
    AppstoreAddOutlined
} from '@ant-design/icons';
import { Button, Modal } from "antd"
import AddNewProduct from './AddNewProduct';
import ProductList from './ProductList';
import { DashboardWidgetCard } from '../../../../Components/Reusable';

export default function Products() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [user] = useState(JSON.parse(localStorage.getItem('user')))

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
    const data = [
        { title: 'Total Products Registered', body: '37 M', percent: '-5%', descriptions: 'Number of registered products' },
        { title: 'Total Batches', body: '132 k', percent: '+20%', descriptions: 'coming soon' },
        { title: 'Agents', body: '37', percent: '-20%', descriptions: 'coming soon' },
    ]
    return (
        <div>
            <div className='row mt-4 mx-0' styl={{ width: '100%' }}>
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>
            <div className="container-fluid mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        Add Products
                        <AppstoreAddOutlined className='' />
                    </Button>
                    <Modal title="Add Products"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <AddNewProduct handleCancel={handleCancel} handleOk={handleOk} companyId={user.companyId}/>
                    </Modal>
                </div>
            </div>

            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <div className="title h5 text-muted">List</div>
                            </div>
                            <div className="card-body">
                                <ProductList companyId={user.companyId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}