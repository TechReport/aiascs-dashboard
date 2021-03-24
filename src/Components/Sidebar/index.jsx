import { Divider, Layout, Menu } from "antd";
import { useState } from 'react'
import { Link } from "react-router-dom";
import routes from "../routes";

import {
    DeploymentUnitOutlined
} from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            style={{
                backgroundColor: '#f4f4f4',
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0
            }}>
            <div className="logo bg-inf py-1 pr-3 text-center" style={{ fontSize: '18px', fontFamily: 'verdana' }}>
                <DeploymentUnitOutlined style={{ fontSize: '40px' }} className='p-2' />
                AIASCS
            </div>
            <Divider className='mt-0 mb-0' />
            <Menu defaultSelectedKeys={['1']} style={{ backgroundColor: '#f4f4f4', fontSize: '14px' }} mode="inline" >
                {routes.map((route, index, array) => {
                    return (
                        route.sidebar &&
                        <>
                            {index > 0 && route.category !== array[index - 1].category && <Divider />}
                            {route.submenu ?
                                <SubMenu key={route.key} icon={<route.Icon />} title={route.name}>
                                    {route.submenu.map(submenu =>
                                        <Menu.Item key={submenu.key} >
                                            <Link to={submenu.url}>{submenu.name}</Link>
                                        </Menu.Item>
                                    )}
                                </SubMenu>
                                :
                                <Menu.Item key={route.key} icon={<route.Icon />} className='m-0' >
                                    <Link to={route.url}>{route.name}</Link>
                                </Menu.Item>
                            }
                        </>
                    )
                })}
            </Menu>
        </Sider>
    )
}