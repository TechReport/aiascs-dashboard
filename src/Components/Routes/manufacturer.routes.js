import {
  UserOutlined,
  FundProjectionScreenOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
// import { Products } from '../../Pages/Manufacturer';
// import Agents from '../../Pages/Manufacturer/Agents';
// import Product from '../../Pages/Manufacturer/Products/Product';

import { Users } from "../../Pages/Hybrid/Users";
import { Products, Product } from "../../Pages/Hybrid/Manufacturers";
import Batches from "../../Pages/Hybrid/Manufacturers/Products/Batches";
// import AssignedAgents from "../../Pages/Hybrid/Agents/CompanyProfile/AssignedAgents";
import AllAgents from "../../Pages/Hybrid/Agents/CompanyProfile/AllAgents";
import CompanySubProfile from "../../Pages/Hybrid/Agents/CompanyProfile/CompanySubProfile";
import { Settings } from "../../Pages/Settings";
import CompanyProfile from "../../Pages/Hybrid/CompanyProfile";
import Reports from "../../Pages/Reports";

const manRoutes = [
  {
    name: "Users",
    component: Users,
    url: "/manufacturers/users",
    Icon: UserOutlined,
    comments: "Users endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    key: 20,
    protected: true,
  },
  // {
  //     name: 'Agents',
  //     Icon: UserOutlined,
  //     comments: 'Agents company users route',
  //     category: 1,
  //     sidebar: true,
  //     key: 21,
  //     roles: ['ROLE_MANUFACTURI,NG_COMPANY_ADMIN'],
  //     submenu: [
  //         {
  //             name: 'Enroll',
  //             url: '/manufacturers/agent/enroll',
  //             component: 'Users',
  //             key: 210,
  //             protected: true,
  //             roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
  //         },
  //         {
  //             name: 'Enrolled',
  //             url: '/manufacturers/agents',
  //             component: Agents,
  //             key: 211,
  //             protected: true,
  //             roles: ['ROLE_MANUFACTURING_COMPANY_ADMIN'],
  //         },
  //     ]
  // },
  {
    name: "Products",
    Icon: FundProjectionScreenOutlined,
    comments: "Products route",
    category: 1,
    sidebar: true,
    key: 22,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    submenu: [
      //   {
      //     name: "All Products",
      //     url: "/manufacturers/products",
      //     component: Products,
      //     key: 220,
      //     roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
      //   },
      {
        name: "Batches",
        url: "/manufacturers/batches",
        component: Batches,
        key: 221,
        roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
      },
      //   {
      //     name: "Reports",
      //     url: "/manufacturers/report/product",
      //     component: "Product",
      //     key: 222,
      //     sidebar: false,
      //     roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
      //   },
    ],
  },
  {
    name: "All Products",
    url: "/manufacturers/batches/products",
    component: Products,
    key: 220,
    sidebar: false,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
  },
  {
    name: "Agents",
    Icon: UserOutlined,
    comments: "Products route",
    category: 1,
    sidebar: true,
    key: 23,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    submenu: [
      {
        name: "All Agents",
        url: "/manufacturers/agents/all",
        component: AllAgents,
        key: 230,
        roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
      },
      //   {
      //     name: "Assigned Agents",
      //     url: "/manufacturers/agents/assigned",
      //     component: AssignedAgents,
      //     key: 231,
      //     roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
      //   },
    ],
  },
  {
    name: "Profile",
    component: CompanyProfile,
    url: "/man/profile",
    Icon: UsergroupAddOutlined,
    comments: "Company Profile endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    key: 25,
    protected: true,
  },
  {
    name: "Reports",
    component: Reports,
    url: "/man/reports",
    Icon: TeamOutlined,
    comments: "agents endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    key: 16,
  },
  {
    name: "Settings",
    component: Settings,
    url: "/sett",
    Icon: SettingOutlined,
    comments: "settings endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    key: 24,
    protected: true,
  },
  //   {
  //     name: "Agents",
  //     component: "Agents",
  //     url: "/agents",
  //     Icon: UserOutlined,
  //     comments: "Users endpoint",
  //     category: 1,
  //     sidebar: true,
  //     roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
  //     key: 23,
  //     protected: true,
  //   },
  {
    name: "Product",
    // url: "/manufacturers/products/:id",
    url: "/manufacturers/batches/products/:id",
    component: Product,
    sidebar: false,
    roles: [
      "ROLE_MANUFACTURING_COMPANY_ADMIN",
      "ROLE_QUALITY_CONTROLLER_ADMIN",
    ],
    category: 1,
  },
  {
    name: "Agents Profile",
    url: "/agents/:id",
    component: CompanySubProfile,
    sidebar: false,
    roles: ["ROLE_MANUFACTURING_COMPANY_ADMIN"],
    category: 1,
  },
];

export default manRoutes;

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
