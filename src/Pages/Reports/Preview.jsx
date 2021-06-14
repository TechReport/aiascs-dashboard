// import moment from 'moment'
import React from 'react'

// import ReactApexChart from 'react-apexcharts';

import { Tabs } from 'antd';
import ReportProfile from './profile1';
import ProductRegistration from './ProductRegistration';
import ProductCompany from './ProductCompany';
import FakeVSLocation from './FakeVSLocation';

const { TabPane } = Tabs;

export default function PreviewReport(props) {



    function callback(key) {
        console.log(key);
    }

    return (
        <div>
            <div className='container-fluid mt-4'>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Report 1" key="1">
                        <ReportProfile />
                    </TabPane>
                    <TabPane tab="Product Registration Report" key="2">
                        <ProductRegistration />
                    </TabPane>
                    <TabPane tab="Product VS Company" key="3">
                        <ProductCompany />
                    </TabPane>
                    <TabPane tab="Fake Products VS Location" key="4">
                        <FakeVSLocation />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
