import { Affix, Button, Descriptions, PageHeader, Tag, Timeline } from "antd";
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import toBase64 from "../../../../Services/Utilities";
import { useHistory } from "react-router";
import package1 from '../../../../Assets/package1.jpg'

export default function Product(props) {
    const [top, setTop] = useState(0)

    console.log(props)
    const [product] = useState(props.location.state)
    const hist = useHistory()
    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={product.name}
                    extra={<>
                        <Button type='primary'>Track</Button>
                        <Button type='danger'>Revoke</Button>
                        <Button type='danger'>Delete</Button>
                    </>}
                    subTitle={<Tag color={product.isRevoked ? 'red' : 'green'}>{product.isRevoked ? 'Revoked' : 'Not Revoked'}</Tag>}
                />
            </Affix>

            <div className="card">
                <div className="row">
                    <div className="col-4">
                        <img src={package1} alt="" width='100%' />
                    </div>
                    <div className="col-8">
                        <div className="row py-3">
                            <div className="col-6">
                                <h5>Product Information</h5>
                                <p><strong>Product Name: </strong>{product.name}</p>
                                <p><strong>Product Token: </strong>{product.qrcode.productToken}</p>
                                <p><strong>Registered At: </strong>{product.createdAt}</p>
                                <p><strong>Expiry Date: </strong>{product.expiry}</p>
                                <p><strong>Last Track Location: </strong>Mbeya</p>
                                <img src={`data:image/png;base64,${toBase64(product.qrcode.qrCodeImage.data)}`} />
                            </div>
                            <div className="col-6">
                                <h5>Batch Info Summary</h5>
                                <p><strong>Product Count: </strong></p>
                                <p><strong>Revoked Products: </strong>0</p>
                                <p><strong>Tracked Products: </strong>0</p>
                                <p><strong>Reported Products: </strong>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-5">
                <div className="card-header bg-transparent">Product Tracker</div>
                <div className="card-body">
                    <Timeline mode="alternate">
                        <Timeline.Item>
                            <div className="card">
                                <div className="card-body">
                                    Create a services site 2015-09-01
                                </div>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                            beatae vitae dicta sunt explicabo.
                                </Timeline.Item>
                        <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Technical testing 2015-09-01
                                </Timeline.Item>
                    </Timeline>
                </div>
                {/* </div>
                </div> */}
            </div>
        </div>
    )
}
