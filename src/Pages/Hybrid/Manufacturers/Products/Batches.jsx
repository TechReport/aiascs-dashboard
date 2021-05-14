import { Tag, Timeline, Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import { manufacturerAPI } from '../manufacturerAPI'
import { InboxOutlined } from '@ant-design/icons'

import { Collapse } from 'antd';

const { Panel } = Collapse;
export default function Batches() {
    const [user] = React.useState(JSON.parse(localStorage.getItem('user')))
    console.log(user.companyId)
    const [batches, setBatches] = useState([])


    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };




    const treeData = [
        {
            title: 'Product Batches',
            key: 'batch',

            children: batches
            // [
            //     batches,
            //     { title: "1620340286256" },
            //     { title: "Fri May 07 2021" },
            //     {
            //         title: 'parent 1-0',
            //         // key: 'batch-props',
            //         // children: [
            //         //     {
            //         //         title: 'leaf',
            //         //     },
            //         //     {
            //         //         title: 'leaf',
            //         //     },
            //         // ],
            //     },
            //     {
            //         title: 'parent 1-1',
            //         key: 'batch-props-2',
            //         children: [
            //             {
            //                 title: (
            //                     <span className='card card-body'>
            //                         sss
            //                     </span>
            //                 ),
            //             },
            //         ],
            //     },
            // ],
        },
    ];

    function fetchBatches() {
        manufacturerAPI.getAll(`products/batch/${user.companyId._id}`)
            .then(batches => {
                console.log(batches)
                setBatches(batches)
                // setBatches(batches.map(batch => {
                //     return {
                //         title: (
                //             <div className='card w-100'>{batch}</div>)
                //     }
                // }))
            }).catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchBatches()
        return () => {
            setBatches([])
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        console.log(batches)
    }, [batches])

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
        <div className='row w-100'>
            <div className="col-6">
                <div className="card">
                    <div className="card-header border-0">Batches</div>
                    <div className="card-body p-0">
                        {/* <Timeline>
                            {batches.map(batch => {
                                return (
                                    <Timeline.Item dot={<InboxOutlined style={{ fontSize: '30px' }} />}>{batch}</Timeline.Item>
                                )
                            })}
                        </Timeline> */}
                        {/* <Tree
                            checkable
                            defaultExpandedKeys={['0-0-0', '0-0-1']}
                            defaultSelectedKeys={['0-0-0', '0-0-1']}
                            defaultCheckedKeys={['0-0-0', '0-0-1']}
                            onSelect={onSelect}
                            onCheck={onCheck}
                            treeData={treeData}
                        /> */}
                        <Collapse accordion defaultActiveKey={0} onChange={(e) => { console.log(e) }}>
                            {batches.map((batch, index) =>
                                <Panel header={batch} key={batch}>
                                    {/* <p>{text}</p> */}
                                    {/* <div className="row">
                                        div.col
                                    </div> */}
                                    <p><strong>Created At: </strong>{batch}</p>
                                    <p><strong>Product Count: </strong>{12}</p>
                                    <p><strong>Created By: </strong>Admin Tosary</p>
                                    <p><strong>Revoked Products: </strong><Tag>None</Tag></p>
                                </Panel>
                            )}
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    )
}