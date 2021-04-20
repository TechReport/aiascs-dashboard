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
import Agents from '../Pages/Manufacturer/Agents';

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
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER']
    },

    /**  MANUFACTURING COMPANY ADMIN ROUTES 
     * KEY: 1
     * CATEGORY: 1
    */
    // {
    //     name: 'Manufacturers',
    //     url: '/manufacturers/users',
    //     icon: UserOutlined,
    //     component: Users,
    //     category: 1,
    //     sidebar: true,
    //     key: 21,
    //     roles: ['ROLE_SUPER_ADMIN'],
    // },

    // {
    //     name: 'Manufacturers',
    //     Icon: FundProjectionScreenOutlined,
    //     comments: 'Manufacturer endpoint',
    //     category: 1,
    //     sidebar: true,
    //     key: 2,
    //     protected: true,
    //     roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
    //     // ROLE_MANUFACTURING_COMPANY_ADMIN
    //     submenu: [
    //         {
    //             name: 'Users',
    //             url: '/manufacturers/users',
    //             icon: UserOutlined,
    //             component: Users,
    //             key: 21,
    //             protected: true,
    //             roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
    //         },
    //         {
    //             name: 'Agents',
    //             url: '/manufacturers/agents',
    //             component: 'Users',
    //             key: 22,
    //             roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN']
    //         },
    //         {
    //             name: 'Products',
    //             url: '/manufacturers/products',
    //             icon: UserOutlined,
    //             component: Products,
    //             key: 23,
    //             protected: true,
    //             roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_MANUFACTURER'],
    //         },
    //         // {
    //         //     name: 'Users',
    //         //     url: '/manufacturers/users',
    //         //     icon: UserOutlined,
    //         //     component: 'Users',
    //         //     key: 23
    //         // },
    //     ]
    // },
    // {
    //     name: 'Product',
    //     url: '/manufacturers/products/one',
    //     component: Product,
    //     sidebar: false,
    //     category: 1,
    // },

    // {
    //     name: 'Quality Controllers',
    //     Icon: FundProjectionScreenOutlined,
    //     comments: 'Dashboard endpoint',
    //     category: 1,
    //     sidebar: true,
    //     key: 3,
    //     roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_MANUFACTURER'],
    //     submenu: [
    //         {
    //             name: 'Users',
    //             url: '/manufacturers/users',
    //             component: Users,
    //             key: 31,
    //             roles: []
    //         },
    //         {
    //             name: 'Products',
    //             url: '/manufacturers/products',
    //             icon: UserOutlined,
    //             component: 'Users',
    //             key: 32,
    //             roles: []
    //         },
    //     ]
    // },

    /**  MANUFACTURING COMPANY ADMIN ROUTES 
     *   KEY: 2**
     *   CATEGORY: 1
    */
    //  {
    //     name: 'Users',
    //     url: '/manufacturers/users',
    //     component: Users,
    //     key: 200,
    //     protected: true,
    //     roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
    // },
    {
        name: 'Users',
        component: Users,
        url: '/manufacturers/users',
        Icon: UserOutlined,
        comments: 'Users endpoint',
        category: 1,
        sidebar: true,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN'],
        key: 20,
        protected: true,
    },

    // {
    //     name: 'Users',
    //     Icon: UserOutlined,
    //     comments: 'Manufacturing company users route',
    //     category: 1,
    //     sidebar: true,
    //     key: 20,
    //     roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
    //     submenu: [
    //         {
    //             name: 'Users',
    //             url: '/manufacturers/users',
    //             component: Users,
    //             key: 200,
    //             protected: true,
    //             roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
    //         },
    //         {
    //             name: 'Agents',
    //             url: '/manufacturers/agents',
    //             component: Agents,
    //             key: 201,
    //             roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN']
    //         }
    //     ]
    // },
    {
        name: 'Agents',
        Icon: UserOutlined,
        comments: 'Agents company users route',
        category: 1,
        sidebar: true,
        key: 21,
        roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
        submenu: [
            {
                name: 'Enroll',
                url: '/manufacturers/agent/enroll',
                component: 'Users',
                key: 210,
                protected: true,
                roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
            },
            {
                name: 'Enrolled',
                url: '/manufacturers/agents',
                component: Agents,
                key: 211,
                protected: true,
                roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
            },
        ]
    },
    {
        name: 'Products',
        Icon: FundProjectionScreenOutlined,
        comments: 'Products route',
        category: 1,
        sidebar: true,
        key: 22,
        roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
        submenu: [
            {
                name: 'List',
                url: '/manufacturers/products',
                component: Products,
                key: 220,
                roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
            },
            {
                name: 'Reports',
                url: '/manufacturers/report/product',
                component: 'Product',
                key: 221,
                roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN']
            }
        ]
    },
    {
        name: 'Product',
        url: '/manufacturers/products/one',
        component: Product,
        sidebar: false,
        category: 1,
    },

    // END OF MANUFACTURING COMPANY ROUTES

    /** SHARED ROUTES
     *  KEY: 5**
     *  CATEGORY: 2
     */

    // {
    //     name: 'Settings',
    //     component: Settings,
    //     url: '/settings',
    //     Icon: SettingOutlined,
    //     comments: 'Settings endpoint',
    //     category: 2,
    //     sidebar: true,
    //     roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN'],
    //     key: 50,
    //     protected: true,
    // },
    // {
    //     name: 'User Profile',
    //     url: '/user/:id',
    //     component: UserProfile,
    //     sidebar: false,
    //     roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN'],
    //     category: 1,
    // },

    // END OF SHARED ROUTES
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