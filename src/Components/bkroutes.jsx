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
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER']
    },
    {
        name: 'Manufacturers',
        Icon: FundProjectionScreenOutlined,
        comments: 'Manufacturer endpoint',
        category: 1,
        sidebar: true,
        key: 2,
        protected: true,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
        // ROLE_MANUFACTURING_COMPANY_ADMIN
        submenu: [
            {
                name: 'Users',
                url: '/manufacturers/users',
                icon: UserOutlined,
                component: Users,
                key: 21,
                protected: true,
                roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
            },
            {
                name: 'Agents',
                url: '/manufacturers/agents',
                component: 'Users',
                key: 22,
                roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']
            },
            {
                name: 'Products',
                url: '/manufacturers/products',
                icon: UserOutlined,
                component: Products,
                key: 23,
                protected: true,
                roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
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
        name: 'User Profile',
        url: '/user/:id',
        component: UserProfile,
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
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
        submenu: [
            {
                name: 'Users',
                url: '/manufacturers/users',
                component: Users,
                key: 31,
                roles: []
            },
            {
                name: 'Products',
                url: '/manufacturers/products',
                icon: UserOutlined,
                component: 'Users',
                key: 32,
                roles: []
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
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
        key: 1,
        protected: true,
    },
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