import React, { useState } from 'react'
import moment from 'moment'
import UdsmLogo from '../../Assets/logo_ud.png'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default function ProductCompany() {
    const [reports] = useState({
        loading: false, data: [
            { createdAt: '12/10/2020', batch: 'seedCo', percentage: '7', count: '5000000' },
            { createdAt: '25/11/2020', batch: 'company 1', percentage: '17', count: '5000000' },
            { createdAt: '21/12/2020', batch: 'company 2', percentage: '7', count: '5000000' },
            { createdAt: '13/1/2020', batch: 'company 3', percentage: '7', count: '5000000' },
            { createdAt: '17/2/2020', batch: 'company 4', percentage: '7', count: '5000000' },
            { createdAt: '27/3/2020', batch: 'company 5', percentage: '7', count: '5000000' },
            { createdAt: '7/4/2020', batch: 'company 6', percentage: '7', count: '5000000' },
            { createdAt: '12/5/2020', batch: 'company 7', percentage: '7', count: '5000000' },
            { createdAt: '2/6/2020', batch: 'company 8', percentage: '7', count: '5000000' },
        ]
    })

    return (
        <div className='container-fluid p-0'>
            <div className="card">
                <div className="card-body" id='reportContents'>
                    <div className="titlebar d-flex justify-content-between">
                        <img src={UdsmLogo} className='img' alt='company logo' width='100px' />
                        <div className="descriptions text-right">
                            <span className='h6'>Tanzania Bureau of Standards (TBS) </span><br />
                            <span className='h'>P.O BOX 2956</span> <br />
                            <span className='h'>Telephone: +255 26 2520310.</span><br />
                            <span className='h'>Fax: +255 26 2520310.</span> <br />
                            <span className='h'>{moment(Date.now()).format('ddd DD, MMM YYYY')}</span>
                        </div>
                    </div>
                    <div className="title mt-4">
                        <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>Product Registration Report as per COmpany for the year ending 31/12/2020.</u></h6>
                        <span><span className='font-weight-bold'>Start Date:</span>12/12/2020</span><br />
                        <span><span className='font-weight-bold'>End Date:</span>12/12/2020</span><br />
                    </div>
                    <div className="report-body">
                        <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} striped hover >
                            <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                            <TableHeaderColumn dataField='batch' >Company Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                            <TableHeaderColumn dataField='percentage' >Percentage Distribution</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        </div>
    )
}
