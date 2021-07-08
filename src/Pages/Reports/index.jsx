import { Empty, List } from 'antd';
import { useContext, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons'

import reportCategories from './Hybrid/reportCategories';
import Configurations from './Hybrid/Configurations';
import { ConfigurationContextProvider } from './Hybrid/configurations.context';
import PreviewReport from './Hybrid/PreviewReport'
import { AuthContext } from '../../Context/AuthContext'
export default function Reports() {
    const [selectedCategory, setSelectedCategory] = useState()
    const [selectedReport, setSelectedReport] = useState()
    const { state } = useContext(AuthContext)

    const [isModalVisible, setIsModalVisible] = useState(false);

    // const [configurationsOBJ, setConfigurationsOBJ] = useState({ duration: '', location: {} })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <ConfigurationContextProvider >
            <div className='container-fluid mt-4'>
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                <span className='text-uppercase'>Report Categories</span> <br />
                                <span className='text-muted'>Click an entry to VIEW and GENERATE Reports </span>
                            </div>
                            <div className="card-body p-2">
                                <List
                                    style={{ cursor: 'pointer' }}
                                    itemLayout="horizontal"
                                    dataSource={reportCategories}

                                    renderItem={item => (
                                        <List.Item className={selectedCategory && selectedCategory.title === item.title && `bg-light`} onClick={() => {
                                            setSelectedCategory(item)
                                            setSelectedReport()
                                        }}>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.descriptions}
                                            />
                                        </List.Item>
                                    )} />
                            </div>
                        </div>
                    </div>
                    <ArrowRightOutlined className='mt-3' />
                    {selectedCategory ?
                        <div className="col-3">
                            <div className="card">
                                {console.log(selectedCategory)}
                                <div className="card-header">{selectedCategory.title}</div>
                                <div className="card-body p-2">
                                    {reportCategories[selectedCategory.index].reports.length ?
                                        <List
                                            local={{ emptyText: ' ' }}
                                            style={{ cursor: 'pointer' }}
                                            itemLayout="horizontal"
                                            dataSource={reportCategories[selectedCategory.index].reports}
                                            renderItem={item => (
                                                item.allowed.includes(state.currentUser.role.genericName) &&
                                                <List.Item className={selectedReport && selectedReport.title === item.title && `bg-light`} onClick={() => setSelectedReport(item)}>
                                                    {console.log(item)}

                                                    <List.Item.Meta
                                                        title={item.title}
                                                        description={item.descriptions}
                                                    />
                                                </List.Item>
                                            )} />
                                        :
                                        <Empty description="No report under this category. Please select another category" />
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-3">
                            <div className="card">
                                <div className="card-header">Available Reports as per Category</div>
                                <div className="card-body p-2">
                                    <Empty description="No report category selected" />
                                </div>
                            </div>
                        </div>
                    }

                    <ArrowRightOutlined className='mt-3' />
                    {selectedReport ?
                        <div className="col-3">
                            <div className="card">
                                {console.log(selectedReport)}
                                <div className="card-header">
                                    <span className='text-uppercase'>{selectedReport.title}</span> <br />
                                    <span className="text-muted">Report Generation Configurations</span> <br />
                                    <small className="">Leave empty to generate report with default configurations</small>
                                </div>
                                <div className="card-body p-2">
                                    <Configurations
                                        location={selectedReport.configurations.includes('location')}
                                        duration={selectedReport.configurations.includes('duration')}
                                        charts={selectedReport.configurations.includes('charts')}
                                    // setConfigurationOBJ={setConfigurationsOBJ}
                                    // duration={selectedReport.configurations.includes('duration')}
                                    />

                                    <div className="btn btn-info btn-block btn-sm" onClick={showModal}>Generate and Preview "{selectedReport.title}"</div>

                                    <PreviewReport
                                        isModalVisible={isModalVisible}
                                        handleCancel={handleCancel}
                                        handleOk={handleOk}
                                        // configurationsData={configurationsOBJ}
                                        ReportComponent={selectedReport.component}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-3">
                            <div className="card">
                                <div className="card-header">Report Generation Configurations</div>
                                <div className="card-body p-2">
                                    <Empty description="No report selected" />
                                </div>
                            </div>
                        </div>
                    }






                    <div className="col-8">

                        {/* <div className="card">
                        <div className="card-header py-3 border-0 d-flex justify-content-between">
                            <div>reports</div>
                            <Button className='text-right' onClick={printReport}>export PDF</Button>
                        </div>
                        <PreviewReport /> */}

                        {/* {reports.loading ?
                            <Skeleton active />
                            :
                            <BootstrapTable options={{ onRowClick: (cell) => hist.push(`/report/${cell._id}`, cell) }} trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} pagination search scrollTop='Top' striped hover searchPlaceholder='Search by name, age, address or tags' className='mt-n5 p-0' >
                                <TableHeaderColumn dataField='name' filterFormatted isKey>Names</TableHeaderColumn>
                                <TableHeaderColumn dataField='url'>Link URL</TableHeaderColumn>
                            </BootstrapTable>
                        } */}
                        {/* </div> */}
                    </div>
                </div>

            </div >
        </ConfigurationContextProvider>
    )
}
