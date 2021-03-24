import { Tabs } from 'antd'
import React from 'react'
import { MainDashboardCard } from '../../Components/Reusable'

const { TabPane } = Tabs;

export default function Users() {
    const data = [
        { title: 'Operation Personnels', body: '132 k', percent: '+20%', descriptions: 'coming soon' },
        { title: 'Agents', body: '37', percent: '-20%', descriptions: 'coming soon' },
    ]
    return (
        <div>
            <div className='mt-2 row'>
                {data.map(item => <MainDashboardCard item={item} />)}
            </div>

            <div className="shadow mt-4">
                <div className="card">
                    <div className="card-body">
                        <Tabs>
                            <TabPane tab="OPERATION PERSONNELS" key="1" >
                                Content of tab 1
                            </TabPane>
                            <TabPane tab="AGENTS" key="2">
                                Content of tab 2
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>

    )
}
