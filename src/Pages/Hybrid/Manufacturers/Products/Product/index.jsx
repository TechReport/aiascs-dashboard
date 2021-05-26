import { Affix, Button, PageHeader, Tag, Timeline, Tabs, message, Modal, Alert } from "antd";
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import toBase64 from "../../../../../Services/Utilities";
import { useHistory } from "react-router";
// import package1 from '../../../../../Assets/package1.jpg'
import package1 from '../../../../../Assets/package1.jpg'
import { productAPI } from "../productAPI";
import ShowForPermission from "../../../../../Components/Authentication/CheckPermission";


const { TabPane } = Tabs;

export default function Product(props) {
    const [top] = useState(0)
    const hist = useHistory()
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [error, setError] = useState({ status: false, message: '', description: '' })

    function handleCancel() {
        setIsDeleteModalVisible(false)
    }

    // function handleShowDeleteModal(){
    //     setIsDeleteModalVisible(true)
    // }

    function handleDeleteProduct() {
        console.log(product)

        productAPI.deleteOne('products', product._id)
            .then(response => {
                console.log(response)
                message.info("Product Deleted Successfully")
                hist.goBack()
            }).catch(err => {
                console.log(err)
                setError(err)
                setError({ status: true, message: err.message, descriptions: err.descriptions })
            })
    }

    const [product] = useState(props.location.state)

    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={product.name}
                    extra={<>
                        <ShowForPermission allowedPermissions='update_product' >
                            <Button type='default'>Edit</Button>
                        </ShowForPermission>
                        <ShowForPermission allowedPermissions='revoke_product' >
                            <Button type='default'>Revoke</Button>
                        </ShowForPermission>
                        <ShowForPermission allowedPermissions='update_product' >
                            <Button type='danger' onClick={() => setIsDeleteModalVisible(true)}>Delete</Button>
                        </ShowForPermission>
                        <Modal title="Confirm Delete Product"
                            visible={isDeleteModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                            destroyOnClose={true}>
                            <p> Product name: <Tag color='lime'>{product.name}</Tag></p>
                            <p> Product Token: <Tag color='green'>{product.token}</Tag></p>
                            <p> The identified product will be deleted permanently. Confirm</p>
                            <div className='text-right mb-2'>
                                <Button type='default' className='mr-2' onClick={() => setIsDeleteModalVisible(false)}>Dismiss   </Button>
                                <Button type='danger' onClick={handleDeleteProduct}>Delete</Button>
                            </div>
                            {error.status &&
                                <Alert
                                    message={error.message}
                                    description={error.descriptions}
                                    type="error"
                                />
                            }
                        </Modal>
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
                                <img src={`data:image/png;base64,${toBase64(product.qrcode.qrCodeImage.data)}`} alt='' />
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
                <div className="card-body">
                    <Tabs>
                        <TabPane tab="PRODUCT TIMELINE" key="1" >
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
                        </TabPane>
                        <TabPane tab="PRODUCT REVIEW" key="2">
                            <div className="jumbotron">Content of tab 2</div>
                            <div className="jumbotron">Content of tab 2</div>
                            <div className="jumbotron">Content of tab 2</div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
