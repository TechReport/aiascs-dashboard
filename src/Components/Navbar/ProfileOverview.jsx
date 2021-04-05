import { Button, Tag, Divider } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    ProfileOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { authAPI } from "../../Services/auth/authAPI";

import confirm from 'antd/lib/modal/confirm';

export default function ProfileOverview({ userData }) {
    function showSignOutConfirm() {
        confirm({
            title: 'You are about to sign out. Continue?',
            icon: <ExclamationCircleOutlined />,
            async onOk() {
                return await authAPI.signOut()
                    .then(() => { })
                    .catch(err => {
                        console.log(err)
                    })
                // return new Promise((resolve, reject) => {
                //     authAPI.signOut()
                //         .then(resolve)
                //         .catch(reject)
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }
    return (
        <div className="row text-center pb-0 mb-0" style={{ width: '210px' }}>
            <div className="col">
                <Avatar
                    size={50}
                    style={{
                        backgroundColor: 'info',
                        cursor: "pointer"
                    }}
                    icon={<UserOutlined />} />
            </div>
            <div className="col">
                <span className='px-2 py-0 font-weight-bold text-center'>
                    {`${userData.firstName} ${userData.lastName}`}
                </span> <br />
                {userData.email}
            </div>
            <Tag color='blue' className='w-100'>{userData.role.name}</Tag>
            <Divider className='mb-0' />
            <div className="col p-1 pb-0">
                <Button className='w-100 text-left' type='ghost'>
                    <ProfileOutlined />
                    User Profile
            </Button>
                <Button className='w-100 text-left' type='ghost'><SettingOutlined />Settings</Button>
                <Button className='w-100 text-left' type='danger' styl={{ backgroundColor: 'white', color: 'black' }} onClick={showSignOutConfirm}><LogoutOutlined /> Sign Out</Button>
            </div>
        </div>
    )
}
