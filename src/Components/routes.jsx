import Login from '../Pages/Authentication/Login'

import {
    DesktopOutlined,
    UserOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import Dashboard from '../Pages/Dashboard';
import { Users } from '../Pages/Manufacturer';

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/dashboard',
        Icon: DesktopOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 1
    },
    {
        name: 'Manufacturers',
        Icon: FundProjectionScreenOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 2,
        submenu: [
            {
                name: 'Users',
                url: '/manufacturers/users',
                icon: UserOutlined,
                component: Users,
                key: 21
            },
            {
                name: 'Products',
                url: '/manufacturers/products',
                icon: UserOutlined,
                component: 'Users',
                key: 22
            },
            // {
            //     name: 'Users',
            //     url: '/manufacturers/users',
            //     icon: UserOutlined,
            //     component: 'Users',
            //     key: 23
            // },
        ]
    },
    {
        name: 'Quality Controllers',
        Icon: FundProjectionScreenOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 3,
        submenu: [
            {
                name: 'Users',
                url: '/manufacturers/users',
                icon: UserOutlined,
                component: Users,
                key: 31
            },
            {
                name: 'Products',
                url: '/manufacturers/products',
                icon: UserOutlined,
                component: 'Users',
                key: 32
            },
        ]
    },
    {
        name: 'login',
        component: Login,
        url: '/login',
        sidebar: false
    },
]

export default routes