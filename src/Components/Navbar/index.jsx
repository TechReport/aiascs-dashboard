import Avatar from "antd/lib/avatar/avatar";
import { Header } from "antd/lib/layout/layout";
import { Fragment, useState } from "react";

import {
    UserOutlined,
    BellOutlined
} from '@ant-design/icons';

import { Badge, Breadcrumb, Popover, Tag } from "antd";
import Notifications from "./Notifications";
import ProfileOverview from "./ProfileOverview";

export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const [userData] = useState(JSON.parse(localStorage.getItem('user')))

    return (
        <Fragment>
            <Header className="site-layout-background bg-light" >
                <div className='row bg-inf mr-n5 d-flex justify-content-between'>
                    <div className="bg-dange py-2">
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    {userData.companyId &&
                        <div className="ml-auto">
                            <Tag className='py-2 px-2' color='blue'>{userData.companyId.name}</Tag>
                        </div>
                    }
                    <div className="px-3 pr-2">
                        <div className='float-left mr-3' style={{ cursor: 'pointer' }}>
                            <Popover
                                content={<Notifications />}
                            >
                                <BellOutlined style={{ fontSize: '18px' }} />
                                <Badge count={0} />
                            </Popover>
                        </div>
                        <Popover
                            content={<ProfileOverview userData={userData} />}
                            // trigger="click"
                            visible={visible}
                            placement='bottomRight'
                            onVisibleChange={() => setVisible(!visible)}
                        >
                            <div className='float-left mr-n2 mt-2' style={{ cursor: 'pointer' }}>
                                <Tag className='mt-1' style={{ border: 'none' }}>
                                    <span className='font-weight-bold'>{`${userData.firstName} ${userData.lastName}`}</span><br />
                                    <Tag color='blue'>{userData.role.name}</Tag>
                                </Tag>
                            </div>
                            <Avatar
                                size={50}
                                style={{
                                    backgroundColor: '#87d068',
                                    cursor: "pointer"
                                }}
                                icon={<UserOutlined />} />
                        </Popover>
                    </div>
                </div>
            </Header>
        </Fragment>
    )
}