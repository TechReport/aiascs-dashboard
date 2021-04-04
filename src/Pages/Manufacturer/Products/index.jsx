import { useState } from 'react'
import {
    AppstoreAddOutlined
} from '@ant-design/icons';
import { Button, Modal } from "antd"
import AddNewProduct from './AddNewProduct';
import ProductList from './ProductList';

export default function Products() {
    const [isModalVisible, setIsModalVisible] = useState(false)
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
            {/* <div className='row mt-4 mx-0' styl={{ width: '100%' }}>
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div> */}
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
                        <AddNewProduct handleCancel={handleCancel} handleOk={handleOk} />
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
                                <ProductList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
