import Avatar from "antd/lib/avatar/avatar";
import { Header } from "antd/lib/layout/layout";
import { Fragment } from "react";

import {
    UserOutlined
} from '@ant-design/icons';

export default function Navbar() {
    return (
        <Fragment>
            <Header className="site-layout-background bg-light" >
                <div className='row bg-inf mr-n5 d-flex justify-content-between'>
                    <div className="bg-dange">d</div>
                    <div className="bg-dange pr-2">
                        <span className='bg-white rounded-pill px-2 py-1'>
                            Daniel ernest
                        </span>
                        <Avatar
                            size={50}
                            style={{
                                backgroundColor: '#87d068',
                            }}
                            icon={<UserOutlined />} />
                    </div>
                </div>
            </Header>
        </Fragment>
    )
}
