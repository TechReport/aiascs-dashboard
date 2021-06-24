import React, { useState } from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import CompanyList from './CompanyList'
import BatchList from './BatchList'
import { Empty, Tag } from 'antd'

export default function Categories() {
    const [selectedCompany, setSelectedCompany] = useState({})

    return (
        <div className='container-fluid mt-4'>
            <div className="row w-100">
                <div className="col-5">
                    <div className="card">
                        <div className="card-header">
                            <h6>Companies</h6>
                            <span>Select a company below to view its batches</span>
                        </div>
                        <div className="card-body px-0">
                            <CompanyList setSelectedCompany={setSelectedCompany} />
                        </div>
                    </div>
                </div>
                <div className="">
                    <ArrowRightOutlined style={{ fontSize: '20px' }} className='mt-4' />
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card-header">
                            {/* <h6>Product Batches</h6> */}
                            {selectedCompany._id ?
                                <>
                                    <h6>Product Batches for <Tag className='px-2 py-1' color='blue'>{selectedCompany.name}</Tag>Company</h6>
                                    <span>Click on a product batch row below to view its products </span>
                                </>
                                :
                                <h6>Product Batches</h6>
                            }

                        </div>
                        <div className="card-body px-0">
                            {selectedCompany._id ?
                                <BatchList selectedCompany={selectedCompany} />
                                :
                                <Empty description='No Company Selected' />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
