import {
  UserOutlined,
  FundProjectionScreenOutlined,
  RedEnvelopeOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
// import { Users } from '../../Pages/Manufacturer';
import { Users } from "../../Pages/Hybrid/Users";
// import { Products, Product } from "../../Pages/Hybrid/Manufacturers";
// import Batches from "../../Pages/Hybrid/Manufacturers/Products/Batches";
import AllProducts from "../../Pages/Hybrid/QualityControllers/Products";
// import { Products } from "../../Pages/Hybrid/Manufacturers";

import {
  Product,
  Products,
  UnregisteredProducts,
} from "../../Pages/Hybrid/Manufacturers";
// import Revoked from "../../Pages/Hybrid/QualityControllers/Products/Revoked";
import Categories from "../../Pages/Hybrid/QualityControllers/Products/Categories";
import { Settings } from "../../Pages/Settings";
import CompanyProfile from "../../Pages/Hybrid/CompanyProfile";
import Reports from "../../Pages/Reports";

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
        component: AllProducts,
        key: 220,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
      {
        name: "Categorized",
        url: "/products/category",
        component: Categories,
        key: 221,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
      //   {
      //     name: "Revoked",
      //     url: "/products/revoked",
      //     component: Revoked,
      //     key: 222,
      //     roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      //   },
      {
        name: "Unregistered",
        url: "/report/product",
        component: UnregisteredProducts,
        key: 223,
        roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
      },
    ],
  },
  {
    name: "Categorized",
    url: "/products/category/batch",
    component: Products,
    key: 221,
    sidebar: false,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
  },
  {
    name: "Reports",
    component: Reports,
    url: "/qc/reports",
    Icon: RedEnvelopeOutlined,
    comments: "Reports endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 23,
    protected: true,
  },
  {
    name: "Profile",
    component: CompanyProfile,
    url: "/qc/profile",
    Icon: UsergroupAddOutlined,
    comments: "Companyy Profile endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 25,
    protected: true,
  },
  {
    name: "Settings",
    component: Settings,
    url: "/set",
    Icon: SettingOutlined,
    comments: "settings endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 24,
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
  {
    name: "Product",
    url: "/products/category/products/:id",
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
