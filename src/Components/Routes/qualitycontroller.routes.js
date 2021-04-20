import {
    UserOutlined,
} from '@ant-design/icons';
import { Users } from '../../Pages/Manufacturer';
// import { Products, Users } from '../../Pages/Manufacturer';
// import Agents from '../../Pages/Manufacturer/Agents';
// import Product from '../../Pages/Manufacturer/Products/Product';


const QCRoutes = [
    {
        name: 'Users',
        component: Users,
        url: '/qualitycontroller/users',
        Icon: UserOutlined,
        comments: 'Users endpoint',
        category: 1,
        sidebar: true,
        roles: ['ROLE_QUALITY_CONTROLLER_ADMIN'],
        key: 20,
        protected: true,
    },
]



export default QCRoutes

// const manRoutes = [
//     {
//         name: 'Users',
//         component: Users,
//         url: '/manufacturers/users',
//         Icon: UserOutlined,
//         comments: 'Users endpoint',
//         category: 1,
//         sidebar: true,
//         roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN','ROLE_SUPER_ADMIN'],
//         key: 20,
//         protected: true,
//     },
//     {
//         name: 'Agents',
//         Icon: UserOutlined,
//         comments: 'Agents company users route',
//         category: 1,
//         sidebar: true,
//         key: 21,
//         roles: ['ROLE_MANUFACTURI,NG_COMPANY_ADMIN'],
//         submenu: [
//             {
//                 name: 'Enroll',
//                 url: '/manufacturers/agent/enroll',
//                 component: 'Users',
//                 key: 210,
//                 protected: true,
//                 roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
//             },
//             {
//                 name: 'Enrolled',
//                 url: '/manufacturers/agents',
//                 component: Agents,
//                 key: 211,
//                 protected: true,
//                 roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
//             },
//         ]
//     },
//     {
//         name: 'Products',
//         Icon: FundProjectionScreenOutlined,
//         comments: 'Products route',
//         category: 1,
//         sidebar: true,
//         key: 22,
//         roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
//         submenu: [
//             {
//                 name: 'List',
//                 url: '/manufacturers/products',
//                 component: Products,
//                 key: 220,
//                 roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
//             },
//             {
//                 name: 'Reports',
//                 url: '/manufacturers/report/product',
//                 component: 'Product',
//                 key: 221,
//                 roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN']
//             }
//         ]
//     },
//     {
//         name: 'Product',
//         url: '/manufacturers/products/one',
//         component: Product,
//         sidebar: false,
//         roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
//         category: 1,
//     }
// ]

// export default manRoutes
