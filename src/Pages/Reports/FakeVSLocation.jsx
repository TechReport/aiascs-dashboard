import React, { useState } from 'react'
import UdsmLogo from '../../Assets/logo_ud.png'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


export default function FakeVSLocation() {
    const [reports] = useState({
        loading: false, data: [
            { createdAt: '12/10/2020', batch: 'Kilimanjaro', percentage: '7', count: '5000000' },
            { createdAt: '25/11/2020', batch: 'Bukoba', percentage: '17', count: '5000000' },
            { createdAt: '21/12/2020', batch: 'Mwanza', percentage: '7', count: '5000000' },
            { createdAt: '13/1/2020', batch: 'Dar es salaam', percentage: '7', count: '5000000' },
            { createdAt: '17/2/2020', batch: 'Mtwara', percentage: '7', count: '5000000' },
            { createdAt: '27/3/2020', batch: 'Musoma', percentage: '7', count: '5000000' },
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
                        <h6 className='mb-5 text-center h6 text-uppercase'>Re: <u>Identified Fake Product Distribution as per Regions for year ending 31/12/2020.</u></h6>
                        <span><span className='font-weight-bold'>Start Date:</span>12/12/2020</span><br />
                        <span><span className='font-weight-bold'>End Date:</span>12/12/2020</span><br />
                    </div>
                    <div className="report-body">
                        <BootstrapTable trStyle={{ padding: '0px', cursor: 'pointer' }} data={reports.data} striped hover >
                            <TableHeaderColumn width='70' dataField='sn' dataFormat={(cell, row, extra, index) => index + 1} isKey>S/N</TableHeaderColumn>
                            <TableHeaderColumn dataField='batch' >Location</TableHeaderColumn>
                            <TableHeaderColumn dataField='count' >Product Count</TableHeaderColumn>
                            <TableHeaderColumn dataField='percentage' >Percentage Distribution</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        </div>
    )
}
