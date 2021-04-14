import Login from '../Pages/Authentication'

import {
    DesktopOutlined,
    SettingOutlined,
    UserOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import Dashboard from '../Pages/Dashboard';
import { Products, Users } from '../Pages/Manufacturer';
import Product from '../Pages/Manufacturer/Products/Product';
import { UserProfile } from '../Pages/UserProfile'
import { Settings } from '../Pages/Settings';
import NotFound from '../Pages/Errors/NotFound';

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/',
        Icon: DesktopOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 1,
        protected: true,
        roles: ['ROLE_SUPER_ADMINISTRATOR', 'ROLE_ADMIN', 'ROLE_MANUFACTURER']
    },
    {
        name: 'Manufacturers',
        Icon: FundProjectionScreenOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 2,
        protected: true,
        roles: ['ROLE_SUPER_ADMINISTRATOR', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
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
        protected: true,
    },
    {
        name: 'User Profile',
        url: '/user/:id',
        component: UserProfile,
        sidebar: false,
        category: 1,
        protected: true,
    },
    {
        name: 'Quality Controllers',
        Icon: FundProjectionScreenOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 3,
        roles: ['ROLE_SUPER_ADMINISTRATOR', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
        protected: true,
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
    // {
    //     name: 'login',
    //     component: Login,
    //     url: '/login',
    //     sidebar: false,
    //     protected:false,
    // },
    {
        name: 'Settings',
        component: Settings,
        url: '/settings',
        Icon: SettingOutlined,
        comments: 'Settings endpoint',
        category: 2,
        sidebar: true,
        roles: ['ROLE_SUPER_ADMINISTRATOR', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
        key: 1,
        protected: true,
    },
    // {
    //     name: 'Not Found',
    //     component: NotFound,
    //     url: '/error/404',
    //     comments: 'Not Found endpoint',
    //     category: 2,
    //     sidebar: false,
    //     protected:false,
    // },
]

const openRoutes = [
    {
        name: 'Not Found',
        component: NotFound,
        url: '/error/404',
    },
    {
        name: 'login',
        component: Login,
        url: '/login',
    },
]

export default routes

export { openRoutes }