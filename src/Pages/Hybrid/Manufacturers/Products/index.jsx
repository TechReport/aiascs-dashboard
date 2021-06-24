import { useState } from 'react'
import {
    AppstoreAddOutlined
} from '@ant-design/icons';
import { Button, Modal } from "antd"
import AddNewProduct from './AddNewProduct';
// import ProductList from './ProductList';
import ProductListNew from './ProductListNew';
import { ShowForRole } from '../../../../Components/Authentication/CheckPermission';

export default function Products(props) {
    // console.log(props.location.state)
    // const [batch, setBatch] = useState()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [user] = useState(JSON.parse(sessionStorage.getItem('user')))

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // setUserUpdated(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // useEffect(() => {
    //     if (props.location.state) {
    //         // console.log(props.location.state.batch[0])
    //         setBatch(props.location.state.batch[0])
    //     }
    //     return () => {
    //         setBatch()
    //     }
    // }, [])
    // const data = [
    //     { title: 'Total Products Registered', body: '37 M', percent: '-5%', descriptions: 'Number of registered products' },
    //     { title: 'Total Batches', body: '132 k', percent: '+20%', descriptions: 'coming soon' },
    //     { title: 'Agents', body: '37', percent: '-20%', descriptions: 'coming soon' },
    // ]
    return (
        <div>
            {/* <div className='row mt-4 mx-0' styl={{ width: '100%' }}>
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div> */}
            <ShowForRole allowedRoles={['ROLE_MANUFACTURING_COMPANY_ADMIN']}>
                <div className="container-fluid mt-4">
                    <div className="actions">
                        <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
                            Add Products
                        <AppstoreAddOutlined className='' />
                        </Button>
                        <Modal title="Add Products"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                            destroyOnClose={true}>
                            <AddNewProduct handleCancel={handleCancel} handleOk={handleOk} companyId={user.companyId} />
                        </Modal>
                    </div>
                </div>
            </ShowForRole>
            <div className="container-fluid mt-4">
                <ProductListNew companyId={props.location.state.company ? props.location.state.company._id : user.companyId} batch={props.location.state} company={props.location.state.company || user.companyId} />

                {/* <div className="row">
                    <div className="col-xl-12">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                <div className="title d-flex justify-content-between">
                                    <h5 className='text-mute'>Products in batch named "{props.location.state.batch[0].name}"</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                {console.log(props.location.state)}
                                <ProductList companyId={user.companyId} />
                                <ProductListNew companyId={props.location.state.company ? props.location.state.company._id : user.companyId} batch={props.location.state} />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div >
    )
}
