import { Affix, Button, PageHeader, Tag, Timeline, Tabs, message, Modal, Alert, Skeleton, Select, Empty, Popover } from "antd";
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import toBase64 from "../../../../../Services/Utilities";
import { useHistory } from "react-router";
// import package1 from '../../../../../Assets/package1.jpg'
import package1 from '../../../../../Assets/package1.jpg'
import { productAPI } from "../productAPI";
import { ShowForRole } from "../../../../../Components/Authentication/CheckPermission";
// import ShowForPermission, { ShowForRole } from "../../../../../Components/Authentication/CheckPermission";
import RevokeProduct from "./RevokeProduct";
import Paragraph from "antd/lib/skeleton/Paragraph";
import moment from "moment";


const { TabPane } = Tabs;
const { Option } = Select;

export default function Product(props) {
    const [top] = useState(0)
    const hist = useHistory()
    const [product] = useState(props.location.state)
    const [productActivity, setProductActivity] = useState({ loading: true, data: [] })
    const [mode, setMode] = useState('alternate')

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [revokeModalVisible, setRevokeModalVisible] = useState(false)

    const [error, setError] = useState({ status: false, message: '', description: '' })

    function handleCancel() {
        setIsDeleteModalVisible(false)
    }

    // function handleShowDeleteModal(){
    //     setIsDeleteModalVisible(true)
    // }

    async function getProductActivity() {
        console.log(product)
        setProductActivity({ loading: true, data: [] })
        await productAPI.activity(product._id)
            .then(data => {
                console.log(data)
                setProductActivity({ loading: false, data })
            }).catch(error => {
                setProductActivity({ loading: true, data: [] })
                console.log(error)
            })
    }

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

    useEffect(() => {
        getProductActivity()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-fluid mt-4">
            <Affix offsetTop={top}>
                <PageHeader
                    className="site-page-header bg-light"
                    onBack={() => hist.goBack()}
                    title={product.name}
                    extra={<>
                        {/* <ShowForPermission allowedPermissions='update_product' >
                            <Button type='default'>Edit</Button>
                        </ShowForPermission> */}
                        <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN']} >
                            <Button type='default'>Edit</Button>
                        </ShowForRole>
                        <ShowForRole allowedRoles={['ROLE_QUALITY_CONTROLLER_ADMIN']} >
                            <Button type='danger' onClick={() => setRevokeModalVisible(true)}>Revoke</Button>
                        </ShowForRole>
                        <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN']} >
                            <Button type='danger' onClick={() => setIsDeleteModalVisible(true)}>Delete</Button>
                        </ShowForRole>
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
                        <RevokeProduct refreshProductActivity={getProductActivity} revokeModalVisible={revokeModalVisible} setRevokeModalVisible={setRevokeModalVisible} product={product} />
                    </>}
                    subTitle={<Tag color={product.isRevoked ? 'red' : 'green'}>{product.isRevoked ? 'Revoked' : 'Not Revoked'}</Tag>}
                />
            </Affix>

            <div className="card">
                <div className="row">
                    {/* <div className="col-4">
                        <img src={package1} alt="" width='100%' />
                    </div> */}
                    <div className="col-12 px-4">
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
                            <ShowForRole allowedRoles={['ROLE_QUALITY_CONTROLLER_ADMIN']} >
                                <div className="col-6">
                                    <h5>Company Information</h5>
                                    <p><strong>Company Name: </strong>{product.companyId.name}</p>
                                    <p><strong>Registration: </strong>{product.companyId.regno}</p>
                                    <p><strong>Email: </strong>{product.companyId.email}</p>
                                    <p><strong>Phone Number: </strong>{product.companyId.phonenumber}</p>
                                    {/* <p><strong>Location: </strong>{product.companyId.location}</p> */}
                                    <p><strong>Registered At: </strong>{moment(product.companyId.createdAt).format('DD MMM YYYY')}</p>
                                </div>
                            </ShowForRole>
                            {/* <div className="col-6">
                                <h5>Batch Info Summary</h5>
                                <p><strong>Product Count: </strong></p>
                                <p><strong>Revoked Products: </strong>0</p>
                                <p><strong>Tracked Products: </strong>0</p>
                                <p><strong>Reported Products: </strong>0</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-5">
                <div className="card-body">
                    <Tabs tabBarExtraContent={
                        <Select style={{ width: 120 }} defaultOpen={true} defaultValue={mode} onChange={(val) => setMode(val)} >
                            <Option value='alternate'>Alternate</Option>
                            <Option value='left'>Left</Option>
                            <Option value='right'>Right</Option>
                        </Select>
                    }>
                        <TabPane destroyInactiveTabPane={true} tab="PRODUCT TIMELINE" key="1" className='pt-4' style={{ maxHeight: '60vh', overflowY: 'auto', overflowX: 'hidden' }} >
                            {productActivity.loading ?
                                <Skeleton active>
                                    <Paragraph />
                                </Skeleton>
                                :
                                <>
                                    {productActivity.data.length === 0 ?
                                        <Empty description='No Reviews to show' />
                                        :
                                        <Timeline mode={mode}>
                                            {productActivity.data.map(activity => {
                                                return (
                                                    <Timeline.Item>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5>{activity.title} Issued by <span className='text-info'>
                                                                    {console.log(activity)}
                                                                    <Popover
                                                                        content={() => {
                                                                            return (
                                                                                <>
                                                                                    <span>Email: {activity.actor.email}</span><br />
                                                                                    <span>Position: {activity.position}</span><br />
                                                                                    <Button onClick={() => hist.push(`/user/${activity.actor._id}`, activity.actor)}>View More</Button>
                                                                                </>
                                                                            )
                                                                        }} title="Actor Details">
                                                                        {`${activity.actor.firstName} ${activity.actor.lastName}`}
                                                                    </Popover>
                                                                </span>
                                                                </h5>
                                                                <p> {activity.descriptions}</p>
                                                                <span className='text-muted'>{moment(activity.issuedAt).format('DD MMM, YYYY HH:mm:ss')} ({moment(activity.issuedAt).fromNow()})</span>
                                                            </div>
                                                        </div>
                                                    </Timeline.Item>
                                                )
                                            })}
                                            <Timeline.Item color="green" dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}></Timeline.Item>
                                        </Timeline>
                                    }
                                </>
                            }
                        </TabPane>
                        {/* <TabPane tab="PRODUCT REVIEW" key="2">
                            <div className="jumbotron">Content of tab 2</div>
                            <div className="jumbotron">Content of tab 2</div>
                            <div className="jumbotron">Content of tab 2</div>
                        </TabPane> */}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
