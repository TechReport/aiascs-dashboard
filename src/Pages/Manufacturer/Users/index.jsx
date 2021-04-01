import { Button, Tabs } from 'antd'
import { useState } from 'react'
import { DashboardWidgetCard } from '../../../Components/Reusable'
import Graph from '../graph'
import UserList from './UserList';
import {
    UserAddOutlined
} from '@ant-design/icons';
import AddNewUser from './AddNewUser';
import Modal from 'antd/lib/modal/Modal';

const { TabPane } = Tabs;

export default function Users() {
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

    const data = [
        {
            title: 'Operation Personnels',
            body: '132 k', percent: '+20%',
            descriptions: 'coming soon',
            x: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            y: [30, 40, 75, 70, 99, 120, 300, 401, 500]
        },
        {
            title: 'Agents',
            body: '37', percent: '-20%',
            descriptions: 'coming soon'
        }
    ]

    return (
        <div>
            <div className='row mt-4 mx-0' styl={{ width: '100%' }}>
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>
            <div className="container-fluid mt-4">
                <div className="actions">
                    <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                        Add Users
                        <UserAddOutlined className='' />
                    </Button>
                    <Modal title="Add User"
                        visible={isModalVisible}
                        // onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                        destroyOnClose={true}>
                        <AddNewUser handleCancel={handleCancel} handleOk={handleOk} />
                    </Modal>
                </div>
            </div>
            <div className="container-fluid mt-4">
                <div className="card shadow">
                    <div className="card-header bg-white">
                        <div className="title h5 text-muted">List</div>
                    </div>
                    <div className="card-body">
                        <UserList />
                    </div>
                </div>
            </div>

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
            </div>
        </div>
    )
}


/*
 * //TODO
 * 1. Create new operationg personnel (OP)
 *      assign role to OP
 *
 * 2. create agent
 */