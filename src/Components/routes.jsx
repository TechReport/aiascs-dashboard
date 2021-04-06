import Login from '../Pages/Authentication'

import {
    DesktopOutlined,
    UserOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import Dashboard from '../Pages/Dashboard';
import { Products, Users } from '../Pages/Manufacturer';
import Product from '../Pages/Manufacturer/Products/Product';

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/',
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
                name: 'Agents',
                url: '/manufacturers/agents',
                component: 'Users',
                key: 22
            },
            {
                name: 'Products',
                url: '/manufacturers/products',
                icon: UserOutlined,
                component: Products,
                key: 23
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
        name: 'Product',
        url: '/manufacturers/products/one',
        component: Product,
        sidebar: false,
        category: 1,
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