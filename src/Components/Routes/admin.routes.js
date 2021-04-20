import { Settings } from "../../Pages/Settings";

import {
    // DesktopOutlined,
    SettingOutlined,
    UserOutlined,
    // FundProjectionScreenOutlined
} from '@ant-design/icons';
// import { UserProfile } from "../../Pages/UserProfile";
import { ManCompanyProfile, Manufacturers, QualityControllers } from "../../Pages/SuperAdmin";
import QualityControllerProfile from "../../Pages/SuperAdmin/QualityControllers/QualityControllerProfile";


const adminRoutes = [
    {
        name: 'Manufacturer',
        component: Manufacturers,
        url: '/manage/manufacturers',
        Icon: UserOutlined,
        comments: 'Settings endpoint',
        category: 1,
        sidebar: true,
        roles: ['ROLE_SUPER_ADMIN'],
        key: 10,
        protected: true,
    },
    {
        name: 'Quality Controllers',
        component: QualityControllers,
        url: '/manage/quality_controllers',
        Icon: UserOutlined,
        comments: 'quality controllers endpoint',
        category: 1,
        sidebar: true,
        roles: ['ROLE_SUPER_ADMIN'],
        key: 11,
        protected: true,
    },
    {
        name: 'Quality Controllers Profile',
        component: QualityControllerProfile,
        url: '/manage/qcontroller/profile/:companyId',
        comments: 'quality controllers endpoint',
        category: 1,
        sidebar: false,
        roles: ['ROLE_SUPER_ADMIN'],
        key: 12,
    },
    {
        name: 'Settings',
        component: Settings,
        url: '/settings',
        Icon: SettingOutlined,
        comments: 'Settings endpoint',
        category: 2,
        sidebar: true,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN'],
        key: 50,
        protected: true,
    },


    // Not in sidebar
    {
        name: 'Product',
        url: '/manage/manufacturer/profile/:id',
        component: ManCompanyProfile,
        sidebar: false,
        category: 1,
    }
]

export default adminRoutes