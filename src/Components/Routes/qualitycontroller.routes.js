import {
  UserOutlined,
  FundProjectionScreenOutlined,
  RedEnvelopeOutlined,
} from "@ant-design/icons";
// import { Users } from '../../Pages/Manufacturer';
import { Users } from "../../Pages/Hybrid/Users";
// import { Products, Product } from "../../Pages/Hybrid/Manufacturers";
import Batches from "../../Pages/Hybrid/Manufacturers/Products/Batches";
import Products from "../../Pages/Hybrid/QualityControllers/Products";
import { Product } from "../../Pages/Hybrid/Manufacturers";

// import { Products, Users } from '../../Pages/Manufacturer';
// import Agents from '../../Pages/Manufacturer/Agents';
// import Product from '../../Pages/Manufacturer/Products/Product';

const QCRoutes = [
  {
    name: "Users",
    component: Users,
    url: "/qualitycontroller/users",
    Icon: UserOutlined,
    comments: "Users endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 20,
    protected: true,
  },
  {
    name: "Products",
    Icon: FundProjectionScreenOutlined,
    comments: "Products route",
    category: 1,
    sidebar: true,
    key: 22,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    submenu: [
      {
        name: "All Products",
        url: "/products",
        component: Products,
        key: 220,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
      {
        name: "Revoked",
        url: "/products/revoked",
        component: Batches,
        key: 221,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
      {
        name: "Unregistered",
        url: "/report/product",
        component: "Product",
        key: 222,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
    ],
  },
  {
    name: "Reports",
    component: Users,
    url: "/reports",
    Icon: RedEnvelopeOutlined,
    comments: "Users endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 23,
    protected: true,
  },

  {
    name: "Product",
    url: "/products/:id",
    component: Product,
    sidebar: false,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    category: 1,
  },
];

export default QCRoutes;

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
