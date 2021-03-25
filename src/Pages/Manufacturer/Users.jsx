import { Tabs } from 'antd'
import React from 'react'
import { DashboardWidgetCard } from '../../Components/Reusable'
import Graph from './graph'
// import '../..//'

const { TabPane } = Tabs;

export default function Users() {
    const data = [
        {
            title: 'Operation Personnels',
            body: '132 k', percent: '+20%',
            descriptions: 'coming soon',
            x: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            y: [30, 40, 75, 70, 99, 120, 300, 401, 500]
        },
        { title: 'Agents', body: '37', percent: '-20%', descriptions: 'coming soon' },
    ]

    return (
        <div>
            <div className='row mt-4 mx-0' styl={{ width: '100%' }}>
                {data.map(item => <DashboardWidgetCard item={item} />)}
            </div>

            <div className="container-fluid shadow mt-4">
                <div className="card">
                    <div className="card-body">
                        <Tabs>
                            <TabPane tab="OPERATION PERSONNELS" key="1" >
                                <div className="row shadow">
                                    <div className="col-4">
                                        <div className="card" style={{ height: '20vw', width: '40vw' }}>
                                            <Graph />
                                        </div>
                                    </div>
                                </div>
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


/*
 * //TODO
 * 1. Create new operationg personnel (OP)
 *      assign role to OP
 *
 * 2. create agent
 */