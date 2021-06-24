// import { Settings } from "../../Pages/Settings";

import {
  // DesktopOutlined,
  //   SettingOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  SafetyCertificateOutlined,
  AlertOutlined,
  TeamOutlined,
} from "@ant-design/icons";
// import { UserProfile } from "../../Pages/UserProfile";
// import { ManCompanyProfile, Manufacturers, QualityControllers } from "../../Pages/SuperAdmin";
// import QualityControllerProfile from "../../Pages/SuperAdmin/QualityControllers/QualityControllerProfile";

import { Users } from "../../Pages/Hybrid/Users";
import {
  ManCompanyProfile,
  Manufacturers,
  UnregisteredProductProfile,
  UnregisteredProducts,
} from "../../Pages/Hybrid/Manufacturers";
import {
  QualityControllerProfile,
  QualityControllers,
} from "../../Pages/Hybrid/QualityControllers";
import { Agents } from "../../Pages/Hybrid/Agents";
import AgentsCompanyProfile from "../../Pages/Hybrid/Agents/CompanyProfile";
import Reports from "../../Pages/Reports";
import ReportProfile from "../../Pages/Reports/profile1";

const adminRoutes = [
  {
    name: "Users",
    component: Users,
    url: "/manage/users",
    Icon: UserOutlined,
    comments: "Manage Users Endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 10,
    protected: true,
  },
  {
    name: "Manufacturers",
    component: Manufacturers,
    url: "/manage/manufacturers",
    Icon: SafetyCertificateOutlined,
    comments: "Settings endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN", "ROLE_QUALITY_CONTROLLER_ADMIN"],
    key: 13,
    protected: true,
  },
  {
    name: "Quality Controllers",
    component: QualityControllers,
    url: "/manage/quality_controllers",
    Icon: AlertOutlined,
    comments: "quality controllers endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 11,
    protected: true,
  },
  {
    name: "Agents",
    component: Agents,
    url: "/manage/agents",
    Icon: TeamOutlined,
    comments: "agents endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 12,
  },
  {
    name: "Reports",
    component: Reports,
    url: "/reports",
    Icon: TeamOutlined,
    comments: "agents endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 16,
  },
  {
    name: "Reports",
    component: ReportProfile,
    url: "/reports/:id",
    Icon: TeamOutlined,
    comments: "agents endpoint",
    category: 1,
    sidebar: false,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 16,
  },
  {
    name: "Unregistered Products",
    component: UnregisteredProducts,
    url: "/manage/unregisteredProducts",
    Icon: FundProjectionScreenOutlined,
    comments: "unregistered products endpoint",
    category: 1,
    sidebar: true,
    roles: ["ROLE_SUPER_ADMIN"],
    key: 14,
    protected: true,
  },
  //   {
  //     name: "Settings",
  //     component: Settings,
  //     url: "/settings",
  //     Icon: SettingOutlined,
  //     comments: "Settings endpoint",
  //     category: 2,
  //     sidebar: true,
  //     roles: ["ROLE_SUPER_ADMIN", "ROLE_MANUFACTURING_COMPANY_ADMIN"],
  //     key: 50,
  //     protected: true,
  //   },

  // Not in sidebar
  {
    name: "Manufacturer Profile",
    url: "/manage/manufacture/profile/:id",
    component: ManCompanyProfile,
    sidebar: false,
    roles: ["ROLE_SUPER_ADMIN", "ROLE_QUALITY_CONTROLLER_ADMIN"],
    category: 1,
  },
  {
    name: "Agents Profile",
    url: "/manage/agents/profile/:id",
    component: AgentsCompanyProfile,
    sidebar: false,
    roles: ["ROLE_SUPER_ADMIN"],
    category: 1,
  },
  {
    name: "Quality Controllers Profile",
    url: "/manage/qualitycontrollers/profile/:id",
    component: QualityControllerProfile,
    sidebar: false,
    roles: ["ROLE_SUPER_ADMIN"],
    category: 1,
  },
  {
    name: "Manufacturer Profile",
    url: "/manage/unregisteredProduct/:id",
    component: UnregisteredProductProfile,
    sidebar: false,
    roles: ["ROLE_SUPER_ADMIN"],
    category: 1,
  },
];

export default adminRoutes;
