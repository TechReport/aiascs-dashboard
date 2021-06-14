import { Button, Divider, Tooltip } from 'antd'
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import MainWidgetGraph from './graph';

export default function DashboardWidgetCard({ item }) {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
            <div className="card shadow" style={{ borderRadius: '10px' }}>
                <div className="d-flex justify-content-between pt-3 pb-0 ml-3 pr-2">
                    <div className='text-muted'>{item.title}</div>
                    {/* <Tooltip className='mr-n' title={item.descriptions} color='gray' style={{ color: 'gray' }} >
                        <Button type="text" shape="circle" size='small' icon={<QuestionCircleOutlined className='text-muted' />} />
                    </Tooltip> */}
                    <Tooltip title={item.descriptions} color='gray' style={{ color: 'gray' }} >
                        <Button type="text" shape="circle" size='small' icon={<QuestionCircleOutlined className='text-muted' />} />
                    </Tooltip>
                </div>
                <Divider className='p-0 mb-0 mt-2' />
                <div className="card-body py-1">
                    <div className="row">
                        <div className="col">
                            <h3 className='mt-4 mb-0'>{item.body}</h3>
                            <span className='mt-4 text-danger'>{item.percent}</span>
                        </div>
                        <div className="col-5 align-self-end px-2">
                            <MainWidgetGraph x={item.x} y={item.y} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
