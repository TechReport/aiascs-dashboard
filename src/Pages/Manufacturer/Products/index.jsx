import { useState } from 'react'
import {
    AppstoreAddOutlined
} from '@ant-design/icons';
import { Button, Modal } from "antd"
import { DashboardWidgetCard } from "../../../Components/Reusable"
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


    const data = [
        {
            title: 'Products',
            body: '132 k', percent: '+20%',
            descriptions: 'coming soon',
            x: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            y: [30, 40, 75, 70, 99, 120, 300, 401, 500]
        },
        // {
        //     title: 'Agents',
        //     body: '37', percent: '-20%',
        //     descriptions: 'coming soon'
        // }
    ]
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
                    <div className="col-6">
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
            {/*
            <div className="container-fluid mt-4">
                <div className="card shadow">
                    <div className="card-body">
                        <Tabs>
                            <TabPane tab="OPERATION PERSONNELS" key="1" >
                                <div className="row shadow">
                                    <div className="col-4">
                                        <div className="card" style={{ height: '20vw', width: '40vw' }}>
                                            <Graph />
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="AGENTS" key="2">
                                Content of tab 2
                        </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div> */}
        </div >
    )
}
