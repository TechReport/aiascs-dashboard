import { useEffect, useState } from 'react'

import eventEmitter from '../../../Services/EventEmitter'
import CompanyHome from '../../../Components/Company/Home';
import RegisterCompany from '../../../Components/Company/RegisterCompany';
import { qualityControllerAPI } from './qualityControllerAPI';


export default function QualityControllers() {
    const updateEvent = 'updateQualityControllers'
    const data = [
        { title: 'Manufacturing Companies', body: '37', percent: '+8%', descriptions: 'The number of Manufacturing Companies registered since 2021' },
        { title: 'Products', body: '37 M', percent: '-5%', descriptions: 'coming soon' },
    ]
    const [qualityControllers, setQualityControllers] = useState({ loading: true, data: [] })

    function fetchAgentCompanies() {
        qualityControllerAPI.getAll('qualitycontrollers')
            .then(res => {
                console.log(res)
                setQualityControllers({ loading: false, data: res })
            })
            .catch(error => {
                console.log(error)
            })
    }
    eventEmitter.on(updateEvent, () => fetchAgentCompanies());

    useEffect(() => {
        fetchAgentCompanies()
        return () => {
            setQualityControllers({ loading: false, data: [] })
        }
    }, [])

    return (
        <div>
            <CompanyHome
                RegisterCompany={() =>
                    RegisterCompany({
                        handlerAPI: qualityControllerAPI,
                        resource: 'qualitycontrollers',
                        updateEvent
                    })}
                data={data}
                companies={qualityControllers}
                resource='qualitycontrollers' />
        </div>
    )
}




// import { Button } from 'antd'
// import Modal from 'antd/lib/modal/Modal'
// import DashboardWidgetCard from '../../../Components/Reusable/DashboardWidgetCard'
// import {
//     UserAddOutlined
// } from '@ant-design/icons';
// import RegisteredQualityControllers from './RegisteredQualityControllers';
// import RegisterQualityControllers from './RegisterQualityControllers';
// import withCompanyProfile from '../../../HOC/withCompany/withCompanyHome';
// // import eventEmitter from '../../../Services/EventEmitter';


// function QualityControllers({ isModalVisible, showModal, handleOk, handleCancel, data }) {
//     // eventEmitter.on('closeModal', handleOk)

//     return (
//         <div>
//             <div className='row mt-3 w-100' gutter={12} >
//                 {data.map(item => <DashboardWidgetCard item={item} />)}
//             </div>
//             <div className="mt-4">
//                 <div className="actions">
//                     <Button type='ghost' size='middle' className='rounded-pill' onClick={showModal}>
//                         Register Quality Controller Company
//                         <UserAddOutlined />
//                     </Button>
//                     <Modal title="Register Quality Controlling Company"
//                         visible={isModalVisible}
//                         onCancel={handleCancel}
//                         footer={null}
//                         destroyOnClose={true}>
//                         <RegisterQualityControllers handleCancel={handleCancel} handleOk={handleOk} />
//                     </Modal>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default withCompanyProfile(QualityControllers,
//     { RegisteredCompanies: RegisteredQualityControllers },
//     { from: 'qc' }
// )