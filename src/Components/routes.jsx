import Login from '../Pages/Authentication/Login'

import {
    DesktopOutlined,
} from '@ant-design/icons';
import Dashboard from '../Pages/Dashboard';

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        url: '/dashboard',
        Icon: DesktopOutlined,
        comments: 'Dashboard endpoint',
        category: 1,
        sidebar: true
    },
    {
        name: 'login',
        component: Login,
        url: '/login',
        sidebar: false
    },
]

export default routes