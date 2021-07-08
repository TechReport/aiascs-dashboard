import {
  UserOutlined,
  FundProjectionScreenOutlined,
  //   SettingOutlined,
  //   UsergroupAddOutlined,
} from "@ant-design/icons";

import { Users } from "../../Pages/Hybrid/Users";
import { Products } from "../../Pages/Hybrid/Manufacturers";
import Batches from "../../Pages/Hybrid/Manufacturers/Products/Batches";

const agentRoutes = [
  {
    name: "Users",
    component: Users,
    url: "/agent/users",
    Icon: UserOutlined,
    comments: "Users endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_AGENT_COMPANY_ADMIN"],
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
    roles: ["ROLE_AGENT_COMPANY_ADMIN"],
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
        url: "/agent/product/batches",
        component: Batches,
        key: 221,
        roles: ["ROLE_AGENT_COMPANY_ADMIN"],
      },
      {
        name: "Reports",
        url: "/agent/products/",
        component: "Product",
        key: 222,
        roles: ["ROLE_AGENT_COMPANY_ADMIN"],
      },
    ],
  },
  {
    name: "All Products",
    url: "/manufacturers/batches/products",
    component: Products,
    key: 220,
    sidebar: false,
    roles: ["ROLE_AGENT_COMPANY_ADMIN"],
  },
];

export default agentRoutes;

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
