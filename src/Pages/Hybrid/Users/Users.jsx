import { DashboardWidgetCard } from '../../../Components/Reusable'
// import Graph from '../graph'
import UserList from './UserList';
import {
    UserAddOutlined
} from '@ant-design/icons';
import AddNewUser from './AddNewUser';
import Modal from 'antd/lib/modal/Modal';

import ShowForPermission from '../../../Components/Authentication/CheckPermission'
import { Button } from 'antd';
import { useState } from 'react';

// const { TabPane } = Tabs;

export default function Users() {
    // console.log(props)
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
                </div>
            </div>
            <div className="container-fluid row w-100 mt-4">
                <div className="col-8">
                    <div className="card shadow">
                        <div className="card-header bg-white border-0">
                            <div className="title h5 text-muted">List</div>
                        </div>
                        <div className="card-body py-1">
                            <UserList />
                        </div>
                    </div>
                </div>
                {/* <div className="col">
                    <div className="jumbotron">
                    </div>
                </div> */}

            </div>
            {/* <div className="container-fluid row mt-4 w-100">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <TestHoc names = 'john doe' />
                        </div>
                    </div>
                </div>
            </div> */}
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