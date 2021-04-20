import manRoutes from './manufacturer.routes'
import adminRoutes from './admin.routes'

import Login from '../../Pages/Authentication/Login'
import NotFound from '../../Pages/Errors/NotFound'
import Dashboard from '../../Pages/Dashboard'

import {
    DesktopOutlined,
    // SettingOutlined,
    // UserOutlined,
    // FundProjectionScreenOutlined
} from '@ant-design/icons';

import { UserProfile } from '../../Pages/UserProfile'
import QCRoutes from './qualitycontroller.routes'

const sharedRoutes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/',
        Icon: DesktopOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true,
        key: 1,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN', 'ROLE_QUALITY_CONTROLLER_ADMIN']
    },
    {
        name: 'User Profile',
        url: '/user/:id',
        component: UserProfile,
        sidebar: false,
        roles: ['ROLE_SUPER_ADMIN', 'ROLE_MANUFACTURING_COMPANY_ADMIN'],
        category: 1,
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


export default sharedRoutes.concat(manRoutes.concat(adminRoutes).concat(QCRoutes))
// export default sharedRoutes.concat(manRoutes.concat(adminRoutes))
export { openRoutes }
